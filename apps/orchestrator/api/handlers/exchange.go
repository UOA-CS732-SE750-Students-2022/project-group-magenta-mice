package handlers

import (
	"net/http"

	"simulate.exchange-orchestrator/docker"
	"simulate.exchange-orchestrator/exchange"
)

func CreateExchangeHandler(w http.ResponseWriter, r *http.Request) {
	var settings exchange.ExchangeSettings
	settings, _ = genericJSONDecode(settings, r.Body)

	docker.CreateExchange()

	genericJSONSend(w, true)
}
