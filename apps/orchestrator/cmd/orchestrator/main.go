package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"simulate.exchange-orchestrator/api"
)

var serverUri = ":7474"

func main() {
	godotenv.Load()
	log.Println("Server listening at " + serverUri)
	log.Fatal(http.ListenAndServe(serverUri, api.Router))
}
