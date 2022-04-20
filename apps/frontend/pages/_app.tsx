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

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
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
  link: authLink.concat(httpLink),
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
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
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
