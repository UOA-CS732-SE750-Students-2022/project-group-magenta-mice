/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Permission {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CreateUserInput {
  id: string;
  name: string;
  email: string;
  profilePicUrl?: Nullable<string>;
}

export interface CreateInviteInput {
  exchangeId: string;
  userId?: Nullable<string>;
}

export interface CreateExchangeInput {
  exchangeName: string;
  exchangeColor: number;
}

export interface AddInstrumentDto {
  instrumentType: string;
  name: string;
  positionLimit: number;
  tickSizeMin: number;
}

export interface Instrument {
  id: string;
  name: string;
  tickSizeMin: number;
  positionLimit: number;
}

export interface Exchange {
  id: string;
  name: string;
  colour: number;
  public: boolean;
  userPermissions: UserPermission[];
  instruments: Instrument[];
}

export interface UserPermission {
  id: string;
  exchange: Exchange;
  user: User;
  permission: Permission;
}

export interface User {
  name: string;
  email: string;
  profilePicUrl?: Nullable<string>;
  id: string;
  userPermissions?: Nullable<UserPermission[]>;
}

export interface Invite {
  id: string;
  exchangeId: string;
  userId?: Nullable<string>;
}

export interface IQuery {
  currentUser(): User | Promise<User>;
  exchange(id: string): Exchange | Promise<Exchange>;
  checkInvite(id: string): boolean | Promise<boolean>;
}

export interface IMutation {
  createUser(createUserInput: CreateUserInput): User | Promise<User>;
  createInvite(createInviteInput: CreateInviteInput): Invite | Promise<Invite>;
  joinExchange(id: string): UserPermission | Promise<UserPermission>;
  createTestExchange(): Exchange | Promise<Exchange>;
  createExchange(
    exchangeData: CreateExchangeInput,
  ): Exchange | Promise<Exchange>;
  addInstrument(
    exchangeId: string,
    instrument: AddInstrumentDto,
  ): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
