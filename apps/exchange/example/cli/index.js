const { Client, Side, Lifespan } = require("@simulate-exchange/core");
const readline = require("readline");

const ws = new Client("localhost", 15001);

const KEY = "asdjklfiasdklfijklds";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:
    "{Lifespan}-{Side}-{Instrument}-{Volume}@{Price} eg: F-B-0-100@300 or G-S-1-100@300 (q to quit): ",
});

ws.on("update", (order) => {
  console.log(order);
});

ws.on("login", (info) => {
  console.log(info);
  rl.prompt();
});

ws.login(KEY);

rl.on("line", (line) => {
  if (line.toLowerCase() === "q") {
    console.log("Goodbye!\n");
    process.exit(0);
  }

  const [lifespanChar, sideChar, instrument, details] = line.split("-");

  if (lifespanChar.toUpperCase() === "C") {
    ws.cancelOrder(+sideChar);
  } else {
    const lifespan =
      lifespanChar.toUpperCase() === "F" ? Lifespan.FAK : Lifespan.GFD;
    const side = sideChar.toUpperCase() === "B" ? Side.BID : Side.ASK;
    const instrumentId = +instrument;
    const [volume, price] = details.split("@").map((x) => +x);

    console.log("Sending: ", { lifespan, side, instrumentId, volume, price });

    ws.insertOrder({ instrumentId, side, volume, price, lifespan });
  }

  setTimeout(() => {
    rl.prompt();
  }, 100);
}).on("close", () => {
  console.log("\nGoodbye!\n");
  process.exit(0);
});
