import Subject, { AvailableDay } from "./Subject";

interface UserSubject {
  absences?: number;
  availableDays: AvailableDay[];
  grading?: number;
  subject: Subject;
}

export default UserSubject;
