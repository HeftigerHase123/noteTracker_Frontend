import { SubjectDTO } from "@/models/subject/SubjectDTO";
import styles from "./SubjectContainer.module.css";
import React from "react";

type Props = {
  subject: SubjectDTO;
  draggable?: boolean;
}

export default function SubjectContainer({subject, draggable}: Props) {

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    subjectId: number
  ) => {
    e.dataTransfer.setData("subjectId", subjectId.toString());
  }

  return(
    <div className={styles.container} style={
      {
        "--bg-color": subject.color,
      } as React.CSSProperties
    } draggable={draggable === undefined ? true : false}
    onDragStart={(e) => handleDragStart(e, subject.id)}>
      <p>{subject.subject}</p>
    </div>
  );
}