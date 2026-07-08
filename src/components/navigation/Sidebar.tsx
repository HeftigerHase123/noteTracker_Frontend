import styles from "./Navigation.module.css";
import NavLinks from "./NavLinks";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <nav
      className={`${styles.sidebar} ${isOpen ? styles.sidebar_open : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        onClick={onClose}
        aria-label="Menü schließen"
        className={styles.close_btn}
      >
        ✕
      </button>
      <div className={styles.sidebar_grid}>
        <div className={styles.sidebar_grid_up}>
          <NavLinks onLinkClick={onClose} />
          <button>Login</button>
        </div>
        <div className={styles.sidebar_grid_down}>
          <button>
            <Image
              src={"/assets/settings_black.png"}
              alt="settings"
              width={40}
              height={40}
            ></Image>
          </button>
          <button>
            <Image
              src={"/assets/account_black.png"}
              alt="account"
              width={40}
              height={40}
            ></Image>
          </button>
        </div>
      </div>
    </nav>
  );
}
