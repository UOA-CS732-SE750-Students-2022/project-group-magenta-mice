export interface ExchangeRequest {
    exchangeId: string;
    instruments: Instrument[];
    marketMakerKey: string;
}
  
export interface Instrument {
    name: string;
    type: string;
    ordinal: number;
    positionLimit: number;
    tickSize: number;
    volatility: number;
    basePrice: number;
    id: string;
}