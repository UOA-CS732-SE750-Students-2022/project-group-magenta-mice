from src.DataServer import DataServer

if __name__ == '__main__':
    instrument_id = 0
    init_price=100
    volatility=1 
    max_position_limit = 10

    ds = DataServer(
        instrument_id, 
        init_price, 
        volatility, 
        max_position_limit
    )

    ds.run()