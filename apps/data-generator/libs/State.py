from abc import ABC, abstractmethod
from ExchangeClient import ExchangeClient
from InsertOrder import InsertOrder
import exchange_pb2 as proto
from LoginResponse import LoginResponse
import struct
from time import sleep

from websocket import ABNF

class State(ABC):
    def __init__(self, exchange_client: ExchangeClient):
        self.exchange_client = exchange_client

    @abstractmethod
    def send_insert_request(self, insert_order: InsertOrder) -> None:
        pass

    @abstractmethod
    def send_login_request(self, key: str) -> None:
        pass
    
    @abstractmethod
    def send_cancel_order_request(self,client_id: int) -> None:
        pass

class NotLoggedInState(State):
    def __init__(self, exchange_client: ExchangeClient):
        super().__init__(exchange_client)

    def send_insert_request(self, insert_order: InsertOrder) -> None:
        raise Exception("Not logged in")

    def send_login_request(self, key: str) -> None:
        
        login_request = proto.LoginRequest()
        login_request.key = key
        ser_login_req = login_request.SerializeToString()
        # login type + content length + login content
        self.exchange_client.ws.send(
            struct.pack('<i', proto.LOGIN)
            + ser_login_req, ABNF.OPCODE_BINARY
        )
        
        sleep(4)
        self.exchange_client.change_state(LoggedInState(self.exchange_client))
    
    def send_cancel_order_request(self,client_id: int) -> None:
        raise Exception("Not logged in")

class LoggedInState(State):
    def __init__(self, exchange_client: ExchangeClient):
        super().__init__(exchange_client)

    def send_insert_request(self, insert_order: InsertOrder) -> None:
        ser_insert_order = insert_order.serialize_to_string()

        # message type + content
        self.exchange_client.ws.send(
            struct.pack('<i', proto.INSERT_ORDER)
            + ser_insert_order, 
            ABNF.OPCODE_BINARY
            )

        # logging.info('insert request has been sent') this might spam

    def send_login_request(self, key: str) -> None:
        raise Exception('Client already logged in')
    
    def send_cancel_order_request(self, client_id: int) -> None:
        cancel_order_proto = proto.CancelOrderRequest()
        cancel_order_proto.clientId = client_id
        ser_cancel_order = cancel_order_proto.SerializeToString()
        
        # message type + content
        self.exchange_client.ws.send(
            struct.pack('<i', proto.CANCEL_ORDER)
            + ser_cancel_order, 
            ABNF.OPCODE_BINARY
            )