import styles from "./ExportButton.module.css";
import Image from "next/image";

export default function ExportButton() {
  
  return(
    <button className={styles.button}>
      <p>Export</p>
      <Image src={"/assets/icons/export-light.png"} alt="Export Icon" width={24} height={24}></Image>
    </button>
  );
}