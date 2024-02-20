import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";

const DriveList = () => {
  const navigation = useNavigation();

  const handleDriveViewPress = () => {
    // @ts-ignore
    navigation.navigate("DriveList");
  };

  return (
    <>
      <DefaultBackground>
        <Title>Cálculo II</Title>
        <Paragraph>2 Materiais Disponíveis</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          <Card
            title="Prova do 1º Bimestre"
            color="#3B005F"
            buttonsTexts={["Visualizar"]}
            buttonsOnPress={[handleDriveViewPress]}
            buttonsColors={["#58008E"]}
          />
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default DriveList;
