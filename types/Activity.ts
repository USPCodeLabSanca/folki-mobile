import UserSubject from "./UserSubject";

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
  userSubject?: UserSubject;
}

export default Activity;
