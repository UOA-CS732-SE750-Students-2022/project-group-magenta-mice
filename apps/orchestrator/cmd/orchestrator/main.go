package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"simulate.exchange-orchestrator/api"
)

func main() {
	godotenv.Load(".env.local")
	serverUri := os.Getenv("SERVER_URI")
	log.Println("Server listening at " + serverUri)
	log.Fatal(http.ListenAndServe(serverUri, api.Router))
}
