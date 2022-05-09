import socket
from time import sleep
import messaging.python.exchange_pb2 as protocol
import struct
import select
import errno
import sys

HOST = "localhost"
PORT = 15001

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

print(f"Connection established to server {HOST}: {PORT}")

sleep(1)

# s.send(bytes("d\n", "ascii"));
HEADER_LENGTH = 8


login = protocol.LoginRequest();
login.key = "6f0cb665-c2ea-4460-8442-ebfbe01fbedf"
ser = login.SerializeToString()
data = struct.pack('<i', 0) + struct.pack('<i', len(ser) ) + ser
s.send(data)

inserted = False

while True:
  try:
    read_sockets, _, exception_sockets = select.select([s], [], [])
    for notified_socket in read_sockets:
        if notified_socket == s:
          messageTypeRaw = s.recv(4)
          messageType = int.from_bytes(messageTypeRaw, byteorder="little")
          print(f"Message type: {messageType}")

          if not len(messageTypeRaw):
            print("Server closed connection")
            sys.exit()

          sizeRaw = s.recv(4)
          size = int.from_bytes(sizeRaw, byteorder="little")
          print(f"Message size: {size}")


          data = s.recv(size)
          if (messageType == 2):
            res = protocol.LoginResponse()
            res.ParseFromString(data)
            print(res)
          elif (messageType == 31):
            res = protocol.ExchangeFeed()
            res.ParseFromString(data)
            print(res)

          if (not inserted):
            inserted = True

            order = protocol.InsertOrderRequest();
            order.lifespan = protocol.InsertOrderRequest.GFD
            order.instrumentId = 0
            order.price = 100
            order.volume = 150
            order.side = protocol.InsertOrderRequest.BUY
            ser = order.SerializeToString()
            b = struct.pack('<i', protocol.INSERT_ORDER) + struct.pack('<i', len(ser) ) + ser
            s.send(b);
  except IOError as e:
    if e.errno == errno.EAGAIN or e.errno != errno.EWOULDBLOCK:
        continue
    print("Error 1")
    sys.exit(1)
  except Exception as e:
    print(e)
    print("Error 2")
    sys.exit(1)
