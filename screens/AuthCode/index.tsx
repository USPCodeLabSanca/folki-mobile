import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import apiClient from "../../clients/apiClient";
import SendEmailAgain from "./components/SendEmailAgain";
import Toast from "react-native-toast-message";
import { useUser } from "../../contexts/UserContext";

const AuthCode = ({ route }: any) => {
  const { email } = route.params;
  const { setUser, setUserActivities, setUserSubjects, updateToken } =
    useUser();

  const [authCode, setAuthCode] = useState("");
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const sendAuthCode = async () => {
    try {
      const response = await apiClient.sendAuthCode(email);
      setUserId(response.userId);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
  };

  const verifyAuthCode = async () => {
    setLoading(true);

    try {
      const response = await apiClient.verifyAuthCode(userId, authCode);
      const { userSubjects } = await apiClient.getUserSubjects(response.token);
      const { activities } = await apiClient.getUserActivities(response.token);

      updateToken(response.token);
      setUser(response.user);
      setUserSubjects(userSubjects);
      setUserActivities(activities);

      const { user } = response;

      if (user.name === user.email)
        return navigation.navigate("SetName" as never);
      if (!user.instituteId || !user.courseId || !userSubjects.length)
        return navigation.navigate("SelectCampus" as never);

      navigation.navigate("Home" as never);
    } catch (error: any) {
      setAuthCode("");
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    sendAuthCode();
  }, []);

  const handleAuthCodeButton = () => {
    verifyAuthCode();
  };

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Title>Código!</Title>
      <Paragraph>
        Enviamos um código para o seu e-mail. Insira-o abaixo para validar o seu
        cadastro.
      </Paragraph>
      <View style={{ width: "100%" }}>
        <Input
          placeholder="000000"
          autoComplete="off"
          inputMode="numeric"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={6}
          value={authCode}
          onChangeText={setAuthCode}
        />
      </View>
      <SendEmailAgain onPress={sendAuthCode} />
      <Button
        text={loading ? "..." : "Continuar"}
        width="100%"
        disabled={loading || authCode.length !== 6 || !userId}
        onPress={handleAuthCodeButton}
      />
    </DefaultBackground>
  );
};

export default AuthCode;
