package exchange

type Instrument struct {
	Name          string `json:"name"`
	Type          string `json:"type"`
	Ordinal       int    `json:"ordinal"`
	PositionLimit int    `json:"positionLimit"`
	TickSize      int    `json:"tickSize"`
	Volatility    int    `json:"volatility"`
	BasePrice     int    `json:"basePrice"`
	Id            string `json:"id"`
}
type ExchangeSettingsRequest struct {
	ExchangeId     string       `json:"exchangeId"`
	Instruments    []Instrument `json:"instruments"`
	MarketMakerKey string       `json:"marketMakerKey"`
}

type ExchangeSettingsResponse struct {
	Port        int          `json:"port"`
	Host        string       `json:"host"`
	Instruments []Instrument `json:"instruments"`
	ExchangeId  string       `json:"exchangeId"`
	Database    string       `json:"database"`
}
