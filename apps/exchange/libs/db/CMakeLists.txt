set(sources
  connection.cc
)

include_directories(${PROJECT_SOURCE_DIR}/libs)

add_library(db_lib ${sources})
