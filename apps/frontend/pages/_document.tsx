import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-neutral-900">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="A trading exchange simulator made for testing trading bots and running trading competitions with per instrument trading history and overall P/L leaderboards."
        />
        <meta property="og:title" content="simulate.exchange" />
        <meta
          property="og:description"
          content="A trading exchange simulator made for testing trading bots and running trading competitions with per instrument trading history and overall P/L leaderboards."
        />
        <meta
          property="og:image"
          content="https://media.discordapp.net/attachments/826599483126579282/975348658117701632/card-large-2.png?width=1082&height=541"
        />
        <meta property="og:url" content="https://simulate.exchange" />
      </Head>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
