from enum import Enum
from InsertOrder import InsertOrder, LifeSpan, Side
import sys
import exchange_pb2 as proto
import State
from time import sleep
from typing import Callable
from threading import Thread

from websocket import WebSocketApp

HEADER_LENGTH = 8

class ExchangeClient:
    '''
    A client class responsible for sending InsertOrder object through socket.
    '''
    def __init__(self, hostname: str = '127.0.0.1', port: int = 15001):
        
        self.uri = f'wss://{hostname}:{port}'
        self.ws = WebSocketApp(self.uri, on_message=self.on_message, on_error=self.on_error)
        
        # hash event_enum: Event => list[handler: Callable]
        self.handlers = {event_enum: [] for event_enum in event_to_class}
        #self.client_thread = Thread(target=self._run_client)
        #self.client_thread = Thread(target=self.ws.run_forever)
        Thread(target=self.ws.run_forever).start()
        sleep(1)
        self.state = State.NotLoggedInState(self)

    def run(self):
        self.state.run()

    def on_message(self, ws, message) -> None:
        # first 4 bytes is event type
        event_type_raw = message[:4]
        event_type = int.from_bytes(event_type_raw, byteorder="little")
        
        print(f"Message type: {event_type}")
        
        if not len(event_type_raw):
            print("Server closed connection")
            ws.close()
            sys.exit()
        
        event_enum = Event(event_type)
        event_proto_obj = event_to_class[event_enum]()
        event_proto_obj.ParseFromString(message[4:])
        
        self.emit(event_enum, event_proto_obj)
    
    def on_error(self, ws, error):
        print(error)


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

    def send_login_request(self, key: str) -> None:
        self.state.send_login_request(key)

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
    Event.UPDATE: proto.OrderUpdateMessage,
    Event.LOGINRESPONSE: proto.LoginResponse
}

if __name__ == '__main__':
    client = ExchangeClient()
    client.add_handler(Event.UPDATE, print)
    client.add_handler(Event.LOGINRESPONSE, print)
    
    client.send_login_request("6f0cb665-c2ea-4460-8442-ebfbe01fbedf")
    # res = client.send_login_request("95e95dae-b722-4b2e-9c11-db7088041b63")

    sleep(4)
    client.send_insert_request(InsertOrder(5, 100, LifeSpan.GFD, Side.BUY, 0, 0))
    # client.send_insert_request(InsertOrder(5, 100, LifeSpan.GFD, Side.SELL, 0, 0))
