import { Subject } from "@/types/Subject";
import styles from "./SubjectCard.module.css";
import Image from "next/image";

type Props = {
  subject: Subject;
};

export default function SubjectCardComponent({ subject }: Props) {
  return (
    <div className={styles.page}>
      <h3>{subject.name}</h3>
      <div className={styles.img_circle}>
        <Image
          src={"/assets/pfeil_black.png"}
          alt="arrow"
          width={32}
          height={32}
        ></Image>
      </div>
    </div>
  );
}
