import time, random
from typing import List

from .generators.DataGenerator import DataGenerator

from libs.ExchangeClient import ExchangeClient, Event
from libs.InsertOrder import InsertOrder, LifeSpan, Side

class DataServer:
    """
    Server for data generator. It uses socket to communicate with clients.

    """

    def __init__(
        self,
        data_generators: List[DataGenerator],
        key: str,
        hostname: str = '127.0.0.1',
        port: int = 15001
        ):
        """
        Instantiate socket to be used.
        """

        print(hostname + ":" + str(port))
        self.exchange_client = ExchangeClient(hostname=hostname, port=port)

        self.exchange_client.send_login_request(key)
        self.exchange_client.add_handler(Event.FEED, self.run_on_feed)
        self.order_per_second = 10
        self.client_id = 0
        self.data_generators = data_generators

    def run(self):
        num_gens = len(self.data_generators)
        while True:
            try:
                for data_generator in self.data_generators:
                    buy_price, sell_price = data_generator.generate_data()

                    self.exchange_client.send_insert_request(
                        InsertOrder(
                            volume=data_generator.max_position_limit * 10,
                            price=buy_price,
                            lifespan=LifeSpan.GFD,
                            side=Side.BUY,
                            client_id=self.client_id,
                            instrument_id=data_generator.instrument_id
                        )
                    )

                    prev_buy_cid = self.client_id - 2 * num_gens
                    print(f'client_id: {self.client_id}')


                    self.client_id += 1
                    self.exchange_client.send_insert_request(
                        InsertOrder(
                            volume=data_generator.max_position_limit * 10,
                            price=sell_price,
                            lifespan=LifeSpan.GFD,
                            side=Side.SELL,
                            client_id=self.client_id,
                            instrument_id=data_generator.instrument_id
                        )
                    )
                    print(f'client_id: {self.client_id}')
                    prev_sell_cid = self.client_id - 2 * num_gens
                    self.client_id += 1

                    # If previous orders exist, cancel the orders.
                    if prev_buy_cid >= 0:
                        print(prev_buy_cid)
                        self.exchange_client.send_cancel_order_request(prev_buy_cid)
                        print(prev_sell_cid)
                        self.exchange_client.send_cancel_order_request(prev_sell_cid)

                    rand_order_per_sec = self.order_per_second - random.randrange(0, 9)

                time.sleep(1/rand_order_per_sec)

            except Exception as e:
                raise e


    def log_orders(self):
        """
        function to log orders for debugging purposes.
        """

        while True:
            try:
                for data_generator in self.data_generators:
                    buy_price, sell_price = data_generator.generate_data()

                    buy_order = InsertOrder(
                        volume=data_generator.max_position_limit * 10,
                        price=buy_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.BUY,
                        client_id=data_generator.get_client_id(),
                        instrument_id=data_generator.instrument_id
                    )

                    sell_order = InsertOrder(
                        volume=data_generator.max_position_limit * 10,
                        price=sell_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.SELL,
                        client_id=data_generator.get_client_id(),
                        instrument_id=data_generator.instrument_id
                    )

                    data_generator.client_id += 1
                    rand_order_per_sec = self.order_per_second - random.randrange(0, 9)

                    print(buy_order)
                    print(sell_order)

                    time.sleep(1/rand_order_per_sec)

                    continue
            except Exception as e:
                raise e

    def run_on_feed(self, exchange_feed):
        num_gens = len(self.data_generators)
        try:
            for data_generator in self.data_generators:
                buy_price, sell_price = data_generator.generate_data()

                self.exchange_client.send_insert_request(
                    InsertOrder(
                        volume=data_generator.max_position_limit * 10,
                        price=buy_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.BUY,
                        client_id=self.client_id,
                        instrument_id=data_generator.instrument_id
                    )
                )

                prev_buy_cid = self.client_id - 2 * num_gens
                print(f'client_id: {self.client_id}')


                self.client_id += 1
                self.exchange_client.send_insert_request(
                    InsertOrder(
                        volume=data_generator.max_position_limit * 10,
                        price=sell_price,
                        lifespan=LifeSpan.GFD,
                        side=Side.SELL,
                        client_id=self.client_id,
                        instrument_id=data_generator.instrument_id
                    )
                )
                print(f'client_id: {self.client_id}')
                prev_sell_cid = self.client_id - 2 * num_gens
                self.client_id += 1

                # If previous orders exist, cancel the orders.
                if prev_buy_cid >= 0:
                    print(prev_buy_cid)
                    self.exchange_client.send_cancel_order_request(prev_buy_cid)
                    print(prev_sell_cid)
                    self.exchange_client.send_cancel_order_request(prev_sell_cid)

                rand_order_per_sec = self.order_per_second - random.randrange(0, 9)

            time.sleep(1/rand_order_per_sec)

        except Exception as e:
            raise e
