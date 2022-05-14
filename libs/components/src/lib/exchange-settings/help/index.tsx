import React from "react";

export const HelpPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-x-4 text-4xl font-bold leading-10 dark:text-gray-50">
        Guide
      </p>
      <p className="text-gray-500">
        This is a guide to get started trading on the exchange.
      </p>
      <h2 className="mt-8 mb-2 text-2xl font-bold">TypeScript Client</h2>
      <div className="flex flex-col gap-y-2">
        <p className="text-gray-300">
          The TypeScript client is a module available on NPM that allows you to
          trade on the exchange.
        </p>
        <p>
          To get started, create a new npm project with <code>npm init</code>.
        </p>
        <p>
          Run <code>npm i @simulate-exchange/core</code> to install the core
          TypeScript library.
        </p>
        <p>
          The code below shows the basic setup of a client. To get your API key,
          visit the API page on the sidebar. Update the port and hostname to the
          information also on that page.
        </p>
        <code className="w-fit whitespace-pre-line bg-neutral-800 py-2 px-4">
          {codeExample}
        </code>
        <p>
          Run the client and watch how it logs the data. You can use this
          information to inform your trades. Once you are ready, see the
          following code to see how to insert and cancel orders:
        </p>
        <code className="mb-6 w-fit whitespace-pre-line bg-neutral-800 py-2 px-4">
          {insertExample}
        </code>
      </div>
    </div>
  );
};

const codeExample = `import { Client } from "@simulate-exchange/core";

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
`;

const insertExample = `// Sending an insert order
const orderId = ws.insertOrder({
  instrumentId: 0,
  lifespan: Lifespan.GFD, // or Lifespan.FAK
  price: 140,
  volume: 100,
  side: Side.BUY, // or Side.SELL
});

// Cancelling the order with ID = 4
ws.cancelOrder(4);
`;
