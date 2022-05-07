set(sources
  exchange_runtime.cc
)
include_directories(net_lib PUBLIC ${PROJECT_SOURCE_DIR}/include ${PROJECT_SOURCE_DIR}/libs)

add_library(net_lib ${sources})

