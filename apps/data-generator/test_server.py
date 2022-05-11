import struct
import libs.exchange_pb2 as proto
from time import sleep

import libs.exchange_pb2 as exchange_proto
import websockets, asyncio

EVENTS = {
    proto.EXCHANGE_FEED: proto.ExchangeFeed,
    proto.ORDER_FILL: proto.OrderFillMessage,
    proto.ORDER_UPDATE: proto.OrderUpdateMessage
}

async def handler(websocket):
    message = await websocket.recv()
    #login message
    #event_type = int.from_bytes(message[:4], byteorder='little')
    content = message[4:]
    
    login_req = proto.LoginRequest()
    login_req.ParseFromString(content)
    print(login_req)
    
    # login response
    login_res = proto.LoginResponse()
    instrument = login_res.instruments.add()
    instrument.id = 1
    instrument.positionLimit = 10
    instrument2 = login_res.instruments.add()
    instrument2.id = 2
    instrument2.positionLimit = 10
    
    ser_login_res = login_res.SerializeToString()
    await websocket.send(
            struct.pack('<i', proto.LOGIN_RESPONSE)
            + ser_login_res
            )

    while True:
        # obj = proto.OrderUpdateMessage()
        # obj.volumeRemaining = 100
        # obj_ser = obj.SerializeToString()
        
        # await websocket.send(
        #     struct.pack('<i', proto.ORDER_UPDATE)
        #     + obj_ser
        # )
        # sleep(1)
        
        
        # for insert order
        message = await websocket.recv()
        order = exchange_proto.InsertOrderRequest()
        order.ParseFromString(message[4:])
        print(order)
        print('')

async def main():
    ip = '127.0.0.1'
    port=4000
    
    async with websockets.serve(handler, ip, port):
        await asyncio.Future()
        
if __name__ == '__main__':
    asyncio.run(main())
    
    
# if __name__ == '__main__':
#     s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     ip = '127.0.0.1'
#     port=15001
#     s.bind((ip, port))
#     s.listen(1)
#     c, addr = s.accept()
#     print ('Got connection from', addr )
    
#     # login message
#     event_type = int.from_bytes(c.recv(4), byteorder='little')
#     data_length = int.from_bytes(c.recv(4), byteorder='little')
                    
#     data = c.recv(data_length)
#     login_req = proto.LoginRequest()
#     login_req.ParseFromString(data)
#     print(login_req)
    
#     # login response
#     login_res = proto.LoginResponse()
#     instrument = login_res.instruments.add()
#     instrument.id = 1
#     instrument.positionLimit = 10
#     instrument2 = login_res.instruments.add()
#     instrument2.id = 2
#     instrument2.positionLimit = 10
    
#     ser_login_res = login_res.SerializeToString()
#     c.send(
#             struct.pack('<i', proto.LOGIN) 
#             + struct.pack('<i', len(ser_login_res))
#             + ser_login_res
#             )
    
    
#     while True:
#         obj = proto.OrderUpdateMessage()
#         obj.volumeRemaining = 100
#         obj_ser = obj.SerializeToString()

#         c.send(struct.pack('<i', proto.ORDER_UPDATE) 
#             + struct.pack('<i', len(obj_ser))
#             + obj_ser 
#         )
#         sleep(3)
        