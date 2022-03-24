from abc import ABC, abstractmethod
from TrendManager import TrendManager
class PriceGeneratorStrategy(ABC):
    """
    A Strategy interface for generating a price at a time.
    """
    @abstractmethod
    def generate_price(self, trend: TrendManager) -> float:
        pass
