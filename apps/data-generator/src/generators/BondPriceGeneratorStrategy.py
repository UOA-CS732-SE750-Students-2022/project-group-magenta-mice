from PriceGeneratorStrategy import PriceGeneratorStrategy
from TrendManager import TrendManager
from scipy.stats import norm
from typing import List

class BondPriceGeneratorStrategy(PriceGeneratorStrategy):
    """
    This strategy produces a bond price at a time given its fixed price
    to diviate around and its volatility (in unit $)
    """
    
    def __init__(self, fixed_price: float, volatility: float) -> None:
        self._init_price = fixed_price
        self._sigma = volatility
    
    def generate_prices(self, trend: TrendManager) -> List[int]:
        theo = int(norm.rvs(self._init_price, self._sigma))

        # buy and sell prices will fluctuate a little bit 
        # from theo price.
        buy_price = theo + round(norm.rvs(-1, 1))
        sell_price = theo + round(norm.rvs(1, 1))
        return [buy_price, sell_price]