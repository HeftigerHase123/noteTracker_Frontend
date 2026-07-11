import { Subject } from "@/types/Subject";
import styles from "./SubjectCard.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = {
  subject: Subject;
};

export default function SubjectCardComponent({ subject }: Props) {
  return (
    <div className={styles.page}>
      <h3>{subject.name}</h3>
      <Link href={`/dashboard/subject/${subject.id}`}>
        <div className={styles.img_circle}>
          <Image
            src={"/assets/pfeil_black.png"}
            alt="arrow"
            width={32}
            height={32}
          ></Image>
        </div>
      </Link>
    </div>
  );
}
