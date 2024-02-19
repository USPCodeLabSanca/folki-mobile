import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Input from "../../components/Input";
import Button from "../../components/Button";
import verifyIfUspEmailIsValid from "../../utils/verifyIfUspEmailIsValid";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendEmailButton = () => {
    // @ts-ignore
    navigation.navigate("AuthCode", { email });
  };

  return (
    <DefaultBackground>
      <Title>Qual seu E-mail?</Title>
      <Paragraph>
        Insira seu e-mail abaixo para enviarmos um código para validar o seu
        cadastro.
      </Paragraph>
      <View style={{ flex: 1 }}>
        <Input
          placeholder="email@usp.br"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        text="Continuar"
        width="100%"
        disabled={!verifyIfUspEmailIsValid(email)}
        onPress={handleSendEmailButton}
      />
    </DefaultBackground>
  );
};

export default SendEmail;
