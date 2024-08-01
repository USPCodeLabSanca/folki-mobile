import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Input from "../../components/Input";
import Button from "../../components/Button";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [uspCode, setUspCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setUserActivities, setUserSubjects, updateToken } =
    useUser();
  const navigation = useNavigation();

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
      <Title>Login</Title>
      <Paragraph>
        Insira seu Número USP e sua senha do JupiterWeb para acessar o
        aplicativo. Não guardamos suas credenciais.
      </Paragraph>
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Número USP"
          inputMode="numeric"
          autoCapitalize="none"
          value={uspCode}
          onChangeText={setUspCode}
        />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        text={loading ? "Carregando..." : "Entrar"}
        width="100%"
        disabled={!uspCode || !password || loading}
        onPress={handleSendEmailButton}
      />
    </DefaultBackground>
  );
};

export default Login;
