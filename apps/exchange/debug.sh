protoc -I=. --cpp_out=. --python_out=./messaging/python --js_out=import_style=commonjs,binary:./messaging/js ./libs/protocol/exchange.proto

mv ./messaging/python/libs/protocol/* ./messaging/python
mv ./messaging/js/libs/protocol/* ./messaging/js

rm -rf ./messaging/python/libs
rm -rf ./messaging/js/libs

cmake -DCMAKE_BUILD_TYPE=Debug -B build -G 'Ninja'
cmake --build build --config Debug && ./build/unit_test
