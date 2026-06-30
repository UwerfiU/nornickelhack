from abc import ABC, abstractmethod


class DataBase(ABC):
    @abstractmethod
    def load_uploads(self, UPLOADS_PATH):
        pass

    @abstractmethod
    def squeeze_uploads(self, UPLOADS_PATH):
        pass
