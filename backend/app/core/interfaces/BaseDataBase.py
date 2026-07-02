from abc import ABC, abstractmethod
import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime

Base = declarative_base()

class MarkdownDoc(Base):
    __tablename__ = 'markdown_files'
    id = Column(Integer, primary_key=True)
    filename = Column(String, unique=True, nullable=False)
    content = Column(Text, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

class DataBase():
    def __init__(self, folder_path, db_name):
        db_path = os.path.join(folder_path, db_name)
        self.engine = create_engine(f"sqlite:///{db_path}")
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)
        print(f"База SQLite инициализирована по адресу: {os.path.abspath(db_path)}")

    def load_uploads(self, UPLOADS_PATH):
        session = self.Session()
        try:
            if not os.path.exists(UPLOADS_PATH):
                print(f"Путь {UPLOADS_PATH} не найден.")
                return

            files = [f for f in os.listdir(UPLOADS_PATH) if f.endswith('.md')]
            
            for filename in files:
                file_path = os.path.join(UPLOADS_PATH, filename)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                existing_doc = session.query(MarkdownDoc).filter_by(filename=filename).first()
                
                if existing_doc:
                    existing_doc.content = content
                    existing_doc.updated_at = datetime.now()
                else:
                    new_doc = MarkdownDoc(filename=filename, content=content)
                    session.add(new_doc)
            
            session.commit()
            print(f"Успешно синхронизировано {len(files)} файлов с SQLite.")
        except Exception as e:
            session.rollback()
            print(f"Ошибка при загрузке в SQLite: {e}")
            raise
        finally:
            session.close()

    def squeeze_uploads(self, UPLOADS_PATH, CHROMA_PATH):
        try:      
            embeddings = HuggingFaceEmbeddings(
                model_name="cointegrated/rubert-tiny2",
            )
        
            loader = DirectoryLoader(UPLOADS_PATH, glob="./*.md", loader_cls=TextLoader, loader_kwargs={'encoding': 'utf-8'})
            documents = loader.load()
        
            if not documents:
                print(f"Файлы в папке {UPLOADS_PATH} не найдены.")
                return
            filenames_as_ids = [os.path.basename(doc.metadata['source']) for doc in documents]
            print(f"Загружено файлов: {len(documents)}")

            chroma_db = Chroma.from_documents(
                documents=documents,
                embedding=embeddings,
                persist_directory=CHROMA_PATH,
                collection_name='squeeze_texts',
                ids=filenames_as_ids
            )   
        
            print(f"База данных успешно создана в {CHROMA_PATH}")
            return chroma_db
        except Exception as e:
            print('Ошибка')
            raise