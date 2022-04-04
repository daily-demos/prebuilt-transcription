import DailyIframe, {
  DailyCall,
  DailyEventObjectAppMessage,
} from "@daily-co/daily-js";
import type { NextPage } from "next";
import CallFrame from "../../components/CallFrame";
import Head from "next/head";
import Header from "../../components/Header";
import styles from "../../styles/Room.module.css";
import Transcription from "../../components/Transcription";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface transcriptMsg {
  name: string;
  text: string;
  timestamp: string;
}

const Room: NextPage = ({}) => {
  const router = useRouter();
  const { domain, room, t } = router.query;
  const [callFrame, setCallFrame] = useState<DailyCall>();
  const [newMsg, setNewMsg] = useState<transcriptMsg>({
    name: "",
    text: "",
    timestamp: "",
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  /*
    Track URL parameters to determine token and room owner status
  */

  const hasToken: boolean = t ? true : false;
  let url: string = `https://${domain}.daily.co/${room}`;
  if (t) {
    url += `?t=${t}`;
  }

  /*
    Set up the Daily call and event listeners on page load
  */

  const startCall = useCallback(() => {
    const iframe = document.getElementById("callFrame");
    const newCallFrame = DailyIframe.wrap(iframe as HTMLIFrameElement, {
      showLeaveButton: true,
    });
    setCallFrame(newCallFrame);

    newCallFrame.join({
      url: url,
    });

    newCallFrame.on("joined-meeting", (ev) => {
      let ownerCheck = ev?.participants.local.owner as boolean;
      setIsOwner(ownerCheck);
    });

    newCallFrame.on("transcription-started", () => {
      setIsTranscribing(true);
    });

    newCallFrame.on("transcription-stopped", () => {
      setIsTranscribing(false);
    });

    newCallFrame.on(
      "app-message",
      (msg: DailyEventObjectAppMessage | undefined) => {
        const data = msg?.data;
        if (msg?.fromId === "transcription" && data?.is_final) {
          const local = newCallFrame.participants().local;
          const name: string =
            local.session_id === data.session_id
              ? local.user_name
              : newCallFrame.participants()[data.session_id].user_name;
          const text: string = data.text;
          const timestamp: string = data.timestamp;

          if (name.length && text.length && timestamp.length) {
            setNewMsg({ name, text, timestamp });
          }
          // Let late-joiners know that transcription is running --
          // Ideally this would be more robust, because transcription
          // could be running but no one has said anything for a while
          // and the state would not update. For the purposes of this
          // demo, we'll just do this.
          setIsTranscribing(true);
        }
      }
    );
  }, [url]);

  useEffect(() => {
    startCall();
  }, [startCall]);

  /*
    Return embedded Daily call with transcription section
  */

  return (
    <div className={styles.container}>
      <Head>
        <title>🎙️ Daily Prebuilt + Transcription 🎙️</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header
        isTranscribing={isTranscribing}
        owner={isOwner}
        token={hasToken}
      />
      <main className={styles.main}>
        <div className={styles.callFrameContainer}>
          <CallFrame />
        </div>
        <div className={styles.transcription}>
          <Transcription
            callFrame={callFrame}
            newMsg={newMsg}
            owner={isOwner}
            isTranscribing={isTranscribing}
          />
        </div>
      </main>
    </div>
  );
};

export default Room;
