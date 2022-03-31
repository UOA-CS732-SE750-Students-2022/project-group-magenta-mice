protoc -I=. --cpp_out=. ./libs/protocol/exchange.proto
cmake -DCMAKE_BUILD_TYPE=Release -B build -G 'Ninja'
cmake --build build --config Release && spm run test
