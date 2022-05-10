from typing import Optional, List
from PriceGeneratorStrategy import PriceGeneratorStrategy
from scipy.stats import norm

class StockPriceGeneratorStrategy(PriceGeneratorStrategy):
    """
    This strategy produces a stock price at a time given its initial price, 
    and volatility.
    Arguments:
        init_price: initial price of a stock when it's initialised
        volatility: % volatility from the initial price
    """
    def __init__(self, init_price: float, volatility: float, orders_per_second: int = 10) -> None:
        self._init_price = init_price
        self._cum_factor = 1
        self._orders_per_second = orders_per_second
        
        self._sigma = volatility/100
        self.buy_price = self.sell_price = init_price
        self.count = 0
    
    def generate_prices(self, trend: Optional[int] = 0) -> List[int]:
        """

        Args:
            trend (Optional[int], optional): % increase/decline from the initial price annually. Defaults to 0.

        Returns:
            List[int]: list of buy price and sell price.
        """
        if self.count == 0:
            trend = self.convert_PY_to_PO(trend/100)
            _return = norm.rvs(trend, self._sigma)
            
            self.buy_price = self.sell_price = self._cum_factor * self._init_price
            self._cum_factor *= (1+_return)
            
        buy_price = self.buy_price + norm.rvs(-1, 1)
        sell_price = self.sell_price + norm.rvs(1, 1)
        self.count = (self.count + 1) % (self._orders_per_second * 30)
        return [round(buy_price), round(sell_price)]
    
    def convert_PY_to_PO(self, PY: float) -> float:
        """
        Funciton to convert any variable in per year unit into per order.
        """

        return (PY / (365 * 24*60*60))/self._orders_per_second