import socket
from time import sleep

HOST = "localhost"
PORT = 3333

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

print(f"Connection established to server {HOST}: {PORT}")

sleep(1)

s.send(bytes("d\n", "ascii"));

with open("data", "wb") as f:
    while True:
        data = s.recv(1024)
        if not data:
            break
        f.write(data)
s.close()

print("File transfer complete")
