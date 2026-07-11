import { GradesAPI } from "@/lib/api/Grades";
import { verifySession } from "@/lib/session";
import { Grade } from "@/types/Grade";
import { redirect } from "next/navigation";
import GradeCardComponent from "./GradeCard";

type Props = {
  grade: Grade;
};

export default async function GradeCardFeed({ grade }: Props) {
  const session = await verifySession();
  if (!session) redirect("/404");

  const gradeObject = await GradesAPI.read(grade.id, session.accessToken);

  return <GradeCardComponent session={session} grade={gradeObject} />
}