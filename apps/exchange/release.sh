protoc -I=. --cpp_out=. --python_out=./messaging/python --js_out=import_style=commonjs ./libs/protocol/exchange.proto
mv ./messaging/python/libs/protocol/* ./messaging/python
rm -rf ./messaging/python/libs
cmake -DCMAKE_BUILD_TYPE=Release -B build -G 'Ninja'
cmake --build build --config Release
