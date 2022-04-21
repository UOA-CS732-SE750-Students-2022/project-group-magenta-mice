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

export type CreateInviteInput = {
  exchangeId: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  /** Google Id */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Google ProfilePic of user */
  profilePicUrl?: InputMaybe<Scalars['String']>;
};

export type Exchange = {
  __typename?: 'Exchange';
  id: Scalars['String'];
  public: Scalars['Boolean'];
  userPermissions: Array<UserPermission>;
};

export type Invite = {
  __typename?: 'Invite';
  exchangeId: Scalars['String'];
  id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
};

export type InviteResponse = {
  __typename?: 'InviteResponse';
  error: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvite: Invite;
  createTestExchange: Exchange;
  createUser: User;
  joinExchange: UserPermission;
};


export type MutationCreateInviteArgs = {
  createInviteInput: CreateInviteInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationJoinExchangeArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkInvite: InviteResponse;
  currentUser: User;
  exchange: Exchange;
};


export type QueryCheckInviteArgs = {
  id: Scalars['ID'];
};


export type QueryExchangeArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  /** the google ID */
  id: Scalars['ID'];
  name: Scalars['String'];
  profilePicUrl?: Maybe<Scalars['String']>;
  userPermissions?: Maybe<Array<UserPermission>>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  exchange: Exchange;
  permission: Scalars['String'];
  user: User;
};

export type FindExchangeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindExchangeQuery = { __typename?: 'Query', exchange: { __typename?: 'Exchange', public: boolean, userPermissions: Array<{ __typename?: 'UserPermission', permission: string, user: { __typename?: 'User', name: string, id: string } }> } };

export type CreateInviteMutationVariables = Exact<{
  exchangeId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'Invite', exchangeId: string, userId?: string | null, id: string } };

export type CheckInviteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CheckInviteQuery = { __typename?: 'Query', checkInvite: { __typename?: 'InviteResponse', error: string } };

export type JoinExchangeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type JoinExchangeMutation = { __typename?: 'Mutation', joinExchange: { __typename?: 'UserPermission', exchange: { __typename?: 'Exchange', id: string } } };

export type CreateTestExchangeMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTestExchangeMutation = { __typename?: 'Mutation', createTestExchange: { __typename?: 'Exchange', id: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', name: string, profilePicUrl?: string | null, userPermissions?: Array<{ __typename?: 'UserPermission', permission: string, exchange: { __typename?: 'Exchange', id: string } }> | null } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  profilePicUrl?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string, profilePicUrl?: string | null, id: string } };


export const FindExchangeDocument = gql`
    query FindExchange($id: ID!) {
  exchange(id: $id) {
    public
    userPermissions {
      user {
        name
        id
      }
      permission
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
  checkInvite(id: $id) {
    error
  }
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
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    name
    profilePicUrl
    userPermissions {
      permission
      exchange {
        id
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
    mutation CreateUser($name: String!, $profilePicUrl: String, $id: ID!) {
  createUser(
    createUserInput: {name: $name, profilePicUrl: $profilePicUrl, id: $id}
  ) {
    name
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