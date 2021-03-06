# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: libs/protocol/exchange.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='libs/protocol/exchange.proto',
  package='Sim.Protocol',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\x1clibs/protocol/exchange.proto\x12\x0cSim.Protocol\"\x1b\n\x0cLoginRequest\x12\x0b\n\x03key\x18\x01 \x01(\t\"\xa6\x01\n\rLoginResponse\x12;\n\x0binstruments\x18\x01 \x03(\x0b\x32&.Sim.Protocol.LoginResponse.Instrument\x1aX\n\nInstrument\x12\n\n\x02id\x18\x01 \x01(\r\x12\x0e\n\x06ticker\x18\x02 \x01(\t\x12\x15\n\rpositionLimit\x18\x03 \x01(\r\x12\x17\n\x0ftickSizeInCents\x18\x04 \x01(\r\"\x0f\n\rLogoutRequest\"\x86\x02\n\x12InsertOrderRequest\x12\x10\n\x08\x63lientId\x18\x01 \x01(\r\x12\x14\n\x0cinstrumentId\x18\x02 \x01(\r\x12;\n\x08lifespan\x18\x03 \x01(\x0e\x32).Sim.Protocol.InsertOrderRequest.Lifespan\x12\x33\n\x04side\x18\x04 \x01(\x0e\x32%.Sim.Protocol.InsertOrderRequest.Side\x12\r\n\x05price\x18\x05 \x01(\r\x12\x0e\n\x06volume\x18\x06 \x01(\r\"\x1c\n\x08Lifespan\x12\x07\n\x03GFD\x10\x00\x12\x07\n\x03\x46\x41K\x10\x01\"\x19\n\x04Side\x12\x07\n\x03\x42UY\x10\x00\x12\x08\n\x04SELL\x10\x01\"&\n\x12\x43\x61ncelOrderRequest\x12\x10\n\x08\x63lientId\x18\x01 \x01(\r\"U\n\x12OrderUpdateMessage\x12\x10\n\x08\x63lientId\x18\x01 \x01(\r\x12\x14\n\x0cinstrumentId\x18\x02 \x01(\r\x12\x17\n\x0fvolumeRemaining\x18\x03 \x01(\r\"_\n\x10OrderFillMessage\x12\x10\n\x08\x63lientId\x18\x01 \x01(\r\x12\x14\n\x0cinstrumentId\x18\x02 \x01(\r\x12\r\n\x05price\x18\x03 \x01(\r\x12\x14\n\x0cvolumeFilled\x18\x04 \x01(\r\"\xad\x02\n\x0c\x45xchangeFeed\x12\x42\n\x0finstrumentFeeds\x18\x01 \x03(\x0b\x32).Sim.Protocol.ExchangeFeed.InstrumentFeed\x1a\xd8\x01\n\x0eInstrumentFeed\x12\x14\n\x0cinstrumentId\x18\x01 \x01(\r\x12\x41\n\x04\x62ids\x18\x02 \x03(\x0b\x32\x33.Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry\x12\x41\n\x04\x61sks\x18\x03 \x03(\x0b\x32\x33.Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry\x1a*\n\tbookEntry\x12\r\n\x05price\x18\x01 \x01(\r\x12\x0e\n\x06volume\x18\x02 \x01(\r*\xb7\x01\n\x0bMessageType\x12\t\n\x05LOGIN\x10\x00\x12\n\n\x06LOGOUT\x10\x01\x12\x12\n\x0eLOGIN_RESPONSE\x10\x02\x12\x13\n\x0fLOGOUT_RESPONSE\x10\x03\x12\x10\n\x0cINSERT_ORDER\x10\x0b\x12\x10\n\x0c\x43\x41NCEL_ORDER\x10\x0c\x12\x0f\n\x0b\x41MEND_ORDER\x10\r\x12\x10\n\x0cORDER_UPDATE\x10\x15\x12\x0e\n\nORDER_FILL\x10\x16\x12\x11\n\rEXCHANGE_FEED\x10\x1f\x62\x06proto3')
)

_MESSAGETYPE = _descriptor.EnumDescriptor(
  name='MessageType',
  full_name='Sim.Protocol.MessageType',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='LOGIN', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='LOGOUT', index=1, number=1,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='LOGIN_RESPONSE', index=2, number=2,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='LOGOUT_RESPONSE', index=3, number=3,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='INSERT_ORDER', index=4, number=11,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='CANCEL_ORDER', index=5, number=12,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='AMEND_ORDER', index=6, number=13,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='ORDER_UPDATE', index=7, number=21,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='ORDER_FILL', index=8, number=22,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='EXCHANGE_FEED', index=9, number=31,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=1055,
  serialized_end=1238,
)
_sym_db.RegisterEnumDescriptor(_MESSAGETYPE)

MessageType = enum_type_wrapper.EnumTypeWrapper(_MESSAGETYPE)
LOGIN = 0
LOGOUT = 1
LOGIN_RESPONSE = 2
LOGOUT_RESPONSE = 3
INSERT_ORDER = 11
CANCEL_ORDER = 12
AMEND_ORDER = 13
ORDER_UPDATE = 21
ORDER_FILL = 22
EXCHANGE_FEED = 31


_INSERTORDERREQUEST_LIFESPAN = _descriptor.EnumDescriptor(
  name='Lifespan',
  full_name='Sim.Protocol.InsertOrderRequest.Lifespan',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='GFD', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='FAK', index=1, number=1,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=469,
  serialized_end=497,
)
_sym_db.RegisterEnumDescriptor(_INSERTORDERREQUEST_LIFESPAN)

_INSERTORDERREQUEST_SIDE = _descriptor.EnumDescriptor(
  name='Side',
  full_name='Sim.Protocol.InsertOrderRequest.Side',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='BUY', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='SELL', index=1, number=1,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=499,
  serialized_end=524,
)
_sym_db.RegisterEnumDescriptor(_INSERTORDERREQUEST_SIDE)


_LOGINREQUEST = _descriptor.Descriptor(
  name='LoginRequest',
  full_name='Sim.Protocol.LoginRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='Sim.Protocol.LoginRequest.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=46,
  serialized_end=73,
)


_LOGINRESPONSE_INSTRUMENT = _descriptor.Descriptor(
  name='Instrument',
  full_name='Sim.Protocol.LoginResponse.Instrument',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='Sim.Protocol.LoginResponse.Instrument.id', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='ticker', full_name='Sim.Protocol.LoginResponse.Instrument.ticker', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='positionLimit', full_name='Sim.Protocol.LoginResponse.Instrument.positionLimit', index=2,
      number=3, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='tickSizeInCents', full_name='Sim.Protocol.LoginResponse.Instrument.tickSizeInCents', index=3,
      number=4, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=154,
  serialized_end=242,
)

_LOGINRESPONSE = _descriptor.Descriptor(
  name='LoginResponse',
  full_name='Sim.Protocol.LoginResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='instruments', full_name='Sim.Protocol.LoginResponse.instruments', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_LOGINRESPONSE_INSTRUMENT, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=76,
  serialized_end=242,
)


_LOGOUTREQUEST = _descriptor.Descriptor(
  name='LogoutRequest',
  full_name='Sim.Protocol.LogoutRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=244,
  serialized_end=259,
)


_INSERTORDERREQUEST = _descriptor.Descriptor(
  name='InsertOrderRequest',
  full_name='Sim.Protocol.InsertOrderRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='clientId', full_name='Sim.Protocol.InsertOrderRequest.clientId', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='instrumentId', full_name='Sim.Protocol.InsertOrderRequest.instrumentId', index=1,
      number=2, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='lifespan', full_name='Sim.Protocol.InsertOrderRequest.lifespan', index=2,
      number=3, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='side', full_name='Sim.Protocol.InsertOrderRequest.side', index=3,
      number=4, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='price', full_name='Sim.Protocol.InsertOrderRequest.price', index=4,
      number=5, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='volume', full_name='Sim.Protocol.InsertOrderRequest.volume', index=5,
      number=6, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _INSERTORDERREQUEST_LIFESPAN,
    _INSERTORDERREQUEST_SIDE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=262,
  serialized_end=524,
)


_CANCELORDERREQUEST = _descriptor.Descriptor(
  name='CancelOrderRequest',
  full_name='Sim.Protocol.CancelOrderRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='clientId', full_name='Sim.Protocol.CancelOrderRequest.clientId', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=526,
  serialized_end=564,
)


_ORDERUPDATEMESSAGE = _descriptor.Descriptor(
  name='OrderUpdateMessage',
  full_name='Sim.Protocol.OrderUpdateMessage',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='clientId', full_name='Sim.Protocol.OrderUpdateMessage.clientId', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='instrumentId', full_name='Sim.Protocol.OrderUpdateMessage.instrumentId', index=1,
      number=2, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='volumeRemaining', full_name='Sim.Protocol.OrderUpdateMessage.volumeRemaining', index=2,
      number=3, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=566,
  serialized_end=651,
)


_ORDERFILLMESSAGE = _descriptor.Descriptor(
  name='OrderFillMessage',
  full_name='Sim.Protocol.OrderFillMessage',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='clientId', full_name='Sim.Protocol.OrderFillMessage.clientId', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='instrumentId', full_name='Sim.Protocol.OrderFillMessage.instrumentId', index=1,
      number=2, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='price', full_name='Sim.Protocol.OrderFillMessage.price', index=2,
      number=3, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='volumeFilled', full_name='Sim.Protocol.OrderFillMessage.volumeFilled', index=3,
      number=4, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=653,
  serialized_end=748,
)


_EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY = _descriptor.Descriptor(
  name='bookEntry',
  full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='price', full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry.price', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='volume', full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry.volume', index=1,
      number=2, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=1010,
  serialized_end=1052,
)

_EXCHANGEFEED_INSTRUMENTFEED = _descriptor.Descriptor(
  name='InstrumentFeed',
  full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='instrumentId', full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.instrumentId', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='bids', full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.bids', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='asks', full_name='Sim.Protocol.ExchangeFeed.InstrumentFeed.asks', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=836,
  serialized_end=1052,
)

_EXCHANGEFEED = _descriptor.Descriptor(
  name='ExchangeFeed',
  full_name='Sim.Protocol.ExchangeFeed',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='instrumentFeeds', full_name='Sim.Protocol.ExchangeFeed.instrumentFeeds', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_EXCHANGEFEED_INSTRUMENTFEED, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=751,
  serialized_end=1052,
)

_LOGINRESPONSE_INSTRUMENT.containing_type = _LOGINRESPONSE
_LOGINRESPONSE.fields_by_name['instruments'].message_type = _LOGINRESPONSE_INSTRUMENT
_INSERTORDERREQUEST.fields_by_name['lifespan'].enum_type = _INSERTORDERREQUEST_LIFESPAN
_INSERTORDERREQUEST.fields_by_name['side'].enum_type = _INSERTORDERREQUEST_SIDE
_INSERTORDERREQUEST_LIFESPAN.containing_type = _INSERTORDERREQUEST
_INSERTORDERREQUEST_SIDE.containing_type = _INSERTORDERREQUEST
_EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY.containing_type = _EXCHANGEFEED_INSTRUMENTFEED
_EXCHANGEFEED_INSTRUMENTFEED.fields_by_name['bids'].message_type = _EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY
_EXCHANGEFEED_INSTRUMENTFEED.fields_by_name['asks'].message_type = _EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY
_EXCHANGEFEED_INSTRUMENTFEED.containing_type = _EXCHANGEFEED
_EXCHANGEFEED.fields_by_name['instrumentFeeds'].message_type = _EXCHANGEFEED_INSTRUMENTFEED
DESCRIPTOR.message_types_by_name['LoginRequest'] = _LOGINREQUEST
DESCRIPTOR.message_types_by_name['LoginResponse'] = _LOGINRESPONSE
DESCRIPTOR.message_types_by_name['LogoutRequest'] = _LOGOUTREQUEST
DESCRIPTOR.message_types_by_name['InsertOrderRequest'] = _INSERTORDERREQUEST
DESCRIPTOR.message_types_by_name['CancelOrderRequest'] = _CANCELORDERREQUEST
DESCRIPTOR.message_types_by_name['OrderUpdateMessage'] = _ORDERUPDATEMESSAGE
DESCRIPTOR.message_types_by_name['OrderFillMessage'] = _ORDERFILLMESSAGE
DESCRIPTOR.message_types_by_name['ExchangeFeed'] = _EXCHANGEFEED
DESCRIPTOR.enum_types_by_name['MessageType'] = _MESSAGETYPE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

LoginRequest = _reflection.GeneratedProtocolMessageType('LoginRequest', (_message.Message,), dict(
  DESCRIPTOR = _LOGINREQUEST,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.LoginRequest)
  ))
_sym_db.RegisterMessage(LoginRequest)

LoginResponse = _reflection.GeneratedProtocolMessageType('LoginResponse', (_message.Message,), dict(

  Instrument = _reflection.GeneratedProtocolMessageType('Instrument', (_message.Message,), dict(
    DESCRIPTOR = _LOGINRESPONSE_INSTRUMENT,
    __module__ = 'libs.protocol.exchange_pb2'
    # @@protoc_insertion_point(class_scope:Sim.Protocol.LoginResponse.Instrument)
    ))
  ,
  DESCRIPTOR = _LOGINRESPONSE,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.LoginResponse)
  ))
_sym_db.RegisterMessage(LoginResponse)
_sym_db.RegisterMessage(LoginResponse.Instrument)

LogoutRequest = _reflection.GeneratedProtocolMessageType('LogoutRequest', (_message.Message,), dict(
  DESCRIPTOR = _LOGOUTREQUEST,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.LogoutRequest)
  ))
_sym_db.RegisterMessage(LogoutRequest)

InsertOrderRequest = _reflection.GeneratedProtocolMessageType('InsertOrderRequest', (_message.Message,), dict(
  DESCRIPTOR = _INSERTORDERREQUEST,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.InsertOrderRequest)
  ))
_sym_db.RegisterMessage(InsertOrderRequest)

CancelOrderRequest = _reflection.GeneratedProtocolMessageType('CancelOrderRequest', (_message.Message,), dict(
  DESCRIPTOR = _CANCELORDERREQUEST,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.CancelOrderRequest)
  ))
_sym_db.RegisterMessage(CancelOrderRequest)

OrderUpdateMessage = _reflection.GeneratedProtocolMessageType('OrderUpdateMessage', (_message.Message,), dict(
  DESCRIPTOR = _ORDERUPDATEMESSAGE,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.OrderUpdateMessage)
  ))
_sym_db.RegisterMessage(OrderUpdateMessage)

OrderFillMessage = _reflection.GeneratedProtocolMessageType('OrderFillMessage', (_message.Message,), dict(
  DESCRIPTOR = _ORDERFILLMESSAGE,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.OrderFillMessage)
  ))
_sym_db.RegisterMessage(OrderFillMessage)

ExchangeFeed = _reflection.GeneratedProtocolMessageType('ExchangeFeed', (_message.Message,), dict(

  InstrumentFeed = _reflection.GeneratedProtocolMessageType('InstrumentFeed', (_message.Message,), dict(

    bookEntry = _reflection.GeneratedProtocolMessageType('bookEntry', (_message.Message,), dict(
      DESCRIPTOR = _EXCHANGEFEED_INSTRUMENTFEED_BOOKENTRY,
      __module__ = 'libs.protocol.exchange_pb2'
      # @@protoc_insertion_point(class_scope:Sim.Protocol.ExchangeFeed.InstrumentFeed.bookEntry)
      ))
    ,
    DESCRIPTOR = _EXCHANGEFEED_INSTRUMENTFEED,
    __module__ = 'libs.protocol.exchange_pb2'
    # @@protoc_insertion_point(class_scope:Sim.Protocol.ExchangeFeed.InstrumentFeed)
    ))
  ,
  DESCRIPTOR = _EXCHANGEFEED,
  __module__ = 'libs.protocol.exchange_pb2'
  # @@protoc_insertion_point(class_scope:Sim.Protocol.ExchangeFeed)
  ))
_sym_db.RegisterMessage(ExchangeFeed)
_sym_db.RegisterMessage(ExchangeFeed.InstrumentFeed)
_sym_db.RegisterMessage(ExchangeFeed.InstrumentFeed.bookEntry)


# @@protoc_insertion_point(module_scope)