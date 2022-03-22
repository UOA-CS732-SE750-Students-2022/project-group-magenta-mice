from .PriceGeneratorStrategy import PriceGeneratorStrategy
from math import sqrt, exp
from scipy.stats import norm

class BondPriceGeneratorStrategy(PriceGeneratorStrategy):
    """
    This strategy produces a bond price at a time given its fixed price
    to diviate around and its volatility (in unit $)
    """
    
    def __init__(self, fixed_price: float, volatility: float) -> None:
        self._init_price = fixed_price
        self._sigma = volatility
    
    def generate_price(self) -> float:
        return norm.rvs(self._init_price, self._sigma)