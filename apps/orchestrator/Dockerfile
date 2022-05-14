FROM golang:1.18
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o /orchestrator cmd/orchestrator/main.go

EXPOSE 8008

CMD [ "/orchestrator" ]
