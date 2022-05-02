from multiprocessing.sharedctypes import Value
from scipy import rand
from .PriceGeneratorStrategy import PriceGeneratorStrategy
from .TrendManager import TrendManager
from scipy.stats import norm
from typing import List

class BondPriceGeneratorStrategy(PriceGeneratorStrategy):
    """
    This strategy produces a bond price at a time given its fixed price
    to diviate around and its volatility (in unit $)
    """
    
    def __init__(self, fixed_price: float, volatility: float, random = True) -> None:
        if fixed_price < 0:
            raise ValueError('A price cannot be negative')
        
        if fixed_price - volatility < 0:
            raise ValueError('Volatility cannot be larger than the price')

            
        self._init_price = fixed_price
        self._sigma = volatility
        self._random = random
    
    def generate_prices(self, trend: TrendManager) -> List[int]:
        """_summary_

        Args:
            trend (TrendManager): Ignored.

        Returns:
            List[int]: _description_
        """
        theo = int(norm.rvs(self._init_price, self._sigma))

        # buy and sell prices will fluctuate a little bit 
        # from theo price.
        buy_price = sell_price = theo
        if self._random:
            buy_price += round(norm.rvs(-1, 1))
            sell_price += round(norm.rvs(1, 1))
        
        return [buy_price, sell_price]