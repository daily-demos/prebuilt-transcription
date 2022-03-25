import styles from "../styles/CallFrame.module.css";

const CallFrame = ({}) => {
  return (
    <div className={styles.callFrameContainer}>
      <iframe
        id="callFrame"
        className={styles.callFrame}
        allow="microphone; camera; autoplay; display-capture"
      ></iframe>
    </div>
  );
};

export default CallFrame;
