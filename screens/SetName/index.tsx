import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { BackHandler, View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Toast from "react-native-toast-message";

const SetName = () => {
  const { token } = useUser();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const updateName = async () => {
    setLoading(true);
    try {
      const response = await apiClient.updateMe({ name }, token!);
      console.log(response);
      navigation.navigate("SelectCampus" as never);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
    setLoading(false);
  };

  const handleNameButton = () => {
    updateName();
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
        BackHandler.exitApp();
      }),
    [navigation]
  );

  return (
    <DefaultBackground>
      <Title>Bem-Vindo!</Title>
      <Paragraph>
        Vamos começar criando sua conta no Folki para você começar a se
        organizar!
      </Paragraph>
      <View style={{ flex: 1 }}>
        <Input
          placeholder="João da Silva"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button
        text={loading ? "..." : "Continuar"}
        width="100%"
        disabled={!name || loading}
        onPress={handleNameButton}
      />
    </DefaultBackground>
  );
};

export default SetName;
