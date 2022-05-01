import exchange_pb2 as exchange_proto
from enum import Enum


class InsertOrder:
    """
    A wrapper class for insert order protobuf object
    """
    def __init__(
        self, volume: int, price: int,
        lifespan: 'LifeSpan', 
        side: 'Side',
        client_id: int, instrument_id: int
        ):
        
        self.insert_order = exchange_proto.InsertOrderRequest()
        
        self.insert_order.price = price
        self.insert_order.volume = volume
        self.insert_order.lifespan = int(lifespan)
        self.insert_order.side = int(side)
        self.insert_order.clientId = client_id
        self.insert_order.instrumentId = instrument_id
       
    def get_protobuf(self) -> exchange_proto.InsertOrderRequest:
        return self.insert_order
    
    def serialize_to_string(self):
        return self.insert_order.SerializeToString()
    
    def __str__(self) -> str:
        return self.insert_order.__str__()
    
class LifeSpan(Enum):
    GFD = exchange_proto.InsertOrderRequest.GFD
    FAK = exchange_proto.InsertOrderRequest.FAK
    def __int__(self):
        return self.value
        
class Side(Enum):
    SELL = exchange_proto.InsertOrderRequest.SELL
    BUY = exchange_proto.InsertOrderRequest.BUY
    def __int__(self):
        return self.value
