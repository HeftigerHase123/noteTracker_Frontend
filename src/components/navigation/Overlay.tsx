import styles from "./Navigation.module.css";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function Overlay({ isOpen, onClick }: Props) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlay_visible : ""}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}