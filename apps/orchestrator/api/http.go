package api

import (
	"github.com/gorilla/mux"
	"simulate.exchange-orchestrator/api/handlers"
)

var Router *mux.Router

func init() {
	Router = mux.NewRouter()
	Router.HandleFunc("/exchange", handlers.CreateExchangeHandler)
}
