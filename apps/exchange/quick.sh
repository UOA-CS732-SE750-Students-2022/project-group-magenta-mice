cmake -DCMAKE_BUILD_TYPE=Debug -B build -G 'Ninja'
cmake --build build --config Debug && ./build/unit_test
