import Constants from "expo-constants";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Toast from "react-native-toast-message";
import apiClient from "../../clients/apiClient";
import DefaultBackground from "../../components/DefaultBackground";
import Logo from "../../components/Logo";
import { useUser } from "../../contexts/UserContext";
import { Platform } from "react-native";

const parseTargetFromHash = () => {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return { screen: null, params: null };
  }

  const hash = window.location.hash;
  
  if (!hash || !hash.includes('#/')) {
    return { screen: null, params: null };
  }

  const path = hash.substring(2);
  const [screen, query] = path.split('?');

  if (!screen || screen === 'Verification') {
    return { screen: null, params: null };
  }

  if (!query) {
    return { screen, params: null };
  }

  const params = new URLSearchParams(query);
  const paramObj: any = {};
  params.forEach((value, key) => {
    paramObj[key] = value;
  });

  return { screen, params: paramObj };
};

const preserveHashInUrl = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (hash) {
      window.location.hash = hash;
    }
  }
};

const Verification = ({ navigation }: any) => {
  const {
    setUser,
    setUserSubjects,
    updateImportantDates,
    updateUFSCarBalance,
    updateActivities,
    user,
    token,
    isAllDataOfflineVerified,
  } = useUser();

  const [targetScreen, setTargetScreen] = useState<string | null>(null);
  const [targetParams, setTargetParams] = useState<any>(null);

  useEffect(() => {
    const checkHash = () => {
      const { screen, params } = parseTargetFromHash();
      setTargetScreen(screen);
      setTargetParams(params);
    };

    checkHash();

    if (Platform.OS === 'web') {
      window.addEventListener('hashchange', checkHash);
      return () => window.removeEventListener('hashchange', checkHash);
    }
  }, []);

  useEffect(() => {
    if (!isAllDataOfflineVerified) return;
    verify();
  }, [isAllDataOfflineVerified]);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Starter");
  };

  const navigateToTarget = () => {
    if (targetScreen) {
      preserveHashInUrl();
      navigation.navigate(targetScreen, targetParams);
    } else {
      navigation.navigate("Home");
    }
  };

  const handleVerificationError = (error: any) => {
    if (error.status === 401) {
      return logout();
    }

    Toast.show({
      type: "error",
      text1: error.title,
      text2: error.message,
    });
  };

  const verify = async () => {
    if (!token) return navigation.navigate("Starter");

    updateUserVersion();

    try {
      await updateUserSubjects();
      updateImportantDates();
      updateUFSCarBalance();
      updateActivities();
      navigateToTarget();
    } catch (error: any) {
      handleVerificationError(error);
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

  const updateUserSubjects = async () => {
    const userSubjects = (
      await apiClient.getUserSubjects(token!)
    ).userSubjects.map((userSubject) => {
      return { ...userSubject };
    });

    setUserSubjects(userSubjects);
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
