import Constants from "expo-constants";
import { useEffect } from "react";
import { getPlayerId } from "../../services/oneSignal";

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

    await updateUserVersion();
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
    const playerId = await getPlayerId();
      
    if (playerId) {
      await apiClient.updateMe(
        { notificationId: playerId },
        token!
      );
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
