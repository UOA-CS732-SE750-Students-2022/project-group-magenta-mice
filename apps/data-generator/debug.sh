protoc --python_out=. ./src/protocol/exchange.proto
python3 -m pytest tests
