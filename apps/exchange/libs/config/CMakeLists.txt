set(
  sources
  config_reader.cc
  config.cc
)

include_directories(${PROJECT_SOURCE_DIR}/libs)
include_directories(SYSTEM ${PROJECT_SOURCE_DIR}/include/rapidjson/include)

add_library(config_lib ${sources})
