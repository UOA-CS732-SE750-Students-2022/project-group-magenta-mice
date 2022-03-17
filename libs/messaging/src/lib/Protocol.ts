export enum Protocol {
  LOGIN_REQUEST = 1,
  LOGIN_RESPONSE = 2,

  INSERT_REQUEST = 11,
  CANCEL_REQUEST = 12,
  AMEND_REQUEST = 13,

  ORDER_UPDATE_RESPONSE = 21,
  ORDER_FILLED_RESPONSE = 22,
  ORDER_ERROR_RESPONSE = 23,

  ORDER_BOOK_TICK = 31,

  LOGOUT_REQUEST = 41,
  LOGOUT_RESPONSE = 42,
  BREACHED = 43,

  ERROR = 51,
}

export interface MessageData<T extends keyof TypeMap> {
  event?: T;
  data: TypeMap[T];
}

export interface TypeMap {
  [Protocol.LOGIN_REQUEST]: LoginRequest;
  [Protocol.LOGIN_RESPONSE]: LoginResponse;
}

interface LoginRequest {
  key?: string;
}

interface LoginResponse {
  success?: boolean;
}
