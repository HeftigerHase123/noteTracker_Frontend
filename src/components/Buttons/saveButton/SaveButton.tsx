import styles from "./SaveButton.module.css";

type Props = {
  onClick: () => void;
}

export default function SaveButton({onClick}: Props) {

  return(
    <button className={styles.button} onClick={onClick}>
      <p>Save</p>
    </button>
  );
}