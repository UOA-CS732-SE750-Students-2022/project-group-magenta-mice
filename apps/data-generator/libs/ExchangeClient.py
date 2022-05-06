from enum import Enum
from InsertOrder import InsertOrder
from LoginResponse import LoginResponse
import socket, errno, sys, select
import exchange_pb2 as proto
import State
from time import sleep
from typing import Callable
from threading import Thread

HEADER_LENGTH = 8

class ExchangeClient:
    '''
    A client class responsible for sending InsertOrder object through socket.
    '''
    def __init__(self, hostname: str = '127.0.0.1', port: int = 15001):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((hostname, port))
        self.socket.setblocking(True)
        
        # hash event_enum: Event => list[handler: Callable]
        self.handlers = {event_enum: [] for event_enum in event_to_class}
        self.client_thread = Thread(target=self._run_client)
        
        self.state = State.NotLoggedInState(self)
        
    def run(self):
        self.state.run()
        
    def _run_client(self) -> None:
        while True:
            try:
                (readable, _, _) = select.select(
                    [self.socket], [], []
                )
                
                for s in readable:
                    if s == self.socket:
                        
                        server_header = s.recv(HEADER_LENGTH)
                        if not len(server_header):
                            sys.exit()
                            
                        event_type = int.from_bytes(s.recv(4), byteorder='little')
                        data_length = int.from_bytes(s.recv(4), byteorder='little')
                    
                        data = s.recv(data_length)
                        
                        event_enum = Event(event_type)
                        event_proto_obj = event_to_class[event_enum]()
                        event_proto_obj.ParseFromString(data)
                        
                        self.emit(event_enum, event_proto_obj)
                        
            except IOError as e:
                sleep(1)
                if e.errno == errno.EAGAIN or e.errno != errno.EWOULDBLOCK:
                    continue
                
                self.client_thread.join()
                sys.exit(1)
            except Exception:
                self.client_thread.join()
                sys.exit(1)
    
    
    def send_insert_request(self, insert_order: InsertOrder) -> None:
        self.state.send_insert_request(insert_order)
    
    def add_handler(self, event_enum: 'Event', handler: Callable):
        if event_enum not in event_to_class:
            raise Exception(f'Event number {event_enum} does not exist')
        
        self.handlers[event_enum].append(handler)
    
    def emit(self, event_enum: 'Event', data) -> None:
        
        if event_enum not in event_to_class:
            raise Exception(f'Event number {event_enum} does not exist')
        
        for handler in self.handlers[event_enum]:
            try:
                handler(data)
            except Exception as e:
                print(e)
                return False
        
        return True
    
    def send_login_request(self, key: str) -> LoginResponse:
        return self.state.send_login_request(key)
    
    def change_state(self, state: State) -> None:
        self.state = state
        
class Event(Enum):
    Feed = FEED = proto.EXCHANGE_FEED
    Fill = FILL = proto.ORDER_FILL
    Update = UPDATE = proto.ORDER_UPDATE
    LoginResponse = LOGINRESPONSE = proto.LOGIN_RESPONSE

# dict: event proto enum -> proto class signature
event_to_class = {
    Event.FEED: proto.ExchangeFeed,
    Event.FILL: proto.OrderFillMessage,
    Event.UPDATE: proto.OrderUpdateMessage
}

if __name__ == '__main__':
    client = ExchangeClient()
    client.add_handler(Event.UPDATE, print)
    res = client.send_login_request('sample')
    print(res)
    client.run()