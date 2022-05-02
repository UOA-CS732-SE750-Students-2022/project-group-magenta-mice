import socket
from time import sleep
import messaging.python.exchange_pb2 as protocol
import struct

HOST = "localhost"
PORT = 15001

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

print(f"Connection established to server {HOST}: {PORT}")

sleep(1)

# s.send(bytes("d\n", "ascii"));
HEADER_LENGTH = 8

while True:

    # order = protocol.InsertOrderRequest();
    # order.lifespan = protocol.InsertOrderRequest.GFD
    # order.instrumentId = 0
    # order.price = 100
    # order.volume = 250
    # ser = order.SerializeToString()

    # b = struct.pack('<i', 11) + struct.pack('<i', len(ser) ) + ser

    # s.send(b);


    login = protocol.LoginRequest();
    login.key = "6f0cb665-c2ea-4460-8442-ebfbe01fbedf"
    ser = login.SerializeToString()
    data = struct.pack('<i', 0) + struct.pack('<i', len(ser) ) + ser
    s.send(data)

    # break

    messageTypeRaw = s.recv(4)
    messageType = int.from_bytes(messageTypeRaw, byteorder="little")

    sizeRaw = s.recv(4)
    size = int.from_bytes(sizeRaw, byteorder="little")

    data = s.recv(size)
    response = protocol.LoginResponse()
    response.ParseFromString(data)
    print(response)

    break
    # if not data:
    #     break

    # request = protocol.InsertOrderRequest()
    # request.ParseFromString(data)
    # print(request)




print("File transfer complete")
