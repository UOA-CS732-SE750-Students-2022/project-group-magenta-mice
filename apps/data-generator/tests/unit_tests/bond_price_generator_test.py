import pytest

from src.generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy
from src.generators.TrendManager import TrendManager

@pytest.fixture
def trend_manager():
    return TrendManager(
        0, 1, 0, [0,0]
    )

def test_valid_input():
    bdg = BondPriceGeneratorStrategy(100, 0, random=False)
    assert bdg.generate_prices(trend_manager) == [100, 100]

def test_negative_price():
    try:
        bdg = BondPriceGeneratorStrategy(-100, 10, random=False)
        assert False
    except ValueError:
        assert True

def test_invalid_volatility():
    try:
        bdg = BondPriceGeneratorStrategy(100, 1000, random=False)
        assert False
    except ValueError:
        assert True