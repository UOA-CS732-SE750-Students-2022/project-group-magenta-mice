
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

export interface UserPermission {
    exchangeId: string;
}

export interface User {
    name: string;
    profilePicUrl?: Nullable<string>;
    id: string;
    userPermissions: UserPermission[];
}

export interface IQuery {
    currentUser(): User | Promise<User>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
