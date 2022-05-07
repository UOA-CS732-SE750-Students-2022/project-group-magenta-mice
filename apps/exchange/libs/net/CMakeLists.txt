set(sources
  participant_socket.cc
  message_parsing.cc
  exchange_server.cc
  exchange_runtime.cc
)
include_directories(net_lib PUBLIC ${PROJECT_SOURCE_DIR}/include ${PROJECT_SOURCE_DIR}/libs)

add_library(net_lib ${sources})

