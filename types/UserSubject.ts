import Subject, { AvailableDay } from "./Subject";

interface UserSubject {
  absences?: number;
  availableDays: AvailableDay[];
  grading?: number;
  subject: Subject;
  color?: string;
}

export default UserSubject;
