import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Button from "../../components/Button";
import theme from "../../config/theme";

const Settings = ({ navigation }: any) => {
  const onPressContact = () => {
    navigation.navigate("Contact" as never);
  };

  const onPressUpdate = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <>
      <DefaultBackground>
        <Title>Configurações</Title>
        <Paragraph>Configurações do Folki</Paragraph>
        <ScrollView contentContainerStyle={{ flex: 1, gap: 12 }}>
          <Button
            text="Contato"
            style={{ backgroundColor: theme.colors.gray.gray2 }}
            onPress={onPressContact}
          />
          <Button
            text="Atualizar Disciplinas"
            style={{ backgroundColor: theme.colors.gray.gray2 }}
            onPress={onPressUpdate}
          />
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Settings;
