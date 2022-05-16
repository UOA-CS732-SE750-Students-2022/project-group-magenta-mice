cmake_minimum_required(VERSION 3.1)
project(simulate_exchange)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_GENERATOR "Ninja")

set(OPENSSL_USE_STATIC_LIBS TRUE)

add_compile_options(-Wall)

find_package(Boost 1.71 COMPONENTS)
if(NOT ${Boost_FOUND})
    message(FATAL_ERROR
            "Boost is required to run this application.")
endif()

include_directories(${Boost_INCLUDE_DIRS})
link_directories(${Boost_LIBRARY_DIRS})

find_package(Protobuf REQUIRED)
include_directories(${Protobuf_INCLUDE_DIRS})

find_package(OpenSSL REQUIRED)
include_directories(${OPENSSL_INCLUDE_DIRS})

find_library(PQXX_LIB pqxx REQUIRED)
find_library(PQ_LIB pq REQUIRED)
include_directories(${PQXX_INCLUDE_DIRS})

add_subdirectory(libs)
include_directories(${PROJECT_SOURCE_DIR}/libs)

include_directories(SYSTEM PUBLIC ${PROJECT_SOURCE_DIR}/include)

#################
# EXCHANGE
#################

add_executable(exchange main.cc)
target_link_libraries(exchange
  PRIVATE
  net_lib
  db_lib
  exchange_lib
  protocol_lib
  config_lib
  common_lib
  ${Boost_LIBRARIES}
  ${CMAKE_THREAD_LIBS_INIT}
  ${Protobuf_LIBRARIES}
  ${PQXX_LIB}
  ${PQ_LIB}
  ${OPENSSL_LIBRARIES}
)

add_subdirectory(tests)
