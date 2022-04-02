# Import socket module
import socket            
import json
import protocol.exchange_pb2 as exchange_proto
# Create a socket object
s = socket.socket()        
 
# Define the port on which you want to connect
port = 3333
 
# connect to the server on local computer
s.connect(('127.0.0.1', port))

# receive data from the server and decoding to get the string.
while True:
    try:
        order = exchange_proto.InsertOrderRequest()
        order.ParseFromString(s.recv(1024))
        print (order)
    except:
        # close the connection
        s.close()    
     