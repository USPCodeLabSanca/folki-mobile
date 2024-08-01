import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Ionicons from "@expo/vector-icons/Ionicons";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { Linking, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import theme from "../../config/theme";

const ContactView = styled.View`
  flex: 1;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const ContactImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

const IconsView = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const Contact = ({ navigation }: any) => {
  return (
    <>
      <DefaultBackground>
        <Title>Contato</Title>
        <ContactView>
          <ContactImage
            source={{
              uri: "https://avatars.githubusercontent.com/u/25728217?v=4",
            }}
          />
          <Paragraph
            style={{ color: theme.colors.gray.gray4, marginBottom: 0 }}
          >
            Yuri Faria - Criador do Folki
          </Paragraph>
          <IconsView>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://windows87.github.io")}
            >
              <Ionicons name="globe-outline" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://wa.me/5535992521113")}
            >
              <Ionicons name="logo-whatsapp" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://instagram.com/theyurifaria")
              }
            >
              <Ionicons name="logo-instagram" size={26} color="white" />
            </TouchableOpacity>
          </IconsView>
        </ContactView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Contact;
