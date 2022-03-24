from PriceGeneratorStrategy import PriceGeneratorStrategy
from TrendManager import TrendManager
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
        prices = []
        time = datetime.datetime.now()

        for _ in range(600000):
            time += datetime.timedelta(seconds=1/self._orders_per_second)
            prices.append((time.strftime("%Y-%d-%m %H:%M:%S"), self._priceGenStrategy.generate_price(self._trend)))

        return prices

    @property
    def strategy(self):
        return self._priceGenStrategy
    
    @strategy.setter
    def strategy(self, priceGenStrategy: PriceGeneratorStrategy):
        self._priceGenStrategy = priceGenStrategy

if __name__ == '__main__':
    from BondPriceGeneratorStrategy import BondPriceGeneratorStrategy
    from StockPriceGeneratorStrategy import StockPriceGeneratorStrategy
    import pandas as pd

    DG = DataGenerator(
        StockPriceGeneratorStrategy(100, -0.1, 1),
        orders_per_second=0.01,
        APY=30,
        change_frequency=2,
        APY_range = [-30, 30]
        )
    prices = DG.generate_data()

    df = pd.DataFrame(prices, columns=['time', 'price']).set_index('time')
    df.to_csv('example.csv')