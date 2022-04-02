from abc import ABC, abstractmethod
from .TrendManager import TrendManager
from typing import List

class PriceGeneratorStrategy(ABC):
    """
    A Strategy interface for generating a price at a time.
    """
    @abstractmethod
    def generate_prices(self, trend: TrendManager) -> List[int]:
        pass
