import Image from "next/image";
import styles from "../styles/Header.module.css";

type Props = {
  error: string;
  isTranscribing: boolean;
  owner: boolean;
  token: boolean;
};

const Header = ({ error, isTranscribing, owner, token }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerSection}>
        <Image src="/logo.svg" alt="Daily logo" width="60" height="24" />
        <span className={styles.title}>
          🎙️ Daily Prebuilt + Transcription 🎙️
        </span>
        <div className={styles.flags}>
          {token ? (
            <span>Token</span>
          ) : (
            <span className={styles.alertStatus}>No token</span>
          )}
          {owner ? (
            <span>Owner</span>
          ) : (
            <span className={styles.alertStatus}>Not owner</span>
          )}
          {isTranscribing && <span>Transcribing</span>}
          {error && <span className={styles.errorStatus}>{error}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
