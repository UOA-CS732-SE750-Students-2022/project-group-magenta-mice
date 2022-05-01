# Data Generator
Tested with python version 3.7 or above.

## Installation

```bash
cd apps/data-generator 
python -m pip install -r requirements.txt
python -m pip install -e libs/
```

## Running
```bash
python run_data_gen.py -log
```
This will run the data generator. `-log` will print the insert order objects. Note that the `ExchangeClient` instance will need the socket server to be running.