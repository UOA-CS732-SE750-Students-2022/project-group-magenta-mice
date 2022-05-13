from time import sleep

from typing import List
from scipy.stats import norm

from .PriceGeneratorStrategy import PriceGeneratorStrategy
from src.generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy
from src.generators.StockPriceGeneratorStrategy import StockPriceGeneratorStrategy

class DataGenerator:
    def __init__(
        self, instrument
        ):
        """
        args: instrument {
                "name": "BOND",
                "type": "BOND",
                "ordinal": 0,
                "positionLimit": 100,
                "tickSize": 1,
                "volatility": 0.05,
                "basePrice": 500,
                "id": "189b8fbd-3f86-45b1-8ab6-e5e0d462ef44"
            }
        """

        if instrument['type'] == 'BOND':
            self._priceGenStrategy = BondPriceGeneratorStrategy(instrument['basePrice'], instrument['volatility'])
            self._trend = 0
        else:
            self._priceGenStrategy = StockPriceGeneratorStrategy(instrument['basePrice'], instrument['volatility'])
            self._trend = 20
            
        self.instrument_id = instrument['ordinal']
        self.max_position_limit = instrument['positionLimit']
        
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
        