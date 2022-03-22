from abc import ABC, abstractmethod

class PriceGeneratorStrategy(ABC):
    """
    A Strategy interface for generating a price at a time.
    """
    @abstractmethod
    def generate_price(self) -> float:
        pass