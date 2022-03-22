package main

import (
	"log"
	"net/http"

	"simulate.exchange-orchestrator/api"
)

var serverUri = ":7474"

func main() {
	log.Println("Server listening at " + serverUri)
	log.Fatal(http.ListenAndServe(serverUri, api.Router))
}
