set(sources
  participant_socket.cc
  message_parsing.cc
  exchange_server.cc
)

include_directories(${PROJECT_SOURCE_DIR}/libs)

add_library(net_lib ${sources})
