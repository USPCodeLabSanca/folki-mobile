import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

const AuthCode = () => {
  const [authCode, setAuthCode] = useState("");
  const navigation = useNavigation();

  const handleAuthCodeButton = () => {
    navigation.navigate("SetName" as never);
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
      <Button
        text="Continuar"
        width="100%"
        disabled={authCode.length !== 6}
        onPress={handleAuthCodeButton}
      />
    </DefaultBackground>
  );
};

export default AuthCode;
