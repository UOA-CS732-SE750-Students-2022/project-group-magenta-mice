# Simulate.Exchange - JS Client

<p align="center">
  <img src="https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2022/simulate.exchange/main/media/logo/logo.svg" width="350" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@simulate-exchange/core">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@simulate-exchange/core">
  </a>
</p>

## Introduction

This library is used to wrap the API of the Simulate.Exchange stock exchange.
Using it, it is easy to create a trading bot in Node.JS.

## Getting Started

### Prerequisites

- [Node.JS](https://nodejs.org/en/)
- A Simulate.Exchange API Key
- A port and hostname of a Simulate.Exchange server

### Setup

```ts
import { Client } from "@simulate-exchange/core";

const HOST = "EXCHANGE_HOSTNAME"; // INSERT EXCHANGE HOSTNAME HERE
const PORT = 15001; // INSERT EXCHANGE PORT HERE

const ws = new Client(HOST, PORT);

ws.on("feed", (f) => {
  console.log(f);
});

ws.on("fill", (order) => {
  console.log(order);
});

ws.on("update", (order) => {
  console.log(order);
});

// Login to the exchange with your API key.
ws.login("YOUR_API_KEY_HERE");
```

### Sending Requests

```ts
// Sending an insert order
const orderId = ws.insertOrder({
  instrumentId: 0,
  lifespan: Lifespan.GFD, // or Lifespan.FAK
  price: 140,
  volume: 100,
  side: Side.BUY, // or Side.SELL
});

// Cancelling the order with ID = 4
ws.cancelOrder(4);
```
