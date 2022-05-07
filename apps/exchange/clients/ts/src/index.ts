import {
  Client,
  ClientOptions,
  MessageNames,
  Messages,
  messages,
} from "./client";
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
  MessageIds,
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

import WebSocket from "ws";
import { pack } from "python-struct";

var ws = new WebSocket("ws://localhost:15001");

let a = 0;

ws.on("error", (err) => {
  console.error(err.message);
  console.error(err.name);
});

ws.on("message", (stream: Buffer) => {
  const event = stream.readInt32LE();
  console.log(event);

  const payload = stream.slice(4);

  if (event === messages.MessageType.LOGIN_RESPONSE) {
    const login = messages.LoginResponse.deserializeBinary(payload);
    console.log(login.toObject());
  } else if (event === messages.MessageType.EXCHANGE_FEED) {
    const feed = messages.ExchangeFeed.deserializeBinary(payload);
    console.log(feed.toObject());
    a++;
    if (a == 2) {
      const insertRequest = new messages.InsertOrderRequest();
      insertRequest.setClientid(0);
      insertRequest.setInstrumentid(0);
      insertRequest.setSide(Side.BUY);
      insertRequest.setLifespan(Lifespan.GFD);
      insertRequest.setPrice(140);
      insertRequest.setVolume(100);
      const bytes2 = insertRequest.serializeBinary();
      const data2 = Buffer.concat([pack("<i", 11), bytes2]);
      ws.send(data2, { binary: true });
    }
  } else if (event === messages.MessageType.ORDER_UPDATE) {
    const update = messages.OrderUpdateMessage.deserializeBinary(payload);
    console.log(update.toObject());
  } else if (event === messages.MessageType.ORDER_FILL) {
    const fill = messages.OrderFillMessage.deserializeBinary(payload);
    console.log(fill.toObject());
  }
});

ws.on("close", (err, reason) => {
  console.error(err);
  console.error(reason.toString());
});

ws.once("open", () => {
  // ws.send("Hello");
  const loginRequest = new messages.LoginRequest();
  loginRequest.setKey("6f0cb665-c2ea-4460-8442-ebfbe01fbedf");
  const bytes = loginRequest.serializeBinary();

  const data = Buffer.concat([pack("<i", 0), bytes]);

  ws.send(data, { binary: true });

  // const insertRequest = new messages.InsertOrderRequest();
  // insertRequest.setClientid(0);
  // insertRequest.setInstrumentid(0);
  // insertRequest.setSide(Side.BUY);
  // insertRequest.setLifespan(Lifespan.GFD);
  // insertRequest.setPrice(140);
  // insertRequest.setVolume(100);
  // const bytes2 = insertRequest.serializeBinary();
  // const data2 = Buffer.concat([pack("<i", 11), bytes2]);
  // ws.send(data2, { binary: true });
});
// ws.send("4");
