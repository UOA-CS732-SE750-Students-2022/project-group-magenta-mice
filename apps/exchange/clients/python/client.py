from enum import Enum
import socket
import string
from time import sleep
import traceback
from typing import Any, Callable, Dict, List, Tuple, TypedDict, overload
import exchange_pb2 as proto
import struct
import select
import errno
import sys
from log import Log, LogLevel
from threading import Thread, Lock

HEADER_COMPONENT_LENGTH = 4


class Event(Enum):
    FEED = feed = proto.EXCHANGE_FEED
    UPDATE = update = proto.ORDER_UPDATE
    FILL = fill = proto.ORDER_FILL


class Client:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client_id = 0

        self.prepared_messages = []
        self.mutex = Lock()

        self.listeners: Dict[Event, List[Callable[[Any], None]]] = {}

    def get_header(self) -> Tuple[int, int]:
        messageTypeRaw = self.sock.recv(HEADER_COMPONENT_LENGTH)
        messageType = int.from_bytes(messageTypeRaw, byteorder="little")
        print(f"Message type: {messageType}")

        if not len(messageTypeRaw):
            print("Server closed connection")
            sys.exit()

        sizeRaw = self.sock.recv(HEADER_COMPONENT_LENGTH)
        size = int.from_bytes(sizeRaw, byteorder="little")
        print(f"Message size: {size}")

        return (messageType, size)

    def prepare_message(self, message_type: int, message: str):
        return (
            struct.pack("<i", message_type) + struct.pack("<i", len(message)) + message
        )

    def login(self, key: str):
        self.sock.connect((self.host, self.port))

        login = proto.LoginRequest()
        login.key = key
        ser = login.SerializeToString()
        data = self.prepare_message(proto.LOGIN, ser)
        self.sock.send(data)

        self.sock.settimeout(3)
        message_type, message_len = self.get_header()
        self.sock.settimeout(None)

        if message_type == proto.LOGIN_RESPONSE:
            message = self.sock.recv(message_len)
            login_response = proto.LoginResponse()
            login_response.ParseFromString(message)
            print(login_response)
            return login_response
        else:
            print("Login failed")
            sys.exit(1)

    def _run_client(self):
        while True:
            try:
                if len(self.prepared_messages) > 0:
                    with self.mutex:
                        for message in self.prepared_messages:
                            self.sock.send(message)
                        self.prepared_messages = []

                read_sockets, _, exception_sockets = select.select([self.sock], [], [])
                for notified_socket in read_sockets:
                    if notified_socket == self.sock:
                        message_type, message_len = self.get_header()
                        data = self.sock.recv(message_len)

                        if message_type == proto.EXCHANGE_FEED:
                            res = proto.ExchangeFeed()
                            res.ParseFromString(data)
                            for listener in self.listeners[Event.FEED]:
                                listener(res)
                        elif message_type == proto.ORDER_UPDATE:
                            res = proto.OrderUpdateMessage()
                            res.ParseFromString(data)
                            for listener in self.listeners[Event.UPDATE]:
                                listener(res)
                        elif message_type == proto.ORDER_FILL:
                            res = proto.OrderFillMessage()
                            res.ParseFromString(data)
                            for listener in self.listeners[Event.FILL]:
                                listener(res)

            except IOError as e:
                if e.errno == errno.EAGAIN or e.errno != errno.EWOULDBLOCK:
                    continue
                print("Error 1")
                sys.exit(1)
            except Exception as e:
                print(e)
                print("Error 2")
                # traceback.print_exc()
                sys.exit(1)

    def start(self):
        self.client_thread = Thread(target=self._run_client, daemon=False)
        self.client_thread.start()

    def insert_order(self, instrument, lifespan, side, price: int, volume: int):
        order = proto.InsertOrderRequest()
        order.clientId = self.client_id
        order.instrumentId = instrument
        order.lifespan = lifespan
        order.side = side
        order.price = price
        order.volume = volume
        ser = order.SerializeToString()
        data = self.prepare_message(proto.INSERT_ORDER, ser)
        with self.mutex:
            self.prepared_messages.append(data)
        self.client_id += 1

    @overload
    def add_listener(
        self, event: Event.FEED, listener: Callable[[proto.ExchangeFeed], None]
    ):
        pass

    @overload
    def add_listener(
        self, event: Event.UPDATE, listener: Callable[[proto.OrderUpdateMessage], None]
    ):
        pass

    @overload
    def add_listener(
        self, event: Event.FILL, listener: Callable[[proto.OrderFillMessage], None]
    ):
        pass

    def add_listener(self, event, listener):
        if event not in self.listeners:
            self.listeners[event] = []
        self.listeners[event].append(listener)


if __name__ == "__main__":
    Log.setLogLevel(LogLevel.TRACE)
    client = Client("localhost", 15001)
    login = client.login("6f0cb665-c2ea-4460-8442-ebfbe01fbedf")
    client.start()
    sleep(1)

    client.insert_order(
        0, proto.InsertOrderRequest.GFD, proto.InsertOrderRequest.BUY, 100, 250
    )

    client.add_listener(Event.FEED, lambda x: print(x))
    client.add_listener(Event.FILL, lambda x: print(x))
    client.add_listener(Event.UPDATE, lambda x: print(x))
