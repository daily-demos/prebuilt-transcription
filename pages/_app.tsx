import "../styles/globals.css";
import type { AppProps } from "next/app";

function mcMode({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default mcMode;
