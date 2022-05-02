from src.DataServer import DataServer

import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Runs data server')
    parser.add_argument('-log', 
                        help='Logs order objects on command line without starting socket.',
                        action='store_true'
                        )
    args = parser.parse_args()

    ds = DataServer(
        instrument_id=0,
        init_price=100, 
        volatility=10, 
        key='example_key',
        max_position_limit=10,
    )
    
    if args.log:
        ds.log_orders()
    else:
        ds.run()