import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SetName = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleNameButton = () => {
    navigation.navigate("SelectCampus" as never);
  };

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
        text="Continuar"
        width="100%"
        disabled={!name}
        onPress={handleNameButton}
      />
    </DefaultBackground>
  );
};

export default SetName;
