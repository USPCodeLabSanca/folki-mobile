import Subject, { AvailableDay, SubjectClass } from "./Subject";

interface UserSubject {
  id?: number;
  absences?: number;
  grading?: number;
  subjectClass: SubjectClass;
  color?: string;
}

export default UserSubject;
