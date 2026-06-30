from abc import ABC, abstractmethod

class BaseAgent(ABC):
    @abstractmethod
    def invoke(self, system_prompt: str, prompt: str):
        pass