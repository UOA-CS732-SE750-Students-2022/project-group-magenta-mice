FROM ubuntu:20.04
COPY ./build/exchange /app/exchange

RUN apt-get update && apt-get -y install libpqxx-6.4 libprotobuf17

ENTRYPOINT ["/app/exchange"]