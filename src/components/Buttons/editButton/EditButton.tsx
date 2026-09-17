import styles from "./EditButton.module.css";
import Image from "next/image";

type EditProps = {
  onClick: () => void;
}

export default function EditButton({onClick}: EditProps) {

  return(
    <button className={styles.button} onClick={onClick}>
      <p>Edit</p>
      <Image src={"/assets/icons/edit-light.png"} alt="Edit Icon" width={24} height={24}></Image>
    </button>
  );
}