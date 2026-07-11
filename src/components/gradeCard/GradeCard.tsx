"use client";
import { Grade } from "@/types/Grade";
import styles from "./GradeCard.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Session } from "@/types/Session";
import { updateGrade } from "@/services/gradeServices";
import { ToastService } from "@/services/toastService";

type Props = {
  grade: Grade;
  session: Session;
};

export default function GradeCardComponent({ grade, session }: Props) {
  const [comment, setComment] = useState(grade.comment);
  const [isActiv, setIsActive] = useState(false);

  if (!session) redirect("/404");

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setIsActive(true);
  };

  const handleSaveClick = () => {
    setIsActive(false);
    updateGrade(comment, grade);
  };

  let gradeClass = "";

  if (grade.grade >= 4.5) {
    gradeClass = "green";
  } else if (grade.grade >= 4) {
    gradeClass = "orange";
  } else {
    gradeClass = "red";
  }

  return (
    <div className={styles.page}>
      <p className={gradeClass}>{grade.grade.toFixed(1)}</p>
      <input type="text" value={comment} onChange={handleInputchange} />
      {isActiv && <button onClick={handleSaveClick}>save</button>}
    </div>
  );
}
