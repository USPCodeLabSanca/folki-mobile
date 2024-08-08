import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Input from "../../components/Input";
import Button from "../../components/Button";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import { useUser } from "../../contexts/UserContext";
import {
  BlueColorText,
  ButtonViewText,
} from "../Starter/components/ButtonView";
import styled from "styled-components/native";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const FormView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Login = () => {
  const [uspCode, setUspCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setUserActivities, setUserSubjects, updateToken } =
    useUser();
  const navigation = useNavigation();

  const saveLogin = async (uspCode: string, password: string) => {
    await SecureStore.setItemAsync("uspCode", uspCode);
    await SecureStore.setItemAsync("password", password);
  };

  const clearFields = () => {
    setUspCode("");
    setPassword("");
    setLoading(false);
  };

  const handleSendEmailButton = async () => {
    setLoading(true);

    try {
      const response = await apiClient.sendJupiterWeb(uspCode, password);
      const { userSubjects } = await apiClient.getUserSubjects(response.token);
      const { activities } = await apiClient.getUserActivities(response.token);

      updateToken(response.token);
      setUser(response.user);
      setUserSubjects(userSubjects);
      setUserActivities(activities);

      if (Platform.OS !== "web") await saveLogin(uspCode, password);

      clearFields();

      // @ts-ignore
      navigation.navigate("Home" as never);
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
  };

  return (
    <DefaultBackground>
      <FormView>
        <Title>Login</Title>
        <Paragraph>
          Insira seu Número USP e sua senha única para a integração com o Folki.
          Não guardamos suas credenciais na nuvem.
        </Paragraph>
        <Input
          placeholder="Número USP"
          inputMode="numeric"
          autoCapitalize="none"
          value={uspCode}
          onChangeText={setUspCode}
          style={{ width: "100%" }}
        />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          style={{ width: "100%" }}
        />
        <Button
          text={loading ? "Entrando..." : "Entrar"}
          width="100%"
          disabled={!uspCode || !password || loading}
          onPress={handleSendEmailButton}
        />
        <ButtonViewText>
          Criado <BlueColorText>Open Source</BlueColorText> por{" "}
          <BlueColorText>USPCodeLab</BlueColorText>
        </ButtonViewText>
      </FormView>
    </DefaultBackground>
  );
};

export default Login;
