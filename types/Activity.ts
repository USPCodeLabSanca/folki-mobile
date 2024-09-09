import { SubjectClass } from "./Subject";
interface Activity {
  id: number;
  name: string;
  description: string;
  value: number;
  userValue: number;
  completed: boolean;
  subjectId: number;
  finishDate: string;
  type: string;
  subjectClass?: SubjectClass;
  checked?: boolean;
  ignored?: boolean;
  isPrivate?: boolean;
  deletedAt?: string;
}

export default Activity;
