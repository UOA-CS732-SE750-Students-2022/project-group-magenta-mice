import scipy, random
from typing import List

class TrendManager:
    def __init__(self, init_trend: float, orders_per_second: int, change_frequency: float, trend_range: List[float]):
        """
        Args:
            init_trend: Annual Percentage Yeild (APY) in unit %
            orders_per_second: Number of orders per second
            change_frequency: frequency of changing trend in a year (e.g. 2 means the trend would change 2 times a year)
            trend_range: list containing minimum APY and maximum APY in unit %. The trend would fall into the range in a uniform fasion.
        """
    
        self._orders_per_second = orders_per_second

        # this is a chance that the change WOULD NOT happen per order
        chance_per_order = self._convert_PY_to_PO(change_frequency)

        if chance_per_order < 1:
            self._init_chance = 1-chance_per_order
            self._cur_chance = 1-self._init_chance
        else:
            self._init_chance = 0
            self._cur_chance = 0
        
        # percentage threshold to change the trend
        self._threshold = random.uniform(0.7, 0.9)

        # computing percentage yeild per order
        self._trend = self._convert_PY_to_PO(init_trend)
        self._trend_range = [self._convert_PY_to_PO(trend) for trend in trend_range]
    
    def get_trend(self):
        """
        Returns the current percentage yeild per order.
        Changes PYPO some value within trend_range with chance.
        """

        if self._threshold < 1 - self._cur_chance:
            self._change_trend()
            self._cur_chance  = self._init_chance
            self._threshold = random.uniform(0.7, 0.9)
        else:
            self._cur_chance *= self._init_chance
        
        return self._trend


    def _change_trend(self):
        self._trend = scipy.stats.uniform.rvs(loc=self._trend_range[0], scale=self._trend_range[1] - self._trend_range[0])
    
    def _convert_PY_to_PO(self, PY: float):
        """
        Funciton to convert any variable in per year unit into per order.
        """

        return (PY / (365 * 24*60*60))/self._orders_per_second