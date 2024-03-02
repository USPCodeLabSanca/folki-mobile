import Institute from "./Institute";

interface User {
  id?: number;
  email?: string;
  name?: string;
  instituteId?: number;
  courseId?: number;
  isVerified?: boolean;
  institute?: Institute;
  notificationId?: string;
}

export default User;
