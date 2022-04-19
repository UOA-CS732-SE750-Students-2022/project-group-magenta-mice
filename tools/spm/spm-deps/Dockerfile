# our local base image
FROM ubuntu

LABEL description="Container for building Simulate.Exchange C++"

ENV TZ=Pacific/Auckland
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ >/etc/timezone

# install build dependencies
RUN apt-get update && apt-get install -y g++ rsync zip openssh-server make cmake autoconf automake libtool curl unzip protobuf-compiler libprotobuf-dev libprotoc-dev libboost-all-dev ninja-build libpq-dev postgresql-server-dev-all libpqxx-dev

WORKDIR /spm-build
CMD ./debug.sh
