import Image from "next/image";
import styles from "../styles/Header.module.css";

type Props = {
  isTranscribing: boolean;
  owner: boolean;
  token: boolean;
};

const Header = ({ isTranscribing, owner, token }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerSection}>
        <Image src="/logo.svg" alt="Daily logo" width="60" height="24" />
        <span className={styles.title}>🎙️ Daily MC Mode 🎙️</span>
        {token && (
          <span className={styles.tokenStatus}>
            <button>Token</button>
          </span>
        )}
        {owner && (
          <span>
            <button>Owner</button>
          </span>
        )}
        {isTranscribing && (
          <span>
            <button>Transcribing</button>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
