import { Weekday } from "./WeekdayEnum";

export interface UpdateSubjectUserDTO {
  subjectId?: number;
  userId?: number;
  weekday?: Weekday;
  time?: string;
}