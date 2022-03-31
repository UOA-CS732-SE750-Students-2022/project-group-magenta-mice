from time import sleep
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
        buy, sell = self._priceGenStrategy.generate_prices(self._trend)
        sleep(self._orders_per_second)
        return buy, sell
        # prices = []
        # time = datetime.datetime.now()

        # for _ in range(100):
        #     time += datetime.timedelta(seconds=1/self._orders_per_second)
        #     buy, sell = self._priceGenStrategy.generate_prices(self._trend)
        #     prices.append((time.strftime("%Y-%d-%m %H:%M:%S"), buy, 'buy'))
        #     prices.append((time.strftime("%Y-%d-%m %H:%M:%S"), sell, 'sell'))

        #return prices

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

    # DG = DataGenerator(
    #     StockPriceGeneratorStrategy(100, -0.1, 1),
    #     orders_per_second=0.01,
    #     APY=30,
    #     change_frequency=2,
    #     APY_range = [-30, 30]
    #     )

    DG = DataGenerator(
        BondPriceGeneratorStrategy(100, 1),
        orders_per_second=10
    )

    prices = DG.generate_data()

    # df = pd.DataFrame(prices, columns=['time', 'price', 'type']).set_index('time')
    # df.to_csv('example.csv')