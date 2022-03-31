#!/usr/bin/python

from distutils.dir_util import copy_tree
import socket 
from multiprocessing import Process
from select import select
import exchange_pb2

class DataServer:
    """
    Server for data generator. It uses web socket to communicate with clients.
    """

    def __init__(self):
        """
        Instantiate socket to be used.
        """
        self.s = socket.socket()

        # to be modified
        self.PORT = 420
        self.NUM_EXCHANGE = 5
        self.HOSTNAME = ''

        self.s.bind((self.HOSTNAME,  self.PORT))
    
    def on_new_client(self, client_socket, addr):
        """
        A method to be called by a thread or process on a new client connects 
        to the socket
        """
        msg = client_socket.recv(1024)
        while True:
            try:
                print(msg)
                client_socket.send(f"Received {msg}".encode())

                continue
            except Exception as e:
                client_socket.close()
                raise e

    def run(self):
        self.s.listen(self.NUM_EXCHANGE)
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

        
if __name__ == '__main__':
    ds = DataServer()
    ds.run()