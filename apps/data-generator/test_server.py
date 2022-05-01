import socket
import struct
import libs.exchange_pb2 as proto
from time import sleep
EVENTS = {
    proto.EXCHANGE_FEED: proto.ExchangeFeed,
    proto.ORDER_FILL: proto.OrderFillMessage,
    proto.ORDER_UPDATE: proto.OrderUpdateMessage
}

if __name__ == '__main__':
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ip = '127.0.0.1'
    port=15001
    s.bind((ip, port))
    s.listen(1)
    c, addr = s.accept()
    print ('Got connection from', addr )
        
    while True:
        obj = proto.OrderUpdateMessage()
        obj.volumeRemaining = 100
        obj_ser = obj.SerializeToString()

        c.send(
            struct.pack('<q', 100) 
            + struct.pack('<i', proto.ORDER_UPDATE) 
            + struct.pack('<i', len(obj_ser))
            + obj_ser 
        )
        sleep(1)
        