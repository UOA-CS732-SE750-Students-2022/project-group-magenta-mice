from InsertOrder import InsertOrder
import socket, errno, sys, select, struct
import exchange_pb2 as proto
from typing import Callable, Union

HEADER_LENGTH = 8

# dict: event proto enum -> proto class signature
EVENTS = {
    proto.EXCHANGE_FEED: proto.ExchangeFeed,
    proto.ORDER_FILL: proto.OrderFillMessage,
    proto.ORDER_UPDATE: proto.OrderUpdateMessage
}

class ExchangeClient:
    '''
    A client class responsible for sending InsertOrder object through socket.
    '''
    def __init__(self, ip: str = '127.0.0.1', port: int = 15001):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((ip, port))
        self.socket.setblocking(False)
        
        # hash event_num: int (proto.MessageType) => list[handler: Callable]
        self.handlers = {event_num: [] for event_num in EVENTS}
        
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
                            
                        message_type = int.from_bytes(s.recv(4), byteorder='little')
                        data_length = int.from_bytes(s.recv(4), byteorder='little')
                        
                        data = s.recv(data_length)
                        
                        event_proto_obj = EVENTS[message_type]()
                        event_proto_obj.ParseFromString(data)
                        
                        self.emit(message_type, event_proto_obj)
                        
            except IOError as e:
                if e.errno != errno.EAGAIN and e.errno != errno.EWOULDBLOCK:
                    sys.exit(1)
                continue
            except Exception:
                sys.exit(1)
    
    
    def send_insert_request(self, insert_order: InsertOrder):
        ser_insert_order = insert_order.SerializeToString()
        
        # message type + content length + content
        self.socket.send(
            struct.pack('<i', proto.INSERT_ORDER) + struct.pack('<i', len(ser_insert_order)) + ser_insert_order
            )
    
    def add_handler(self, event_num: int, handler: Callable):
        if event_num not in EVENTS:
            raise Exception(f'Event number {event_num} does not exist')
        
        self.handlers[event_num].append(handler)
    
    def emit(self, event_num: int, data): 
        #IDE complains but this typing should work data: Union[tuple(EVENTS.values())]
        
        if event_num not in EVENTS:
            raise Exception(f'Event number {event_num} does not exist')
        
        for handler in self.handlers[event_num]:
            try:
                handler(data)
            except Exception as e:
                print(e)
                return False
        
        return True
 