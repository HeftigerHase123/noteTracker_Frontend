import SubjectsAPI from "@/lib/api/Subjects";
import styles from "./page.module.css";
import { GradesAPI } from "@/lib/api/Grades";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import GradeCardComponent from "@/components/gradeCard/GradeCard";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function SubjectDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await verifySession();
  if (!session) redirect("/404");

  const subject = await SubjectsAPI.read(id);
  const grades = await GradesAPI.readByUserId(
    session.user.id,
    session.accessToken,
  );
  const gradesBySubject = grades.filter((grade) => {
    return grade.subject === subject.id;
  });

  const average =
    gradesBySubject.reduce((sum, grade) => sum + grade.grade, 0) /
    gradesBySubject.length;

  let gradeClass = "";

  if (average >= 4.5) {
    gradeClass = "green";
  } else if (average >= 4) {
    gradeClass = "orange";
  } else {
    gradeClass = "red";
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h2>{subject.name}</h2>
      </div>
      <div className={styles.details_pannel}>
        <h4>Average:</h4>
        <p className={`${styles.average} ${gradeClass}`}>
          {average.toFixed(1)}
        </p>
      </div>
      <h4 className={styles.subtitle}>Grades:</h4>
      <div className={styles.grades}>
        {gradesBySubject.map((grade) => {
          return <GradeCardComponent key={grade.id} grade={grade} />;
        })}
      </div>
      <div className={styles.buttons}>
        <button>
          <Image
            src={"/assets/add.png"}
            alt="add"
            width={32}
            height={32}
          ></Image>
          <p>Add grade</p>
        </button>
        <button>
          <Image src={"/assets/export.png"} alt="export" width={32} height={32}></Image>
          <p>export grades</p>
        </button>
      </div>
    </div>
  );
}
