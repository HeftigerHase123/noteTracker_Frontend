import { Grade } from "@/types/Grade";
import styles from "./GradeCard.module.css";
import { GradesAPI } from "@/lib/api/Grades";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = {
  grade: Grade;
};

export default async function GradeCardComponent({ grade }: Props) {
  const session = await verifySession();
  if (!session) redirect("/404");

  const gradeObject = await GradesAPI.read(grade.id, session.accessToken);

  let gradeClass = "";

  if (gradeObject.grade >= 4.5) {
    gradeClass = 'green';
  } else if (gradeObject.grade >= 4) {
    gradeClass = 'orange';
  } else {
    gradeClass = 'red';
  }

  return (
    <div className={styles.page}>
      <p className={gradeClass}>{gradeObject.grade.toFixed(1)}</p>
    </div>
  );
}
