import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";

const Week = () => {
  return (
    <>
      <DefaultBackground>
        <Title>Semana</Title>
        <Paragraph>Suas aulas aqui ;)</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}></ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Week;
