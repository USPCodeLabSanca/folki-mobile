import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import apiClient from "../../clients/apiClient";
import DefaultBackground from "../../components/DefaultBackground";
import Logo from "../../components/Logo";
import { useUser } from "../../contexts/UserContext";

const Verification = ({ navigation }: any) => {
  const {
    setUser,
    setUserSubjects,
    updateImportantDates,
    updateUFSCarBalance,
    updateActivities,
    user,
    userSubjects,
    token,
    isAllDataOfflineVerified,
  } = useUser();

  useEffect(() => {
    if (!isAllDataOfflineVerified) return
    verify();
  }, [isAllDataOfflineVerified]);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Starter");
  };

  const verify = async () => {
    if (!token) return navigation.navigate("Starter");

    updateUserVersion();
    await verifyNotification();
    
    try {
      await updateUserSubjects();
      updateImportantDates();
      updateUFSCarBalance();
      updateActivities();
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

  const updateUserVersion = async () => {
    let userVersion = user?.userVersion;

    if (!user) {
      const { user } = await apiClient.getMe(token!);
      userVersion = user.userVersion;
      setUser(user);
    }

    if (Constants.expoConfig?.version !== userVersion) {
      await apiClient.updateMe(
        { userVersion: Constants.expoConfig?.version },
        token!
      );
    }
  };

  const verifyNotification = async () => {
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
      }
    }
  }

  const updateUserSubjects = async () => {
    if (!userSubjects.length) {
      const userSubjects = (
        await apiClient.getUserSubjects(token!)
      ).userSubjects.map((userSubject) => {
        return { ...userSubject };
      });

      setUserSubjects(userSubjects);
    }
  }


  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Logo />
    </DefaultBackground>
  );
};

export default Verification;
