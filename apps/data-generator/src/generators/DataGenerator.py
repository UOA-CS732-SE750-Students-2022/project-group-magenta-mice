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
                "ordinal": 0,
                "type": "BOND",
                "positionLimit": 100,
                "tickSize": 100,
                "volatility": 0.5,
                "basePrice": 500
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
        self.client_id = 0
        
    def generate_data(self):
        """
        Generate price using price generator strategy.
        """

        self.buy, self.sell = self._priceGenStrategy.generate_prices(self._trend)
        return self.buy, self.sell

    def get_client_id(self):
        return self.client_id
    
    @property
    def strategy(self):
        return self._priceGenStrategy
    
    @strategy.setter
    def strategy(self, priceGenStrategy: PriceGeneratorStrategy):
        self._priceGenStrategy = priceGenStrategy
        