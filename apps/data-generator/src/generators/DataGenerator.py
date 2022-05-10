from time import sleep
from .PriceGeneratorStrategy import PriceGeneratorStrategy
from typing import List
from scipy.stats import norm

class DataGenerator:
    def __init__(
        self, priceGenStrategy: PriceGeneratorStrategy,
        APY: float = 0
        ):

        self._priceGenStrategy = priceGenStrategy
        self._trend = APY
        
        self.count = 0
        
    def generate_data(self):
        """
        Generate price using price generator strategy.
        """

        self.buy, self.sell = self._priceGenStrategy.generate_prices(self._trend)
        return self.buy, self.sell


    @property
    def strategy(self):
        return self._priceGenStrategy
    
    @strategy.setter
    def strategy(self, priceGenStrategy: PriceGeneratorStrategy):
        self._priceGenStrategy = priceGenStrategy
        