import styles from "./DeleteButton.module.css";
import Image from "next/image";

type Props = {
  onClick: () => void;
}

export default function DeleteButton({onClick}: Props) {

  return(
    <button className={styles.button} onClick={onClick}>
      <p>Delete</p>
      <Image src={"/assets/icons/delete-light.png"} alt="delete icon" width={24} height={24}></Image>
    </button>
  );
}