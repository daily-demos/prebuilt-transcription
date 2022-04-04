import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = ({}) => {
  return (
    <div>
      <Head>
        <title>🎙️ Daily Prebuilt + Transcription 🎙️</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header isTranscribing={false} owner={false} token={false} />
      <main>
        <h1>🎙️ Daily Prebuilt + Transcription 🎙️</h1>
        <p>Expected URL path: /your-domain/your-room-name-here</p>
        <p>
          To join as owner, pass in <code>?t=TOKEN</code> to the end of your URL
        </p>
      </main>
    </div>
  );
};

export default Home;
