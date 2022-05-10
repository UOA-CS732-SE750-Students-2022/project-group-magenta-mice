import {
  Lifespan,
  Side,
  EventMap,
  ExchangeFeed,
  LoginResponse,
  MessageIds,
  Order,
  OrderFill,
  OrderUpdate,
  ProtocolType,
} from "./types";
import { deepLog } from "./util";

import {
  Client,
  ClientOptions,
  MessageNames,
  Messages,
  messages,
} from "./ws-client";

export {
  Client,
  Lifespan,
  Side,
  EventMap,
  ExchangeFeed,
  LoginResponse,
  MessageIds,
  Order,
  OrderFill,
  OrderUpdate,
  ProtocolType,
  deepLog,
  ClientOptions,
  MessageNames,
  Messages,
  messages,
};

const ws = new Client("ws://192.168.1.120:10000");

ws.on("feed", (f) => {
  console.log(f);

  const side = Math.random() > 0.5 ? Side.BUY : Side.SELL;

  ws.insertOrder({
    instrumentId: 0,
    lifespan: Lifespan.GFD,
    price: 140,
    volume: 100,
    side,
  });
});

ws.on("fill", (order) => {
  console.log(order);
});

ws.on("update", (order) => {
  console.log(order);
});

ws.login("0be07153-f4e8-474e-aecb-cb84f40a0c37");
