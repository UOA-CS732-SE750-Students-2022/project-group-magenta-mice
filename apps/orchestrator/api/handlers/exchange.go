package handlers

import (
	"net/http"

	"simulate.exchange-orchestrator/docker"
	"simulate.exchange-orchestrator/exchange"
)

func CreateExchangeHandler(w http.ResponseWriter, r *http.Request) {
	var settings exchange.ExchangeSettingsRequest
	settings, _ = genericJSONDecode(settings, r.Body)

	port, err := docker.CreateExchangeBundle(settings)
	if err != nil {
		textErrorResponse(w, err.Error())
		return
	}

	genericJSONSend(w, port)
}
