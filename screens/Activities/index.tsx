import React from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
const Activities = () => {
  const navigation = useNavigation();

  const handleNewActivityPress = () => {
    // @ts-ignore
    navigation.navigate("CreateActivity");
  };

  return (
    <DefaultBackground>
      <Title>Atividades</Title>
      <Paragraph>4 Atividades Restantes!</Paragraph>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        <Button text="Adicionar Atividade" onPress={handleNewActivityPress} />
        <Card
          title="P1"
          color="#10673D"
          lines={["Introdução a Ciências da Computação", "30% da Nota - Terça"]}
        />
        <Card
          title="P1"
          color="#104867"
          lines={["Introdução a Ciências da Computação", "30% da Nota - Terça"]}
        />
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default Activities;
