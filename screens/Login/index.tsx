import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
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
import { Platform, View } from "react-native";
import theme from "../../config/theme";
import generateUFSCarToken from "../../utils/generateUFSCarToken";

const FormView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const textMap = {
  1: "Número USP",
  2: "RA",
};

const Login = () => {
  const [universityId, setUniversityId] = useState(0);
  const [uspCode, setUspCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    setUser,
    setUserActivities,
    setUserSubjects,
    updateToken,
    updateUFSCarBalance,
  } = useUser();
  const navigation = useNavigation();

  const clearFields = () => {
    setUspCode("");
    setPassword("");
    setUniversityId(0);
    setLoading(false);
  };

  const saveUFSCarAuthToken = async (uspCode: string, password: string) => {
    if (!(await SecureStore.isAvailableAsync())) return;
    await SecureStore.setItemAsync(
      "ufscar-auth",
      generateUFSCarToken(uspCode, password)
    );
  };

  const handleSendEmailButton = async () => {
    setLoading(true);

    try {
      const response = await apiClient.sendJupiterWeb(
        uspCode,
        password,
        universityId
      );
      const { userSubjects } = await apiClient.getUserSubjects(response.token);
      const { activities } = await apiClient.getUserActivities(response.token);
      const { user } = await apiClient.getMe(response.token!);

      updateToken(response.token);
      setUser(user);
      setUserSubjects(userSubjects);
      setUserActivities(activities);

      if (universityId === 2) await saveUFSCarAuthToken(uspCode, password);

      await updateUFSCarBalance();

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

  if (!universityId)
    return (
      <DefaultBackground
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Title style={{ textAlign: "center" }}>Qual sua Universidade?</Title>
        <View style={{ gap: 12, width: "100%" }}>
          <Button
            text="USP"
            style={{ backgroundColor: theme.colors.gray.gray2, width: "100%" }}
            onPress={() => setUniversityId(1)}
          />
          <Button
            text="UFSCar"
            style={{ backgroundColor: theme.colors.gray.gray2, width: "100%" }}
            onPress={() => setUniversityId(2)}
          />
        </View>
      </DefaultBackground>
    );

  return (
    <DefaultBackground>
      <FormView>
        <Title>Login</Title>
        <Paragraph style={{ textAlign: "center" }}>
          {/* @ts-ignore */}
          Insira seu {textMap[universityId]} e sua senha única para a integração
          com o Folki. Não salvamos suas credenciais em nuvem.
        </Paragraph>
        <Input
          /* @ts-ignore */
          placeholder={textMap[universityId]}
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
          Criado <BlueColorText>Livre</BlueColorText> por{" "}
          <BlueColorText>CodeLab Sanca</BlueColorText>
        </ButtonViewText>
      </FormView>
    </DefaultBackground>
  );
};

export default Login;
