import { Weekday } from "./WeekdayEnum";

export interface CreateSubjectUserDTO {
  subjectId: number;
  userId: number;
  weekday: Weekday;
  time: string;
}