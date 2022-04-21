set(sources
  exchange.cc
  orderbook.cc
  participant.cc
  participant_manager.cc
  conversions.cc
  order_factory.cc
  orderbook_manager.cc
)

include_directories(${PROJECT_SOURCE_DIR}/libs)

add_library(exchange_lib ${sources})
