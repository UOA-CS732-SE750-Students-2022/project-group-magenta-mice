import exchange_pb2 as proto

class LoginResponse:
    def __init__(self, login_response_proto: proto.LoginResponse):
        self.instruments = []
        for instrument in login_response_proto.instruments:
            self.instruments.append(self.Instrument(instrument))
        
    class Instrument:
        def __init__(self, instrument):
            self.id = instrument.id
            self.ticker = instrument.ticker
            self.position_limit = instrument.positionLimit
            self.tick_size_in_cents = instrument.tickSizeInCents
        
        def get_id(self) -> int:
            return self.id
        
        def get_ticker(self) -> str:
            return self.ticker
        
        def get_position_limit(self) -> int:
            return self.position_limit
        
        def get_tick_size_in_cents(self) -> int:
            return self.tick_size_in_cents

    def __str__(self):
        return '{instruments: ' + str(self.instruments) + '}'