cmake_minimum_required(VERSION 3.1)
project(simulate_exchange)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_GENERATOR "Ninja")

add_compile_options(-Wall)


find_package(Boost 1.71 COMPONENTS date_time log system thread
        OPTIONAL_COMPONENTS container graph math_c99 math_c99f math_tr1
        math_tr1f random regex timer)
if(NOT ${Boost_FOUND})
    message(FATAL_ERROR
            "Boost is required to run this application.")
endif()

add_compile_definitions(BOOST_LOG_DYN_LINK=1)

include_directories(${Boost_INCLUDE_DIRS})
link_directories(${Boost_LIBRARY_DIRS})

find_package(Protobuf REQUIRED)
include_directories(${Protobuf_INCLUDE_DIRS})

add_subdirectory(libs)

include_directories(${PROJECT_SOURCE_DIR}/libs)

#################
# EXCHANGE
#################

add_executable(exchange main.cc)
target_link_libraries(exchange
  PRIVATE
  common_lib
  exchange_lib
  protocol_lib
  ${Boost_LIBRARIES}
  ${CMAKE_THREAD_LIBS_INIT}
  ${Protobuf_LIBRARIES}
)

add_subdirectory(tests)
