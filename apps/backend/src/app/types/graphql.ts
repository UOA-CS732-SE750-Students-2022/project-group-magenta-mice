
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    id: string;
    name: string;
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

export interface Exchange {
    id: string;
    public: boolean;
    userPermissions: UserPermission[];
}

export interface UserPermission {
    exchange: Exchange;
    user: User;
    permission: string;
}

export interface User {
    name: string;
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
    createExchange(exchangeData: CreateExchangeInput): Exchange | Promise<Exchange>;
}

type Nullable<T> = T | null;
