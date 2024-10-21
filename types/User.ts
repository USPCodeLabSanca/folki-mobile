import Institute from "./Institute";
import University from "./University";

export interface UFSCarData {
  balance?: number;
}

interface User {
  id?: number;
  email?: string;
  name?: string;
  instituteId?: number;
  courseId?: number;
  isVerified?: boolean;
  institute?: Institute;
  notificationId?: string;
  userVersion?: string;
  university?: University;
}

export default User;
