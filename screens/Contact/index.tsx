import React from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import ContactCard from "../../components/ContactCard";
import styled from "styled-components/native";

const ContainerContact = styled.View`
  width: 100%;
  align-items: center;
`;

const Contact = ({ navigation }: any) => {
  const navHook = useNavigation();
  return (
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
          onPress={() => navHook.goBack()}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Time</Title>
      </View>
      <Paragraph>O Time responsável pelo Folki!</Paragraph>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerContact>
          <ContactCard
            name="Yuri Faria"
            role="Fundador - ICMC/USP"
            img="https://avatars.githubusercontent.com/u/25728217?v=4"
            website="https://windows87.github.io"
            email="mailto:yfaria@usp.br"
            linkedin="https://www.linkedin.com/in/yfaria/"
          />

          <ContactCard
            name="Allan Vitor"
            role="Mobile Developer - ICMC/USP"
            img="https://avatars.githubusercontent.com/u/134219205?v=4"
            linkedin="https://www.linkedin.com/in/allan-silva-0802b222a/"
            website="https://github.com/Allanvtr"
            email="mailto:allanvss@usp.br"
          />

          <ContactCard
            name="Bruno Zuffo"
            role="Mobile Developer - ICMC/USP"
            img="https://avatars.githubusercontent.com/u/180791156?v=4"
            linkedin="https://www.linkedin.com/in/bruno-zuffo-10088b216/"
            website="https://github.com/BrunoZuffo"
            email="mailto:brunolazuffo@usp.br"
          />

          <ContactCard
            name="Felipe Skubs"
            role="Backend Developer - ICMC/USP"
            img="https://avatars.githubusercontent.com/u/162647564?v=4"
            email="mailto:skubs130@gmail.com"
            linkedin="https://www.linkedin.com/in/felipe-skubs-oliveira/"
            website="https://github.com/Poueeerr"
          />

          <ContactCard
            name="Prado"
            role="Backend Developer - ICMC/USP"
            img="https://avatars.githubusercontent.com/u/171309545?v=4"
            website="https://github.com/pradoscript"
            linkedin="https://www.linkedin.com/in/pradojoao/"
            email="mailto:pradodev64@gmail.com"
          />

          <ContactCard
            name="Mônica Sousa"
            role="Produto - ICMC/USP"
            img="https://i.imgur.com/EfqzFjI.png"
            website="https://www.linkedin.com/in/monica-sousa03/"
            linkedin="https://www.linkedin.com/in/monica-sousa03/"
            email="mailto:monica.sousa@usp.br"
          />
        </ContainerContact>
      </ScrollView>
    </DefaultBackground>
  );
};

export default Contact;
