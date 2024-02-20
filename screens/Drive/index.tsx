import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";

const Drive = () => {
  const navigation = useNavigation();

  const handleDriveViewPress = () => {
    // @ts-ignore
    navigation.navigate("DriveList");
  };

  return (
    <>
      <DefaultBackground>
        <Title>Drive</Title>
        <Paragraph>Se preparando melhor</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          <Card
            title="Cálculo II"
            color="#3B005F"
            lines={["2 Materiais Disponíveis"]}
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

export default Drive;
