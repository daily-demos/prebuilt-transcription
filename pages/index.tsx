/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";

import styles from "../styles/Home.module.css";

function Form() {
  let [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  let [link, setLink] = useState<string>("");

  const buildUrl = (ev: any) => {
    ev.preventDefault(); // don't redirect the page
    const source = ev.target;
    const link = `${window.location.href}${source.domain.value}/${source.room.value}?t=${source.token.value}`;
    setIsSubmitted(true);
    setLink(link);
  };

  return (
    <div>
      {!isSubmitted ? (
        <form className={styles.form} onSubmit={buildUrl}>
          <label htmlFor="domain">Your domain</label>
          <input id="domain" type="text" autoComplete="domain" required />
          <label htmlFor="room">Your room</label>
          <input id="room" type="text" autoComplete="room" required />
          <label htmlFor="token">Room token</label>
          <input id="token" type="text" autoComplete="token" />
          <button type="submit">Create link</button>
        </form>
      ) : (
        <div className={styles.linkGroup}>
          <Link href={link}>
            <a>{link}</a>
          </Link>
          <div>
            <a
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
            >
              Copy
            </a>
            <a href={link}>Join</a>
            <a href={"/"}>Go back</a>
          </div>
          <span>
            Note: This form does not validate that the above room exists; you
            may want to verify before sharing with others!
          </span>
        </div>
      )}
    </div>
  );
}

const Home: NextPage = ({}) => {
  return (
    <div>
      <Head>
        <title>🎙️ Daily Prebuilt + Transcription 🎙️</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header error={""} isTranscribing={false} owner={false} token={false} />
      <main className="index">
        <h1>🎙️ Daily Prebuilt + Transcription 🎙️</h1>
        <p>
          Check out this repo's{" "}
          <a href="https://github.com/daily-demos/prebuilt-transcription">
            README
          </a>{" "}
          for setup details.
        </p>
        <Form></Form>
      </main>
    </div>
  );
};

export default Home;
