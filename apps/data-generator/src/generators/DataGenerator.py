from time import sleep
from .PriceGeneratorStrategy import PriceGeneratorStrategy
from .TrendManager import TrendManager
import datetime
from typing import List


class DataGenerator:
    def __init__(
        self, priceGenStrategy: PriceGeneratorStrategy, 
        orders_per_second: int = 10, 
        APY: float = 0, 
        change_frequency: float = 0,
        APY_range: List[float] = [0,0]
        ):

        self._priceGenStrategy = priceGenStrategy
        self._orders_per_second = orders_per_second
        self._trend = TrendManager(APY, orders_per_second, change_frequency, APY_range)

    def generate_data(self):
        """
        Generate price using price generator strategy.
        """
        buy, sell = self._priceGenStrategy.generate_prices(self._trend)
        
        return buy, sell

    @property
    def strategy(self):
        return self._priceGenStrategy
    
    @strategy.setter
    def strategy(self, priceGenStrategy: PriceGeneratorStrategy):
        self._priceGenStrategy = priceGenStrategy
