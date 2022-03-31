set(sources
  participant_socket.cc
  participant_socket.h
  message_parsing.cc
  message_parsing.h
)

include_directories(${PROJECT_SOURCE_DIR}/libs)

add_library(net_lib ${sources})
