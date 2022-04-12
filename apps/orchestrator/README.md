# simulate.exchange Custom Docker Orchestrator

This application manages the exchange and data generation server architecture. Whenever a user creates an exchange, new data generation containers and exchange matching engine containers need to be created and linked to a public TCP socket on the server.

To run it, you first need to setup your .env.local file. Make sure to set your HOST_ADDRESS to the IP address of your server/computer e.g. 192.168.1.236

Then you can either:

1. Run locally via golang
   1. Have golang 1.18 installed and on your path
   2. Run `go run cmd/orchestrator/main.go`
   3. The server will be running on 8008 by default
2. Run locally via docker
   1. Have docker installed
   2. Run `docker build -t [tag] .` inside this path
   3. Run `docker run -dp 1000:8008 --env-file=.env.local -v /var/run/docker.sock:/var/run/docker.sock [tag]`
   4. The server will be running on 1000
