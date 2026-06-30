import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
CHROMA_PATH = "src/database/"
COLLECTION_NAME = "text_data"
DATA_PATH = 'src/data/'

def generate_chroma_db():
    try:      
        embeddings = HuggingFaceEmbeddings(
            model_name="cointegrated/rubert-tiny2",
        )
        
        loader = DirectoryLoader(DATA_PATH, glob="./*.md", loader_cls=TextLoader, loader_kwargs={'encoding': 'utf-8'})
        documents = loader.load()
        
        if not documents:
            print(f"Файлы в папке {DATA_PATH} не найдены.")
            return
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=512,
            chunk_overlap=128,
            add_start_index=True,
        )
        chunks = text_splitter.split_documents(documents)
        
        print(f"Загружено файлов: {len(documents)}")
        print(f"Создано чанков: {len(chunks)}")

        chroma_db = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=CHROMA_PATH,
            collection_name=COLLECTION_NAME,
        )
        
        print(f"База данных успешно создана в {CHROMA_PATH}")
        return chroma_db
    except Exception as e:
        print('Ошибка')
        raise
    
if __name__ == "__main__":
    generate_chroma_db()