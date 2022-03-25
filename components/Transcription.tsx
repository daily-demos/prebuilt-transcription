import { DailyCall } from "@daily-co/daily-js";
import styles from "../styles/Transcription.module.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";

interface transcriptMsg {
  name: string;
  text: string;
  timestamp: string;
}

type Props = {
  callFrame: DailyCall | undefined;
  isTranscribing: boolean;
  newMsg: transcriptMsg;
  owner: boolean;
};

const Transcription = ({ callFrame, isTranscribing, newMsg, owner }: Props) => {
  const [messages, setMessage] = useState<Array<transcriptMsg>>([]);
  const [chatFile, setChatFile] = useState<string>("");
  const listRef = useRef<any>({});
  const rowRef = useRef<any>({});

  /*
    Toggle starting and stopping transcription
  */
  async function startTranscription() {
    callFrame?.startTranscription();
  }

  async function stopTranscription() {
    callFrame?.stopTranscription();
  }

  /*
    Allow user to download most recent full transcript text
  */

  useEffect(() => {
    setChatFile(
      window.URL.createObjectURL(
        new Blob(
          messages.map((msg) =>
            msg.name
              ? `${msg.timestamp} ${msg.name}: ${msg.text}\n`
              : `Transcript\n`
          ),
          { type: "octet/stream" }
        )
      )
    );
  }, [messages]);

  /*
    Receive, set, and display messages
  */

  useEffect(() => {
    setMessage((messages: Array<transcriptMsg>) => {
      return [...messages, newMsg];
    });
  }, [newMsg]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      return () => {
        scrollToBottom();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  /*
    Build virtualized transcript window
  */

  function getRowHeight(index: number) {
    return rowRef.current[index] + 8 || 100;
  }

  function setRowHeight(index: number, size: number) {
    listRef.current.resetAfterIndex(0);
    rowRef.current = { ...rowRef.current, [index]: size };
  }

  function scrollToBottom() {
    listRef.current.scrollToItem(messages.length, "end");
  }

  type rowProps = {
    index: number;
    style: CSSProperties | undefined;
  };

  function Row({ index, style }: rowProps) {
    const rowRef = useRef<any>({});

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowRef]);

    return (
      <div style={style}>
        {messages[index].name && (
          <div ref={rowRef}>
            {messages[index].name}: {messages[index].text}
            <span className={styles.timestamp}>
              {new Date(messages[index].timestamp).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
    );
  }

  /*
    Return transcript section
  */

  return (
    <section className={styles.transcription}>
      <div className={styles.buttons}>
        {owner && (
          <>
            <a
              onClick={() => {
                isTranscribing ? stopTranscription() : startTranscription();
              }}
            >
              {isTranscribing ? "Stop transcribing" : "Start transcribing"}
            </a>
            <a href={chatFile} download="transcript.txt">
              Download Transcript
            </a>
          </>
        )}
      </div>
      <div id="transcript" className={styles.transcript}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={messages.length}
              itemSize={getRowHeight}
              ref={listRef}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

export default Transcription;
