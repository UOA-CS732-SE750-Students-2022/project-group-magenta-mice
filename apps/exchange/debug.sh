protoc -I=. --cpp_out=. ./libs/protocol/exchange.proto
cmake -DCMAKE_BUILD_TYPE=Debug -B build -G 'Ninja'
cmake --build build --config Debug
