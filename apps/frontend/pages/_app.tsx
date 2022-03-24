import { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loading } from "@simulate-exchange/components";
import { LoaderCounterContext } from "@simulate-exchange/hooks";

const client = new ApolloClient({
  uri: "http://localhost:3333/graphql",
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
        {loadingCount > 0 && createPortal(<Loading />, document.body)}

        <Head>
          <title>Welcome to frontend!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </LoaderCounterContext.Provider>
    </ApolloProvider>
  );
}

export default CustomApp;
