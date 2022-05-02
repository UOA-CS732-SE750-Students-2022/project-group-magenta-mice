from abc import ABC, abstractmethod
from ExchangeClient import ExchangeClient, Event
from InsertOrder import InsertOrder
import exchange_pb2 as proto
from LoginResponse import LoginResponse
import struct, logging

class State(ABC):
    def __init__(self, exchange_client: ExchangeClient):
        self.exchange_client = exchange_client
    
    @abstractmethod
    def run(self) -> None:
        pass
    
    @abstractmethod
    def send_insert_request(self, insert_order: InsertOrder) -> None:
        pass
    
    @abstractmethod
    def send_login_request(self, key: str) -> LoginResponse:
        pass
    
    
class NotLoggedInState(State):
    def __init__(self, exchange_client: ExchangeClient):
        super().__init__(exchange_client)

    def run(self) -> None:
        raise Exception("Not logged in")
    
    def send_insert_request(self, insert_order: InsertOrder) -> None:
        raise Exception("Not logged in")
    
    def send_login_request(self, key: str) -> LoginResponse:
        login_request = proto.LoginRequest()
        login_request.key = key
        ser_login_req = login_request.SerializeToString()
        # login type + content length + login content
        self.exchange_client.socket.send(
            struct.pack('<i', proto.LOGIN) 
            + struct.pack('<i', len(ser_login_req))
            + ser_login_req
            )
        
        event_type = int.from_bytes(self.exchange_client.socket.recv(4), byteorder='little')
        data_length = int.from_bytes(self.exchange_client.socket.recv(4), byteorder='little')
        data = self.exchange_client.socket.recv(data_length)

        login_response = proto.LoginResponse()
        login_response.ParseFromString(data)
        logging.info('Client logged in successfully')
        
        self.exchange_client.change_state(LoggedInState(self.exchange_client))
        
        return LoginResponse(login_response)
    
    
class LoggedInState(State):
    def __init__(self, exchange_client: ExchangeClient):
        super().__init__(exchange_client)
        
    def run(self) -> None:
        self.exchange_client.socket.setblocking(False)
        self.exchange_client.client_thread.start()
        logging.info('Client started successfully')
        self.exchange_client.change_state(RunningState(self.exchange_client))
    
    def send_insert_request(self, insert_order: InsertOrder) -> None:
        raise Exception('Client not running')
    
    def send_login_request(self, key: str) -> LoginResponse:
        raise Exception('Client already logged in')

    
class RunningState(State):
    def __init__(self, exchange_client: ExchangeClient):
        super().__init__(exchange_client)
        
    def run(self) -> None:
        raise Exception('Client already running')

    def send_insert_request(self, insert_order: InsertOrder) -> None:
        ser_insert_order = insert_order.serialize_to_string()
        
        # message type + content length + content
        self.exchange_client.socket.send(
            struct.pack('<i', proto.INSERT_ORDER) 
            + struct.pack('<i', len(ser_insert_order)) 
            + ser_insert_order
            )
        
        # logging.info('insert request has been sent') this might spam
    
    def send_login_request(self, key: str) -> LoginResponse:
        raise Exception('Client already logged in')
    