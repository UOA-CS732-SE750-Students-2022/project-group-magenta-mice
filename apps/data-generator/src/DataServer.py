#!/usr/bin/python

import  time, random

from .generators.DataGenerator import DataGenerator
from .generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy

from libs.ExchangeClient import ExchangeClient
from libs.InsertOrder import InsertOrder, LifeSpan, Side

class DataServer:
    """
    Server for data generator. It uses socket to communicate with clients.
    """

    def __init__(
        self, instrument_id: int,
        init_price: int, 
        volatility: int, 
        max_position_limit: int,
        hostname: str = '127.0.0.1',
        port: int = 15001
        ):
        """
        Instantiate socket to be used.
        """
        
        self.exch_client = ExchangeClient(hostname=hostname, port=port)

        self.instrument_id = instrument_id
        self.max_position_limit = max_position_limit

        ##### To be configured #####
        self.order_per_second = 10
        self.client_id = 0 
        ##### end #####
        
        self.data_generator = DataGenerator(
            BondPriceGeneratorStrategy(init_price, volatility),
            orders_per_second = self.order_per_second
        )

    def run(self):
  
        while True:
            try:
                buy_price, sell_price = self.data_generator.generate_data()
                
                self.exch_client.send_insert_request(
                    InsertOrder(
                        volume=self.max_position_limit * 10,
                        price=buy_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.BUY,
                        client_id=self.client_id,
                        instrument_id=self.instrument_id
                    )
                )
                
                self.exch_client.send_insert_request(
                    InsertOrder(
                        volume=self.max_position_limit * 10,
                        price=sell_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.SELL,
                        client_id=self.client_id,
                        instrument_id=self.instrument_id
                    )
                )
                
                self.client_id += 1
                rand_order_per_sec = self.order_per_second - random.randrange(0, 10)

                time.sleep(1/rand_order_per_sec)
                
                continue
            except Exception as e:
                raise e
        

    def log_orders(self):
        """
        function to log orders for debugging purposes.
        """

        while True:
            try:
                buy_price, sell_price = self.data_generator.generate_data()
                
                buy_order = InsertOrder(
                        volume=self.max_position_limit * 10,
                        price=buy_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.BUY,
                        client_id=self.client_id,
                        instrument_id=self.instrument_id
                    )
                
                
                sell_order = InsertOrder(
                        volume=self.max_position_limit * 10,
                        price=sell_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.SELL,
                        client_id=self.client_id,
                        instrument_id=self.instrument_id
                    )

                rand_order_per_sec = self.order_per_second - random.randrange(0, 10)

                time.sleep(1/rand_order_per_sec)

                print(buy_order)
                print(sell_order)
                
                continue
            except Exception as e:
                raise e

