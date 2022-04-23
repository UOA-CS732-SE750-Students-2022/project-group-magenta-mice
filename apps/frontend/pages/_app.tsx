import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Loading } from "@simulate-exchange/components";
import {
  LoaderCounterContext,
  LoggedInProvider,
} from "@simulate-exchange/hooks";
import { getAuth } from "firebase/auth";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../services/firebase";
import "./styles.css";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}\nPath: ${path}\n`,
        locations,
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getAuth().currentUser?.getIdToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setLoadingCount((p) => p + 1);
    };
    const handleComplete = () => {
      setLoadingCount((p) => p - 1);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <LoaderCounterContext.Provider value={{ loadingCount, setLoadingCount }}>
        <LoggedInProvider>
          {loadingCount > 0 && createPortal(<Loading />, document.body)}

          <Head>
            <title>Welcome to frontend!</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </LoggedInProvider>
      </LoaderCounterContext.Provider>
    </ApolloProvider>
  );
}

export default CustomApp;
