import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddInstrumentDto = {
  bondFixedPrice: Scalars['Int'];
  bondVolatility: Scalars['Int'];
  instrumentType: Scalars['String'];
  name: Scalars['String'];
  positionLimit: Scalars['Int'];
  tickSizeMin: Scalars['Int'];
};

export type CreateExchangeInput = {
  exchangeColor: Scalars['Int'];
  exchangeName: Scalars['String'];
};

export type CreateInviteInput = {
  exchangeId: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  /** Google Id */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Google ProfilePic of user */
  profilePicUrl?: InputMaybe<Scalars['String']>;
};

export type Exchange = {
  __typename?: 'Exchange';
  colour: Scalars['Int'];
  id: Scalars['String'];
  instruments: Array<Instrument>;
  name: Scalars['String'];
  port?: Maybe<Scalars['String']>;
  profitLoss: Array<ProfitLoss>;
  public: Scalars['Boolean'];
  userPermissions: Array<UserPermission>;
};

export type Instrument = {
  __typename?: 'Instrument';
  bondFixedPrice: Scalars['Int'];
  bondVolatility: Scalars['Int'];
  id: Scalars['ID'];
  instrumentType: InstrumentType;
  name: Scalars['String'];
  positionLimit: Scalars['Int'];
  recentTrades: Array<RecentTrade>;
  tickSizeMin: Scalars['Int'];
};


export type InstrumentRecentTradesArgs = {
  limit: Scalars['Float'];
};

export enum InstrumentType {
  Bond = 'BOND',
  Stock = 'STOCK'
}

export type Invite = {
  __typename?: 'Invite';
  exchangeId: Scalars['String'];
  id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addInstrument: Instrument;
  createExchange: Exchange;
  createInvite: Invite;
  createTestExchange: Exchange;
  createUser: User;
  deleteExchange: Exchange;
  deleteInstrument: Instrument;
  editExchange: Exchange;
  editInstrument: Instrument;
  generateApiKey: UserPermission;
  joinExchange: UserPermission;
  startExchange: Scalars['String'];
};


export type MutationAddInstrumentArgs = {
  exchangeId: Scalars['String'];
  instrument: AddInstrumentDto;
};


export type MutationCreateExchangeArgs = {
  exchangeData: CreateExchangeInput;
};


export type MutationCreateInviteArgs = {
  createInviteInput: CreateInviteInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteExchangeArgs = {
  exchangeId: Scalars['String'];
};


export type MutationDeleteInstrumentArgs = {
  instrumentId: Scalars['String'];
};


export type MutationEditExchangeArgs = {
  exchangeData: CreateExchangeInput;
  exchangeId: Scalars['String'];
};


export type MutationEditInstrumentArgs = {
  exchangeId: Scalars['String'];
  instrument: AddInstrumentDto;
  instrumentId: Scalars['String'];
};


export type MutationGenerateApiKeyArgs = {
  exchangeId: Scalars['String'];
  forceNew: Scalars['Boolean'];
};


export type MutationJoinExchangeArgs = {
  id: Scalars['String'];
};


export type MutationStartExchangeArgs = {
  exchangeId: Scalars['String'];
};

export enum Permission {
  Admin = 'ADMIN',
  User = 'USER'
}

export type ProfitLoss = {
  __typename?: 'ProfitLoss';
  instrument: Scalars['String'];
  profitLoss: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  checkInvite: Scalars['Boolean'];
  currentUser: User;
  exchange: Exchange;
};


export type QueryCheckInviteArgs = {
  id: Scalars['ID'];
};


export type QueryExchangeArgs = {
  id: Scalars['ID'];
};

export type RecentTrade = {
  __typename?: 'RecentTrade';
  instrumentId: Scalars['String'];
  price: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  /** the google ID */
  id: Scalars['ID'];
  name: Scalars['String'];
  profilePicUrl?: Maybe<Scalars['String']>;
  profitLoss: Scalars['Int'];
  userPermissions: Array<UserPermission>;
};


export type UserProfitLossArgs = {
  exchange: Scalars['ID'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  apiKey: Scalars['ID'];
  exchange: Exchange;
  id: Scalars['ID'];
  permission: Permission;
  user: User;
};

export type FindExchangeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindExchangeQuery = { __typename?: 'Query', exchange: { __typename?: 'Exchange', id: string, public: boolean, name: string, colour: number, port?: string | null, userPermissions: Array<{ __typename?: 'UserPermission', id: string, permission: Permission, user: { __typename?: 'User', name: string, id: string, email: string, profilePicUrl?: string | null, profitLoss: number } }>, instruments: Array<{ __typename?: 'Instrument', id: string, instrumentType: InstrumentType, name: string, tickSizeMin: number, positionLimit: number, bondFixedPrice: number, bondVolatility: number, recentTrades: Array<{ __typename?: 'RecentTrade', price: number, instrumentId: string }> }>, profitLoss: Array<{ __typename?: 'ProfitLoss', instrument: string, profitLoss: number }> } };

export type StartExchangeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type StartExchangeMutation = { __typename?: 'Mutation', startExchange: string };

export type AddInstrumentMutationVariables = Exact<{
  exchangeId: Scalars['String'];
  instrumentType: Scalars['String'];
  name: Scalars['String'];
  positionLimit: Scalars['Int'];
  tickSize: Scalars['Int'];
  bondFixedPrice: Scalars['Int'];
  bondVolatility: Scalars['Int'];
}>;


export type AddInstrumentMutation = { __typename?: 'Mutation', addInstrument: { __typename?: 'Instrument', id: string, name: string, tickSizeMin: number, positionLimit: number, bondFixedPrice: number, bondVolatility: number } };

export type EditInstrumentMutationVariables = Exact<{
  exchangeId: Scalars['String'];
  instrumentId: Scalars['String'];
  instrumentType: Scalars['String'];
  name: Scalars['String'];
  positionLimit: Scalars['Int'];
  tickSize: Scalars['Int'];
  bondFixedPrice: Scalars['Int'];
  bondVolatility: Scalars['Int'];
}>;


export type EditInstrumentMutation = { __typename?: 'Mutation', editInstrument: { __typename?: 'Instrument', id: string, name: string, tickSizeMin: number, positionLimit: number, bondFixedPrice: number, bondVolatility: number } };

export type DeleteInstrumentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteInstrumentMutation = { __typename?: 'Mutation', deleteInstrument: { __typename?: 'Instrument', id: string } };

export type CreateInviteMutationVariables = Exact<{
  exchangeId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'Invite', exchangeId: string, userId?: string | null, id: string } };

export type CheckInviteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CheckInviteQuery = { __typename?: 'Query', checkInvite: boolean };

export type GenerateApiKeyMutationVariables = Exact<{
  exchangeId: Scalars['String'];
  forceNew: Scalars['Boolean'];
}>;


export type GenerateApiKeyMutation = { __typename?: 'Mutation', generateApiKey: { __typename?: 'UserPermission', apiKey: string } };

export type JoinExchangeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type JoinExchangeMutation = { __typename?: 'Mutation', joinExchange: { __typename?: 'UserPermission', exchange: { __typename?: 'Exchange', id: string } } };

export type CreateTestExchangeMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTestExchangeMutation = { __typename?: 'Mutation', createTestExchange: { __typename?: 'Exchange', id: string } };

export type CreateExchangeMutationVariables = Exact<{
  name: Scalars['String'];
  color: Scalars['Int'];
}>;


export type CreateExchangeMutation = { __typename?: 'Mutation', createExchange: { __typename?: 'Exchange', id: string, name: string, colour: number, userPermissions: Array<{ __typename?: 'UserPermission', id: string }> } };

export type DeleteExchangeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExchangeMutation = { __typename?: 'Mutation', deleteExchange: { __typename?: 'Exchange', id: string } };

export type EditExchangeMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  color: Scalars['Int'];
}>;


export type EditExchangeMutation = { __typename?: 'Mutation', editExchange: { __typename?: 'Exchange', id: string, name: string, colour: number } };

export type GetProfitLossQueryVariables = Exact<{
  exchangeId: Scalars['ID'];
}>;


export type GetProfitLossQuery = { __typename?: 'Query', exchange: { __typename?: 'Exchange', profitLoss: Array<{ __typename?: 'ProfitLoss', instrument: string, profitLoss: number }> } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', name: string, profilePicUrl?: string | null, userPermissions: Array<{ __typename?: 'UserPermission', id: string, apiKey: string, permission: Permission, exchange: { __typename?: 'Exchange', id: string, name: string, colour: number, profitLoss: Array<{ __typename?: 'ProfitLoss', profitLoss: number }>, userPermissions: Array<{ __typename?: 'UserPermission', id: string }>, instruments: Array<{ __typename?: 'Instrument', name: string }> } }> } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  profilePicUrl?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string, email: string, profilePicUrl?: string | null, id: string } };


export const FindExchangeDocument = gql`
    query FindExchange($id: ID!) {
  exchange(id: $id) {
    id
    public
    name
    colour
    port
    userPermissions {
      id
      user {
        name
        id
        email
        profilePicUrl
        profitLoss(exchange: $id)
      }
      permission
    }
    instruments {
      id
      instrumentType
      name
      tickSizeMin
      positionLimit
      bondFixedPrice
      bondVolatility
      recentTrades(limit: 20) {
        price
        instrumentId
      }
    }
    profitLoss {
      instrument
      profitLoss
    }
  }
}
    `;

/**
 * __useFindExchangeQuery__
 *
 * To run a query within a React component, call `useFindExchangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindExchangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindExchangeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindExchangeQuery(baseOptions: Apollo.QueryHookOptions<FindExchangeQuery, FindExchangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindExchangeQuery, FindExchangeQueryVariables>(FindExchangeDocument, options);
      }
export function useFindExchangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindExchangeQuery, FindExchangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindExchangeQuery, FindExchangeQueryVariables>(FindExchangeDocument, options);
        }
export type FindExchangeQueryHookResult = ReturnType<typeof useFindExchangeQuery>;
export type FindExchangeLazyQueryHookResult = ReturnType<typeof useFindExchangeLazyQuery>;
export type FindExchangeQueryResult = Apollo.QueryResult<FindExchangeQuery, FindExchangeQueryVariables>;
export const StartExchangeDocument = gql`
    mutation StartExchange($id: String!) {
  startExchange(exchangeId: $id)
}
    `;
export type StartExchangeMutationFn = Apollo.MutationFunction<StartExchangeMutation, StartExchangeMutationVariables>;

/**
 * __useStartExchangeMutation__
 *
 * To run a mutation, you first call `useStartExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startExchangeMutation, { data, loading, error }] = useStartExchangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStartExchangeMutation(baseOptions?: Apollo.MutationHookOptions<StartExchangeMutation, StartExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartExchangeMutation, StartExchangeMutationVariables>(StartExchangeDocument, options);
      }
export type StartExchangeMutationHookResult = ReturnType<typeof useStartExchangeMutation>;
export type StartExchangeMutationResult = Apollo.MutationResult<StartExchangeMutation>;
export type StartExchangeMutationOptions = Apollo.BaseMutationOptions<StartExchangeMutation, StartExchangeMutationVariables>;
export const AddInstrumentDocument = gql`
    mutation AddInstrument($exchangeId: String!, $instrumentType: String!, $name: String!, $positionLimit: Int!, $tickSize: Int!, $bondFixedPrice: Int!, $bondVolatility: Int!) {
  addInstrument(
    exchangeId: $exchangeId
    instrument: {instrumentType: $instrumentType, name: $name, positionLimit: $positionLimit, tickSizeMin: $tickSize, bondFixedPrice: $bondFixedPrice, bondVolatility: $bondVolatility}
  ) {
    id
    name
    tickSizeMin
    positionLimit
    bondFixedPrice
    bondVolatility
  }
}
    `;
export type AddInstrumentMutationFn = Apollo.MutationFunction<AddInstrumentMutation, AddInstrumentMutationVariables>;

/**
 * __useAddInstrumentMutation__
 *
 * To run a mutation, you first call `useAddInstrumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInstrumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInstrumentMutation, { data, loading, error }] = useAddInstrumentMutation({
 *   variables: {
 *      exchangeId: // value for 'exchangeId'
 *      instrumentType: // value for 'instrumentType'
 *      name: // value for 'name'
 *      positionLimit: // value for 'positionLimit'
 *      tickSize: // value for 'tickSize'
 *      bondFixedPrice: // value for 'bondFixedPrice'
 *      bondVolatility: // value for 'bondVolatility'
 *   },
 * });
 */
export function useAddInstrumentMutation(baseOptions?: Apollo.MutationHookOptions<AddInstrumentMutation, AddInstrumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInstrumentMutation, AddInstrumentMutationVariables>(AddInstrumentDocument, options);
      }
export type AddInstrumentMutationHookResult = ReturnType<typeof useAddInstrumentMutation>;
export type AddInstrumentMutationResult = Apollo.MutationResult<AddInstrumentMutation>;
export type AddInstrumentMutationOptions = Apollo.BaseMutationOptions<AddInstrumentMutation, AddInstrumentMutationVariables>;
export const EditInstrumentDocument = gql`
    mutation EditInstrument($exchangeId: String!, $instrumentId: String!, $instrumentType: String!, $name: String!, $positionLimit: Int!, $tickSize: Int!, $bondFixedPrice: Int!, $bondVolatility: Int!) {
  editInstrument(
    exchangeId: $exchangeId
    instrumentId: $instrumentId
    instrument: {instrumentType: $instrumentType, name: $name, positionLimit: $positionLimit, tickSizeMin: $tickSize, bondFixedPrice: $bondFixedPrice, bondVolatility: $bondVolatility}
  ) {
    id
    name
    tickSizeMin
    positionLimit
    bondFixedPrice
    bondVolatility
  }
}
    `;
export type EditInstrumentMutationFn = Apollo.MutationFunction<EditInstrumentMutation, EditInstrumentMutationVariables>;

/**
 * __useEditInstrumentMutation__
 *
 * To run a mutation, you first call `useEditInstrumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditInstrumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editInstrumentMutation, { data, loading, error }] = useEditInstrumentMutation({
 *   variables: {
 *      exchangeId: // value for 'exchangeId'
 *      instrumentId: // value for 'instrumentId'
 *      instrumentType: // value for 'instrumentType'
 *      name: // value for 'name'
 *      positionLimit: // value for 'positionLimit'
 *      tickSize: // value for 'tickSize'
 *      bondFixedPrice: // value for 'bondFixedPrice'
 *      bondVolatility: // value for 'bondVolatility'
 *   },
 * });
 */
export function useEditInstrumentMutation(baseOptions?: Apollo.MutationHookOptions<EditInstrumentMutation, EditInstrumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditInstrumentMutation, EditInstrumentMutationVariables>(EditInstrumentDocument, options);
      }
export type EditInstrumentMutationHookResult = ReturnType<typeof useEditInstrumentMutation>;
export type EditInstrumentMutationResult = Apollo.MutationResult<EditInstrumentMutation>;
export type EditInstrumentMutationOptions = Apollo.BaseMutationOptions<EditInstrumentMutation, EditInstrumentMutationVariables>;
export const DeleteInstrumentDocument = gql`
    mutation DeleteInstrument($id: String!) {
  deleteInstrument(instrumentId: $id) {
    id
  }
}
    `;
export type DeleteInstrumentMutationFn = Apollo.MutationFunction<DeleteInstrumentMutation, DeleteInstrumentMutationVariables>;

/**
 * __useDeleteInstrumentMutation__
 *
 * To run a mutation, you first call `useDeleteInstrumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInstrumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInstrumentMutation, { data, loading, error }] = useDeleteInstrumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInstrumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInstrumentMutation, DeleteInstrumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInstrumentMutation, DeleteInstrumentMutationVariables>(DeleteInstrumentDocument, options);
      }
export type DeleteInstrumentMutationHookResult = ReturnType<typeof useDeleteInstrumentMutation>;
export type DeleteInstrumentMutationResult = Apollo.MutationResult<DeleteInstrumentMutation>;
export type DeleteInstrumentMutationOptions = Apollo.BaseMutationOptions<DeleteInstrumentMutation, DeleteInstrumentMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($exchangeId: String!, $userId: String!) {
  createInvite(createInviteInput: {exchangeId: $exchangeId, userId: $userId}) {
    exchangeId
    userId
    id
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      exchangeId: // value for 'exchangeId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const CheckInviteDocument = gql`
    query CheckInvite($id: ID!) {
  checkInvite(id: $id)
}
    `;

/**
 * __useCheckInviteQuery__
 *
 * To run a query within a React component, call `useCheckInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckInviteQuery(baseOptions: Apollo.QueryHookOptions<CheckInviteQuery, CheckInviteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckInviteQuery, CheckInviteQueryVariables>(CheckInviteDocument, options);
      }
export function useCheckInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckInviteQuery, CheckInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckInviteQuery, CheckInviteQueryVariables>(CheckInviteDocument, options);
        }
export type CheckInviteQueryHookResult = ReturnType<typeof useCheckInviteQuery>;
export type CheckInviteLazyQueryHookResult = ReturnType<typeof useCheckInviteLazyQuery>;
export type CheckInviteQueryResult = Apollo.QueryResult<CheckInviteQuery, CheckInviteQueryVariables>;
export const GenerateApiKeyDocument = gql`
    mutation GenerateApiKey($exchangeId: String!, $forceNew: Boolean!) {
  generateApiKey(exchangeId: $exchangeId, forceNew: $forceNew) {
    apiKey
  }
}
    `;
export type GenerateApiKeyMutationFn = Apollo.MutationFunction<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>;

/**
 * __useGenerateApiKeyMutation__
 *
 * To run a mutation, you first call `useGenerateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateApiKeyMutation, { data, loading, error }] = useGenerateApiKeyMutation({
 *   variables: {
 *      exchangeId: // value for 'exchangeId'
 *      forceNew: // value for 'forceNew'
 *   },
 * });
 */
export function useGenerateApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>(GenerateApiKeyDocument, options);
      }
export type GenerateApiKeyMutationHookResult = ReturnType<typeof useGenerateApiKeyMutation>;
export type GenerateApiKeyMutationResult = Apollo.MutationResult<GenerateApiKeyMutation>;
export type GenerateApiKeyMutationOptions = Apollo.BaseMutationOptions<GenerateApiKeyMutation, GenerateApiKeyMutationVariables>;
export const JoinExchangeDocument = gql`
    mutation JoinExchange($id: String!) {
  joinExchange(id: $id) {
    exchange {
      id
    }
  }
}
    `;
export type JoinExchangeMutationFn = Apollo.MutationFunction<JoinExchangeMutation, JoinExchangeMutationVariables>;

/**
 * __useJoinExchangeMutation__
 *
 * To run a mutation, you first call `useJoinExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinExchangeMutation, { data, loading, error }] = useJoinExchangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinExchangeMutation(baseOptions?: Apollo.MutationHookOptions<JoinExchangeMutation, JoinExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinExchangeMutation, JoinExchangeMutationVariables>(JoinExchangeDocument, options);
      }
export type JoinExchangeMutationHookResult = ReturnType<typeof useJoinExchangeMutation>;
export type JoinExchangeMutationResult = Apollo.MutationResult<JoinExchangeMutation>;
export type JoinExchangeMutationOptions = Apollo.BaseMutationOptions<JoinExchangeMutation, JoinExchangeMutationVariables>;
export const CreateTestExchangeDocument = gql`
    mutation CreateTestExchange {
  createTestExchange {
    id
  }
}
    `;
export type CreateTestExchangeMutationFn = Apollo.MutationFunction<CreateTestExchangeMutation, CreateTestExchangeMutationVariables>;

/**
 * __useCreateTestExchangeMutation__
 *
 * To run a mutation, you first call `useCreateTestExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestExchangeMutation, { data, loading, error }] = useCreateTestExchangeMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateTestExchangeMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestExchangeMutation, CreateTestExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTestExchangeMutation, CreateTestExchangeMutationVariables>(CreateTestExchangeDocument, options);
      }
export type CreateTestExchangeMutationHookResult = ReturnType<typeof useCreateTestExchangeMutation>;
export type CreateTestExchangeMutationResult = Apollo.MutationResult<CreateTestExchangeMutation>;
export type CreateTestExchangeMutationOptions = Apollo.BaseMutationOptions<CreateTestExchangeMutation, CreateTestExchangeMutationVariables>;
export const CreateExchangeDocument = gql`
    mutation CreateExchange($name: String!, $color: Int!) {
  createExchange(exchangeData: {exchangeColor: $color, exchangeName: $name}) {
    id
    name
    colour
    userPermissions {
      id
    }
  }
}
    `;
export type CreateExchangeMutationFn = Apollo.MutationFunction<CreateExchangeMutation, CreateExchangeMutationVariables>;

/**
 * __useCreateExchangeMutation__
 *
 * To run a mutation, you first call `useCreateExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExchangeMutation, { data, loading, error }] = useCreateExchangeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateExchangeMutation(baseOptions?: Apollo.MutationHookOptions<CreateExchangeMutation, CreateExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExchangeMutation, CreateExchangeMutationVariables>(CreateExchangeDocument, options);
      }
export type CreateExchangeMutationHookResult = ReturnType<typeof useCreateExchangeMutation>;
export type CreateExchangeMutationResult = Apollo.MutationResult<CreateExchangeMutation>;
export type CreateExchangeMutationOptions = Apollo.BaseMutationOptions<CreateExchangeMutation, CreateExchangeMutationVariables>;
export const DeleteExchangeDocument = gql`
    mutation DeleteExchange($id: String!) {
  deleteExchange(exchangeId: $id) {
    id
  }
}
    `;
export type DeleteExchangeMutationFn = Apollo.MutationFunction<DeleteExchangeMutation, DeleteExchangeMutationVariables>;

/**
 * __useDeleteExchangeMutation__
 *
 * To run a mutation, you first call `useDeleteExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExchangeMutation, { data, loading, error }] = useDeleteExchangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExchangeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExchangeMutation, DeleteExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExchangeMutation, DeleteExchangeMutationVariables>(DeleteExchangeDocument, options);
      }
export type DeleteExchangeMutationHookResult = ReturnType<typeof useDeleteExchangeMutation>;
export type DeleteExchangeMutationResult = Apollo.MutationResult<DeleteExchangeMutation>;
export type DeleteExchangeMutationOptions = Apollo.BaseMutationOptions<DeleteExchangeMutation, DeleteExchangeMutationVariables>;
export const EditExchangeDocument = gql`
    mutation EditExchange($id: String!, $name: String!, $color: Int!) {
  editExchange(
    exchangeId: $id
    exchangeData: {exchangeColor: $color, exchangeName: $name}
  ) {
    id
    name
    colour
  }
}
    `;
export type EditExchangeMutationFn = Apollo.MutationFunction<EditExchangeMutation, EditExchangeMutationVariables>;

/**
 * __useEditExchangeMutation__
 *
 * To run a mutation, you first call `useEditExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editExchangeMutation, { data, loading, error }] = useEditExchangeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useEditExchangeMutation(baseOptions?: Apollo.MutationHookOptions<EditExchangeMutation, EditExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditExchangeMutation, EditExchangeMutationVariables>(EditExchangeDocument, options);
      }
export type EditExchangeMutationHookResult = ReturnType<typeof useEditExchangeMutation>;
export type EditExchangeMutationResult = Apollo.MutationResult<EditExchangeMutation>;
export type EditExchangeMutationOptions = Apollo.BaseMutationOptions<EditExchangeMutation, EditExchangeMutationVariables>;
export const GetProfitLossDocument = gql`
    query GetProfitLoss($exchangeId: ID!) {
  exchange(id: $exchangeId) {
    profitLoss {
      instrument
      profitLoss
    }
  }
}
    `;

/**
 * __useGetProfitLossQuery__
 *
 * To run a query within a React component, call `useGetProfitLossQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfitLossQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfitLossQuery({
 *   variables: {
 *      exchangeId: // value for 'exchangeId'
 *   },
 * });
 */
export function useGetProfitLossQuery(baseOptions: Apollo.QueryHookOptions<GetProfitLossQuery, GetProfitLossQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfitLossQuery, GetProfitLossQueryVariables>(GetProfitLossDocument, options);
      }
export function useGetProfitLossLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfitLossQuery, GetProfitLossQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfitLossQuery, GetProfitLossQueryVariables>(GetProfitLossDocument, options);
        }
export type GetProfitLossQueryHookResult = ReturnType<typeof useGetProfitLossQuery>;
export type GetProfitLossLazyQueryHookResult = ReturnType<typeof useGetProfitLossLazyQuery>;
export type GetProfitLossQueryResult = Apollo.QueryResult<GetProfitLossQuery, GetProfitLossQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    name
    profilePicUrl
    userPermissions {
      id
      apiKey
      permission
      exchange {
        id
        name
        colour
        profitLoss {
          profitLoss
        }
        userPermissions {
          id
        }
        instruments {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $profilePicUrl: String, $id: ID!) {
  createUser(
    createUserInput: {name: $name, email: $email, profilePicUrl: $profilePicUrl, id: $id}
  ) {
    name
    email
    profilePicUrl
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      profilePicUrl: // value for 'profilePicUrl'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;