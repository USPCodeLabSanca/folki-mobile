import Institute from "./Institute";

interface AvailableDay {
  day: string;
  start: string;
  end: string;
}

interface SubjectClass {
  id: number;
  professorName: string;
  details: string;
  availableDays: AvailableDay[];
}

interface Subject {
  id: number;
  name: string;
  code?: string;
  subjectClass?: SubjectClass[];
  institute?: Institute;
  driveItemsNumber?: number;
}

export { SubjectClass, AvailableDay };

export default Subject;
