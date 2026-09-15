import styles from "./EditButton.module.css";
import Image from "next/image";

export default function EditButton() {

  return(
    <button className={styles.button}>
      <p>Edit</p>
      <Image src={"/assets/icons/edit-light.png"} alt="Edit Icon" width={24} height={24}></Image>
    </button>
  );
}