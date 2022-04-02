protoc -I=. --python_out=./src/protocol ./src/protocol/exchange.proto
python -m pytest tests