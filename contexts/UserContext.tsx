import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../clients/apiClient";
import ufscarClient from "../clients/ufscarClient";
import Activity from "../types/Activity";
import { ImportantDate } from "../types/ImportantDate";
import User, { UFSCarData } from "../types/User";
import UserSubject from "../types/UserSubject";
import randomDarkColor from "../utils/randomDarkColor";

interface Value {
  user?: User;
  token: string | null;
  userSubjects: any[];
  userActivities: Activity[];
  ufscarData?: UFSCarData;
  isAllDataOfflineVerified: boolean;
  setUser: (user?: User) => void;
  updateToken: (token: string) => void;
  setUserSubjects: (subjects: any[]) => void;
  setUserActivities: (activities: Activity[]) => void;
  importantDates: ImportantDate[];
  setImportantDates: (dates: ImportantDate[]) => void;
  updateUFSCarBalance: () => void;
  updateImportantDates: () => void;
  updateActivities: () => void;
}

interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

const UserContext = createContext({} as Value);

export function UserProvider({ children }: Props) {
  const [user, setUserState] = useState<User | undefined>({});
  const [userSubjects, setUserSubjectsState] = useState<UserSubject[]>([]);
  const [userActivities, setUserActivitiesState] = useState<Activity[]>([]);
  const [importantDates, setImportantDatesState] = useState<ImportantDate[]>([]);
  const [token, setToken] = useState<string | null>("");
  const [ufscarData, setUFSCarData] = useState<UFSCarData | undefined>();
  const [isAllDataOfflineVerified, setIsAllDataOfflineVerified] = useState(false);
  
  useEffect(() => {
    verifyData();
  }, []);

  const verifyData = async () => {
    await verifyUser();
    await verifyUserSubjects();
    await verifyUserActivities();
    await verifyImportantDates();
    await verifyToken();
    setIsAllDataOfflineVerified(true);
  }

  const verifyUser = async () => {
    const userSecure = await AsyncStorage.getItem("user");
    if (!userSecure) return setUserState(undefined);
    setUserState(JSON.parse(userSecure));
  };

  const verifyUserSubjects = async () => {
    const userSubjectsSecure = await AsyncStorage.getItem("userSubjects");
    if (!userSubjectsSecure) return setUserSubjectsState([]);
    setUserSubjectsState(JSON.parse(userSubjectsSecure));
  }

  const verifyUserActivities = async () => {
    const userActivitiesSecure = await AsyncStorage.getItem("userActivities");
    if (!userActivitiesSecure) return setUserActivitiesState([]);
    setUserActivitiesState(JSON.parse(userActivitiesSecure));
  }

  const verifyImportantDates = async () => {
    const importantDatesSecure = await AsyncStorage.getItem("importantDates");
    if (!importantDatesSecure) return setImportantDatesState([]);
    setImportantDatesState(JSON.parse(importantDatesSecure));
  }

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

  const updateImportantDates = async () => {
    const importantDates = await apiClient.getImportantDates(token!);
    setImportantDates(importantDates);
  }

  const updateActivities = async () => {
    const { activities } = await apiClient.getUserActivities(token!);
    setUserActivities(activities);
  }

  const setUser = (user?: User) => {
    if (!user) {
      AsyncStorage.removeItem("user");
      setUserState(undefined);
      return;
    }

    AsyncStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  }

  const setUserSubjects = (subjects: UserSubject[]) => {
    subjects = subjects.map((subject) => { return {...subject, color: randomDarkColor() } })
    if (!subjects.length) {
      AsyncStorage.removeItem("userSubjects");
      setUserSubjectsState([]);
      return;
    }

    AsyncStorage.setItem("userSubjects", JSON.stringify(subjects));
    setUserSubjectsState(subjects);
  }

  const setUserActivities = (activities: Activity[]) => {
    if (!activities.length) {
      AsyncStorage.removeItem("userActivities");
      setUserActivitiesState([]);
      return;
    }

    AsyncStorage.setItem("userActivities", JSON.stringify(activities));
    setUserActivitiesState(activities);
  }

  const setImportantDates = (dates: ImportantDate[]) => {
    if (!dates.length) {
      AsyncStorage.removeItem("importantDates");
      setImportantDatesState([]);
      return;
    }

    AsyncStorage.setItem("importantDates", JSON.stringify(dates));
    setImportantDatesState(dates);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userSubjects,
        userActivities,
        token,
        ufscarData,
        isAllDataOfflineVerified,
        setUser,
        updateToken,
        setUserSubjects,
        setUserActivities,
        importantDates,
        setImportantDates,
        updateUFSCarBalance,
        updateImportantDates,
        updateActivities,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
