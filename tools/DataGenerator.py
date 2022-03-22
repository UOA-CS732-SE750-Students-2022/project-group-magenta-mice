from generators.PriceGeneratorStrategy import PriceGeneratorStrategy
from random import gauss, seed, randrange
import datetime

class DataGenerator:
    def __init__(self, priceGenStrategy: PriceGeneratorStrategy, orders_per_second: int = 10):
        self._priceGenStrategy = priceGenStrategy
        self._orders_per_second = orders_per_second

    def generate_data(self):
        prices = []
        time = datetime.datetime.now()
        for _ in range(150):
            #time += datetime.timedelta(seconds=randrange(2, 15))
            time += datetime.timedelta(seconds=self._orders_per_second)
            prices.append((time.strftime("%Y-%d-%m %H:%M:%S"), self._priceGenStrategy.generate_price()))

        return prices

    @property
    def strategy(self):
        return self._priceGenStrategy
    
    @strategy.setter
    def strategy(self, priceGenStrategy: PriceGeneratorStrategy):
        self._priceGenStrategy = priceGenStrategy

if __name__ == '__main__':
    from generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy
    from generators.StockPriceGeneratorStrategy import StockPriceGeneratorStrategy
    import pandas as pd

    DG = DataGenerator(StockPriceGeneratorStrategy(100, -0.1, 1))
    prices = DG.generate_data()

    df = pd.DataFrame(prices, columns=['time', 'price']).set_index('time')
    df.to_csv('example.csv')