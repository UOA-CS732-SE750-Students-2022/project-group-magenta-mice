#!/usr/bin/python

from src.DataServer import DataServer
from src.generators.DataGenerator import DataGenerator


import argparse, json

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Runs data server')
    parser.add_argument('-config_path', metavar='path/to/config', type=str, 
                        default='config.json',
                        help='Path to json config file')
    parser.add_argument('-log', 
                        help='Logs order objects on command line without starting socket.',
                        action='store_true'
                        )
    
    args = parser.parse_args()
    
    with open(args.config_path, 'r') as config_file:
        config = json.load(config_file)
        
    data_generators = []
    for instrument in config['instruments']:
        data_generators.append(DataGenerator(instrument))

    ds = DataServer(
        data_generators=data_generators,
        key=config['marketMakerKey'],
        hostname=config['host'],
        port=int(config['port'])
    )
    
    if args.log:
        ds.log_orders()
    else:
        ds.run()