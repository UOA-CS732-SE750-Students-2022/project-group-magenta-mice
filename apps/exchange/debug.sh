protoc -I=. --cpp_out=. --python_out=./messaging/python ./libs/protocol/exchange.proto
mv ./messaging/python/libs/protocol/* ./messaging/python
rm -rf ./messaging/python/libs
cmake -DCMAKE_BUILD_TYPE=Debug -B build -G 'Ninja'
cmake --build build --config Debug && ./build/unit_test
