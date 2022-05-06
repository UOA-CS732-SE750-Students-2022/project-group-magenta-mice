import { Client, ClientOptions, MessageNames, Messages } from "./client";
import {
  Lifespan,
  Side,
  EventMap,
  ExchangeFeed,
  LoginResponse,
  MessageTypes,
  Order,
  OrderFill,
  OrderUpdate,
  ProtocolType,
} from "./types";
import { deepLog } from "./util";

export {
  Client,
  ClientOptions,
  MessageNames,
  Messages,
  Lifespan,
  Side,
  EventMap,
  ExchangeFeed,
  LoginResponse,
  MessageTypes,
  Order,
  OrderFill,
  OrderUpdate,
  ProtocolType,
  deepLog,
};

// const client = new Client({ host: 'localhost', port: 15001, verbose: true })
// client.login({ key: '6f0cb665-c2ea-4460-8442-ebfbe01fbedf' })

// client.on('feed', (feed) => {
//     deepLog(feed)
// })

// client.on('login', (login) => {
//     console.log(login)
//     client.insertOrder({
//         lifespan: Lifespan.GFD,
//         instrumentId: 0,
//         price: 140,
//         volume: 100,
//         side: Side.BUY,
//     })
// })

// client.on('update', (update) => {
//     console.log(update)
// })
