set(test_name unit_test)

set(test_sources 
  common_test.cc 
  conversions_test.cc 
  order_factory_test.cc 
  exchange_test.cc 
  orderbook_test.cc
  participant_test.cc
)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/609281088cfefc76f9d0ce82e1ff6c30cc3591e5.zip
)
FetchContent_MakeAvailable(googletest)

enable_testing()

add_executable(
  ${test_name}
  ${test_sources}
)

target_link_libraries(
  ${test_name}
  gtest_main
  gmock_main
  common_lib
  exchange_lib
  protocol_lib
  ${Boost_LIBRARIES}
  ${CMAKE_THREAD_LIBS_INIT}
  ${Protobuf_LIBRARIES}
)

set_target_properties(${test_name}
  PROPERTIES
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
  LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
  RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
)

include(GoogleTest)
gtest_discover_tests(${test_name})
