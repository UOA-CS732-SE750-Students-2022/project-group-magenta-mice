import { EventEmitter } from "events";
import {
  EventMap,
  LoginResponse,
  MessageIds,
  Order,
  ProtocolType,
} from "./types";
import WebSocket from "ws";
import { pack } from "python-struct";

export declare interface Client {
  on<T extends keyof EventMap>(event: T, listener: EventMap[T]): this;
  emit<T extends keyof EventMap>(
    event: T,
    ...args: Parameters<EventMap[T]>
  ): boolean;
}

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
  MessageType: MessageIds;
};

export const messages: Messages = require("./exchange_pb");

export interface ClientOptions {
  verbose?: boolean;
}

export class Client extends EventEmitter {
  private readonly socket: WebSocket;

  private readonly verbose: boolean;
  private orderIdIncrement: number = 0;

  constructor(host: string, port: number, options: ClientOptions = {}) {
    super();

    this.socket = new WebSocket("ws://localhost:15001");
    this.verbose = options.verbose ?? false;
  }

  login(key: string) {
    this.socket.once("open", () => {
      this.listen();

      const loginRequest = new messages.LoginRequest();
      loginRequest.setKey(key);

      const bytes = this.prepare(messages.MessageType.LOGIN, loginRequest);
      this.send(bytes);
    });
  }

  insertOrder(order: Order) {
    const insertOrderRequest = new messages.InsertOrderRequest();
    const orderId = this.orderIdIncrement++;

    insertOrderRequest.setClientid(orderId);
    insertOrderRequest.setInstrumentid(order.instrumentId);
    insertOrderRequest.setLifespan(order.lifespan);
    insertOrderRequest.setSide(order.side);
    insertOrderRequest.setPrice(order.price);
    insertOrderRequest.setVolume(order.volume);

    const bytes = this.prepare(
      messages.MessageType.INSERT_ORDER,
      insertOrderRequest
    );
    this.send(bytes);

    return orderId;
  }

  cancelOrder(orderId: number) {
    const cancelOrderRequest = new messages.CancelOrderRequest();
    cancelOrderRequest.setClientid(orderId);

    const bytes = this.prepare(
      messages.MessageType.CANCEL_ORDER,
      cancelOrderRequest
    );
    this.send(bytes);
  }

  private send(buffer: Buffer) {
    this.socket.send(buffer);
  }

  private prepare(type: number, proto: ProtocolType) {
    return Buffer.concat([pack("<i", type), proto.serializeBinary()]);
  }

  private listen() {
    this.socket.on("message", (buf: Buffer) => {
      const event = buf.readInt32LE();
      const payload = buf.slice(4);

      this.vLog(event);

      switch (event) {
        case messages.MessageType.LOGIN_RESPONSE:
          this.handleLoginResponse(payload);
          return;
        case messages.MessageType.EXCHANGE_FEED:
          this.handleFeed(payload);
          return;
        case messages.MessageType.ORDER_UPDATE:
          this.handleUpdate(payload);
          return;
        case messages.MessageType.ORDER_FILL:
          this.handleFill(payload);
          return;
      }
    });

    this.socket.on("error", (err) => {
      console.error(err.message);
      console.error(err.name);
      this.socket.close();
    });

    this.socket.on("close", (code, reason) => {
      console.error(code);
      console.error(reason.toString());
    });
  }

  private handleLoginResponse(response: Buffer) {
    const loginResponse =
      messages.LoginResponse.deserializeBinary(response).toObject();

    const transform: LoginResponse = loginResponse.instrumentsList;

    this.emit("login", transform);
  }

  private handleFeed(response: Buffer) {
    const exchangeFeed: any = messages.ExchangeFeed.deserializeBinary(response);

    this.emit("feed", exchangeFeed.toObject().instrumentfeedsList);
  }

  private handleUpdate(response: Buffer) {
    const orderUpdate =
      messages.OrderUpdateMessage.deserializeBinary(response).toObject();

    this.emit("update", orderUpdate);
  }

  private handleFill(response: Buffer) {
    const orderFill =
      messages.OrderFillMessage.deserializeBinary(response).toObject();

    this.emit("fill", orderFill);
  }

  private vLog(...args: any[]) {
    if (this.verbose) {
      console.log(...args);
    }
  }
}
