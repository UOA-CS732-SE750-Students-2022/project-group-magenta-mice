#!/usr/bin/python

from distutils.dir_util import copy_tree
import socket, time
from multiprocessing import Process
from select import select

from .protocol import exchange_pb2 as exchange_proto
from .generators.DataGenerator import DataGenerator
from .generators.BondPriceGeneratorStrategy import BondPriceGeneratorStrategy


class DataServer:
    """
    Server for data generator. It uses web socket to communicate with clients.
    """

    def __init__(self, instrument_id, init_price, volatility, max_position_limit):
        """
        Instantiate socket to be used.
        """
        self.s = socket.socket()

        self.instrument_id = instrument_id
        self.max_position_limit = max_position_limit

        ##### To be configured #####
        self.PORT = 3333
        self.NUM_DATA_GENRATORS = 5
        self.HOSTNAME = '127.0.0.1'
        self.order_per_second = 5

        self.client_id = 0

        self.data_generator = DataGenerator(
            BondPriceGeneratorStrategy(init_price, volatility),
            orders_per_second = self.order_per_second
        )

        ##### end #####

        self.s.bind((self.HOSTNAME,  self.PORT))
    
    def on_new_client(self, client_socket, addr):
        """
        A method to be called by a thread or process on a new client connects 
        to the socket
        """

        print('run')
        while True:
            try:
                buy_price, sell_price = self.data_generator.generate_data()
                
                buy_order = self._create_buy_order(buy_price)
                client_socket.send(buy_order.SerializeToString())

                sell_order = self._create_sell_order(sell_price)
                client_socket.send(sell_order.SerializeToString())

                time.sleep(1/self.order_per_second)

                continue
            except Exception as e:
                client_socket.close()
                raise e

    def run(self):

        self.s.listen(self.NUM_DATA_GENRATORS)
        print("socket is listening")
        pool_of_processes = []
        while True:
            try:

                # For ctrl+c 
                ready, _, _ = select([self.s], [], [], 1)
                if ready:
                    c, addr = self.s.accept()
                    print("Got connection from ", addr)
                    
                    p = Process(target=self.on_new_client, args=(c, addr))
                    p.daemon = True
                    p.start()
                    pool_of_processes.append(p)
                continue
            except KeyboardInterrupt:
                break
            except Exception as e:
                print("Error occured "+ str(e))
                break
        
        print("Closing socket...")
        self.s.close()

        for process in pool_of_processes:
            process.terminate()
            process.join()

    def __create_order(self, price):
        order = exchange_proto.InsertOrderRequest()
        order.lifespan = exchange_proto.InsertOrderRequest.GFD
        order.clientId = self.client_id
        self.client_id += 1
        
        order.instrumentId = self.instrument_id
        order.price = price
        order.volume = self.max_position_limit * 10

        return order

    def _create_sell_order(self, sell_price):
        sell_order = self.__create_order(sell_price)
        sell_order.side = exchange_proto.InsertOrderRequest.SELL

        return sell_order

    def _create_buy_order(self, buy_price):
        buy_order = self.__create_order(buy_price)
        buy_order.side = exchange_proto.InsertOrderRequest.BUY

        return buy_order