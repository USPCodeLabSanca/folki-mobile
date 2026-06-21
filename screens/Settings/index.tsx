import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DefaultBackground from "../../components/DefaultBackground";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import { Linking, ScrollView, Share } from "react-native";
import Button from "../../components/Button";
import theme from "../../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext";
import mixpanel from "../../services/mixpanel";
import { useScreenTracking } from "../../hooks/useScreenTracking";

const Settings = ({ navigation }: any) => {
  useScreenTracking("Settings");
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
    mixpanel.track("App Shared", {
      university: user?.university?.slug,
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    mixpanel.reset();
    mixpanel.track("Logout");
    navigation.navigate("Starter");
  };

  return (
    <>
      <DefaultBackground>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 12,
            marginBottom: 12,
            height: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: -3 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Title>Configurações</Title>
        </View>
        <Paragraph>Configurações do Folki</Paragraph>
        <ScrollView contentContainerStyle={{ flex: 1, gap: 12 }}>
          <Button
            text="Contato e Time"
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
      </DefaultBackground>
    </>
  );
};

export default Settings;
