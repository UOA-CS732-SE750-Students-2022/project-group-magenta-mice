from abc import ABC, abstractmethod
from typing import List, Optional
from enum import Enum
class PriceGeneratorStrategy(ABC):
    """
    A Strategy interface for generating a price at a time.
    """
    @abstractmethod
    def generate_prices(self, trend: Optional[int]) -> List[int]:
        pass
