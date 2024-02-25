import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import User from "../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSubject from "../types/UserSubject";
import Activity from "../types/Activity";

interface Value {
  user?: User;
  token: string | null;
  userSubjects: any[];
  userActivities: Activity[];
  setUser: (user?: User) => void;
  updateToken: (token: string) => void;
  setUserSubjects: (subjects: any[]) => void;
  setUserActivities: (activities: Activity[]) => void;
}

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

const UserContext = createContext({} as Value);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>();
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const tokenSecure = await AsyncStorage.getItem("token");
    if (!tokenSecure) return setToken(null);
    setToken(tokenSecure);
  };

  const updateToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userSubjects,
        userActivities,
        token,
        setUser,
        updateToken,
        setUserSubjects,
        setUserActivities,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
