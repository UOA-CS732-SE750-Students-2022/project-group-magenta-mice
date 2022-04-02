from .PriceGeneratorStrategy import PriceGeneratorStrategy
from .TrendManager import TrendManager
from random import gauss, seed
from math import sqrt, exp
from scipy.stats import norm

class StockPriceGeneratorStrategy(PriceGeneratorStrategy):
    """
    This strategy produces a stock price at a time given its initial price, its trend,
    and volatility.
    Arguments:
        init_price: initial price of a stock when it's initialised
        trend: percentage yeild (in decimal) per order
        volatility: Diviation in $ unit
    """
    def __init__(self, init_price: float, volatility: float) -> None:
        self._init_price = init_price
        self._mu = init_price
        self._sigma = volatility
    
    def generate_price(self, trend: TrendManager) -> float:
        self._p = norm.rvs(self._mu, self._sigma)
        self._mu += trend.get_trend() * self._p/100

        return self._p