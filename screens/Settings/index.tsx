import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { Linking, ScrollView, Share } from "react-native";
import Button from "../../components/Button";
import theme from "../../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext";

const Settings = ({ navigation }: any) => {
  const { user } = useUser();

  const onPressContact = () => {
    navigation.navigate("Contact" as never);
  };

  const onPressUpdate = () => {
    navigation.navigate("Login" as never);
  };

  const onPressOpenSource = () => {
    Linking.openURL("https://github.com/USPCodeLabSanca/folki-mobile");
  };

  const onPressShareApp = () => {
    Share.share({
      message: `Se inscreve aí no Folki e bora se organizar na ${user?.university?.slug} junto! ;)\n\nhttps://folki.com.br`,
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Starter");
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
          <Button
            text="Open Source"
            style={{ backgroundColor: theme.colors.gray.gray2 }}
            onPress={onPressOpenSource}
          />
          <Button
            text="Compartilhar App ;)"
            style={{ backgroundColor: theme.colors.gray.gray2 }}
            onPress={onPressShareApp}
          />
          <Button
            text="Sair"
            style={{ backgroundColor: theme.colors.gray.gray2 }}
            onPress={logout}
          />
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Settings;
