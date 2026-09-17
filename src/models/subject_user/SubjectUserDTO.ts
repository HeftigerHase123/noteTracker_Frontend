import { Weekday } from "./WeekdayEnum";

export interface SubjectUserDTO {
  id: number;
  subjectId: number;
  userId: number;
  weekday: Weekday;
  time: string;
}