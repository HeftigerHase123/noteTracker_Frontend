import styles from "./Navigation.module.css";
import NavLinks from "./NavLinks";

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
      <NavLinks onLinkClick={onClose} />
    </nav>
  );
}
