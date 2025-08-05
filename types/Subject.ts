import Institute from "./Institute";

interface AvailableDay {
  day: string;
  start: string;
  end: string;
  classRoom?: string;
}

interface SubjectClass {
  id: number;
  availableDays: AvailableDay[];
  subject: Subject;
  observations?: string;
}

interface Subject {
  id: number;
  name: string;
  code?: string;
  content?: string;
  driveItemsNumber?: number;
}

export { SubjectClass, AvailableDay };

export default Subject;
