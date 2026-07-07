import styles from "./Navigation.module.css";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function BurgerButton({ isOpen, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Menü öffnen"
      aria-expanded={isOpen}
      className={styles.burger_btn}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}