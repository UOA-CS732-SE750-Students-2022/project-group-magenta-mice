#!/usr/bin/python

from src.DataServer import DataServer
from src.generators.DataGenerator import DataGenerator
from src.generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy
from src.generators.StockPriceGeneratorStrategy import StockPriceGeneratorStrategy

import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Runs data server')
    parser.add_argument('init_price', metavar='init_price', type=float, 
                    help='inital price')
    
    parser.add_argument('volatility', metavar='volatility', type=float, 
                    help='volatility in percentage w.r.t. the initial price')
    
    parser.add_argument('APY', metavar='APY', type=float, 
                    help='Annual Percentage Yeild for the instrument')
    
    parser.add_argument('-stock', 
                        help='Switch the instrument type to stock',
                        action='store_true'
                        )
    
    parser.add_argument('-log', 
                        help='Logs order objects on command line without starting socket.',
                        action='store_true'
                        )
    
    args = parser.parse_args()
    
    if args.stock:
        price_gen = StockPriceGeneratorStrategy(args.init_price, args.volatility)
    else:
        price_gen = BondPriceGeneratorStrategy(args.init_price, args.volatility)
        
    data_generator = DataGenerator(
            price_gen,
            APY = args.APY
        )
    ds = DataServer(
        data_generator=data_generator,
        instrument_id=0,
        key='example_key',
        max_position_limit=10,
    )
    
    if args.log:
        ds.log_orders()
    else:
        ds.run()