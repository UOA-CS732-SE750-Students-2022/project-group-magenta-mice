export interface MessageIds {
  LOGIN: 0;
  LOGOUT: 1;
  LOGIN_RESPONSE: 2;
  LOGOUT_RESPONSE: 3;
  INSERT_ORDER: 11;
  CANCEL_ORDER: 12;
  AMEND_ORDER: 13;
  ORDER_UPDATE: 21;
  ORDER_FILL: 22;
  EXCHANGE_FEED: 31;
}

export enum Side {
  BUY = 0,
  BID = 0,
  SELL = 1,
  ASK = 1,
}

export enum Lifespan {
  GFD = 0,
  FAK = 1,
}

export interface Order {
  clientId?: number;
  instrumentId: number;
  side: Side;
  lifespan: Lifespan;
  price: number;
  volume: number;
}

export interface ProtocolType {
  new (): ProtocolType;
  toObject(): any;
  deserializeBinary(buffer: Buffer): ProtocolType;
  serializeBinary(): any;

  [key: `set${string}`]: any;
}

export interface EventMap {
  feed: (feed: ExchangeFeed) => void;
  update: (update: OrderUpdate) => void;
  fill: (fill: OrderFill) => void;
  login: (login: LoginResponse) => void;
}

type OrderParams = { price: number; volume: number };

export type ExchangeFeed = {
  instrumentid: number;
  bidsList: OrderParams[];
  asksList: OrderParams[];
}[];

export interface OrderUpdate {
  clientid: number;
  instrumentid: number;
  volumeremaining: number;
}

export interface OrderFill {}

export type LoginResponse = {
  id: number;
  ticker: string;
  positionLimit: number;
  ticksizeincents: number;
}[];
