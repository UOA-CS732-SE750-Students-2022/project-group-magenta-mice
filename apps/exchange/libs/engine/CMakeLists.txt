set(sources
  exchange.cc
  exchange.h
  orderbook.cc
  orderbook.h
  participant.cc
  participant.h
  participant_manager.cc
  participant_manager.h
  conversions.cc
  conversions.h
)

include_directories(${PROJECT_SOURCE_DIR}/libs)

add_library(exchange_lib ${sources})
target_include_directories(exchange_lib INTERFACE common_lib)
