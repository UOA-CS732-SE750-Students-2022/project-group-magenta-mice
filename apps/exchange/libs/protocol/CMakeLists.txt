include(FindProtobuf)
find_package(Protobuf REQUIRED)
include_directories(${PROTOBUF_INCLUDE_DIR})
PROTOBUF_GENERATE_CPP(PROTO_SRC PROTO_HEADER exchange.proto)

add_library(protocol_lib ${PROTO_HEADER} ${PROTO_SRC})
