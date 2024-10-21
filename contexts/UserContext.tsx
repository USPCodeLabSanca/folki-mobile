import React from "react";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState, useEffect } from "react";
import User, { UFSCarData } from "../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSubject from "../types/UserSubject";
import Activity from "../types/Activity";
import { ImportantDate } from "../types/ImportantDate";
import ufscarClient from "../clients/ufscarClient";

interface Value {
  user?: User;
  token: string | null;
  userSubjects: any[];
  userActivities: Activity[];
  ufscarData?: UFSCarData;
  setUser: (user?: User) => void;
  updateToken: (token: string) => void;
  setUserSubjects: (subjects: any[]) => void;
  setUserActivities: (activities: Activity[]) => void;
  importantDates: ImportantDate[];
  setImportantDates: (dates: ImportantDate[]) => void;
  updateUFSCarBalance: () => void;
}

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

const UserContext = createContext({} as Value);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>();
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [token, setToken] = useState<string | null>("");
  const [ufscarData, setUFSCarData] = useState<UFSCarData | undefined>();

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

  const updateUFSCarBalance = async () => {
    if (!(await SecureStore.isAvailableAsync())) return;
    const ufscarAuth = await SecureStore.getItemAsync("ufscar-auth");
    if (!ufscarAuth) return;
    const balance = await ufscarClient.getRUBalance(ufscarAuth);
    setUFSCarData({ balance });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userSubjects,
        userActivities,
        token,
        ufscarData,
        setUser,
        updateToken,
        setUserSubjects,
        setUserActivities,
        importantDates,
        setImportantDates,
        updateUFSCarBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
