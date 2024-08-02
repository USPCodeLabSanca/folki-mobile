import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

import { useUser } from "../../contexts/UserContext";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import DefaultBackground from "../../components/DefaultBackground";
import React from "react";
import Logo from "../../components/Logo";
import { Platform } from "react-native";
import Activity from "../../types/Activity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setActivityNotification from "../../utils/setActivityNotification";
import randomDarkColor from "../../utils/randomDarkColor";

const Verification = ({ navigation }: any) => {
  const {
    setUser,
    setUserSubjects,
    setUserActivities,
    setImportantDates,
    token,
  } = useUser();

  useEffect(() => {
    if (token === "") return;
    verify();
  }, [token]);

  const verifyActivitiesNotifications = async (activities: Activity[]) => {
    for (const activity of activities) {
      const notificationIdentifier = await AsyncStorage.getItem(
        `activity-notification-${activity.id}`
      );

      if (!notificationIdentifier) {
        await setActivityNotification(activity);
      }
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("uspCode");
    await SecureStore.deleteItemAsync("password");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Starter");
  };

  const verify = async () => {
    if (!token) return navigation.navigate("Starter");

    try {
      const { user } = await apiClient.getMe(token!);

      const { activities } = await apiClient.getUserActivities(token!);
      const importantDates = await apiClient.getImportantDates(token!);

      const userSubjects = (
        await apiClient.getUserSubjects(token!)
      ).userSubjects.map((userSubject) => {
        return { ...userSubject, color: randomDarkColor() };
      });

      setUser(user);
      setUserSubjects(userSubjects);
      setUserActivities(activities);
      setImportantDates(importantDates);

      if (Platform.OS !== "web") {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus === "granted") {
          const notificationId = await Notifications.getExpoPushTokenAsync({
            projectId: "d56f36cc-5718-45bc-a1c3-f4f53a3e7ea4",
          });
          await apiClient.updateMe(
            { notificationId: notificationId.data },
            token!
          );
          await verifyActivitiesNotifications(activities);
        }
      }

      if (Constants.expoConfig?.version !== user.userVersion) {
        await apiClient.updateMe(
          { userVersion: Constants.expoConfig?.version },
          token!
        );
      }

      navigation.navigate("Home");
    } catch (error: any) {
      if (error.status) {
        return logout();
      }

      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
    }
  };

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Logo />
    </DefaultBackground>
  );
};

export default Verification;
