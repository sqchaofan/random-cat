import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>猫画像ジェネレータ</title>
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}