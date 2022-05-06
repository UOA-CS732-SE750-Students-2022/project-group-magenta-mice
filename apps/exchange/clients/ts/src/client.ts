import { EventEmitter } from "events";
import { Socket } from "net";
import { pack } from "python-struct";
import { EventMap, MessageTypes, Order, ProtocolType } from "./types";

const messages: Messages = require("./exchange_pb");

export type MessageNames =
  | "LoginRequest"
  | "LoginResponse"
  | "LogoutRequest"
  | "LogoutResponse"
  | "InsertOrderRequest"
  | "CancelOrderRequest"
  | "AmendOrderRequest"
  | "OrderUpdateMessage"
  | "OrderFillMessage"
  | "ExchangeFeed";

export type Messages = { [key in MessageNames]: ProtocolType } & {
  MessageType: MessageTypes;
};

export interface ClientOptions {
  host: string;
  port: number;
  verbose?: boolean;
}

export declare interface Client {
  on<T extends keyof EventMap>(event: T, listener: EventMap[T]): this;
  emit<T extends keyof EventMap>(
    event: T,
    ...args: Parameters<EventMap[T]>
  ): boolean;
}

export class Client extends EventEmitter {
  private readonly socket: Socket;
  private readonly verbose: boolean;

  private orderIdIncrement: number = 0;

  constructor(options: ClientOptions) {
    super();

    this.socket = new Socket().connect(options.port, options.host);
    this.verbose = options.verbose ?? false;

    this.prepareHandlers();
  }

  public login({ key }: { key: string }) {
    const loginRequest = new messages.LoginRequest();
    loginRequest.setKey(key);
    const bytes = loginRequest.serializeBinary();

    const buffer = this.prepareMessage(messages.MessageType.LOGIN, bytes);
    this.socket.write(buffer);
  }

  public insertOrder(order: Order) {
    order.clientId ??= this.orderIdIncrement++;

    const insertOrder = new messages.InsertOrderRequest();
    insertOrder.setClientid(order.clientId);
    insertOrder.setInstrumentid(order.instrumentId);
    insertOrder.setSide(order.side);
    insertOrder.setLifespan(order.lifespan);
    insertOrder.setPrice(order.price);
    insertOrder.setVolume(order.volume);

    this.log("Preparing to insert order", order);

    const buffer = this.prepareMessage(
      messages.MessageType.INSERT_ORDER,
      insertOrder.serializeBinary()
    );
    this.socket.write(buffer);
  }

  public cancelOrder(clientId: number) {
    const cancelOrder = new messages.CancelOrderRequest();
    cancelOrder.setClientid(clientId);
    const buffer = this.prepareMessage(
      messages.MessageType.CANCEL_ORDER,
      cancelOrder.serializeBinary()
    );
    this.socket.write(buffer);
  }

  private prepareMessage(messageType: number, bytes: Uint8Array) {
    const size = bytes.byteLength;
    return Buffer.concat([pack("<i", messageType), pack("<i", size), bytes]);
  }

  private prepareHandlers() {
    let type = 0;
    let size = 0;
    let expectHeader = true;

    this.socket.on("error", (err) => {
      console.error(err);
    });

    this.socket.on("data", (buffer) => {
      if (expectHeader) {
        type = buffer.readInt32LE(0);
        size = buffer.readInt32LE(4);
        expectHeader = false;
      } else {
        expectHeader = true;
        this.log("Message received:", { type, size });
        switch (type) {
          case messages.MessageType.LOGIN_RESPONSE:
            const loginResponse =
              messages.LoginResponse.deserializeBinary(buffer);
            this.emit("login", loginResponse.toObject());
            break;
          case messages.MessageType.EXCHANGE_FEED:
            const exchangeFeed =
              messages.ExchangeFeed.deserializeBinary(buffer);
            this.emit("feed", exchangeFeed.toObject().instrumentfeedsList);
            break;
          case messages.MessageType.ORDER_UPDATE:
            const orderUpdate =
              messages.OrderUpdateMessage.deserializeBinary(buffer);
            this.emit("update", orderUpdate.toObject());
            break;
          case messages.MessageType.ORDER_FILL:
            const orderFill =
              messages.OrderFillMessage.deserializeBinary(buffer);
            this.emit("fill", orderFill.toObject());
            break;
        }
      }
    });
  }

  private log(...args: any[]) {
    if (this.verbose) {
      console.log(...args);
    }
  }
}
