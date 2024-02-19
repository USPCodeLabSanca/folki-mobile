import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import React from "react";
import HomeCard from "./components/HomeCard";
import Card from "../../components/Card";
import ButtonsNavigation from "../../components/ButtonsNavigation";

const Home = () => {
  return (
    <DefaultBackground>
      <Title>Olá, Yuri!</Title>
      <Paragraph>Outra segunda na USP!</Paragraph>
      <ScrollView>
        <HomeCard title="Atividades de Hoje">
          <Card
            title="P1"
            color="#10673D"
            lines={["Cálculo II", "30% da Nota"]}
          />
        </HomeCard>
        <HomeCard title="Aulas de Hoje">
          <Card
            title="Cálculo II"
            color="#7500BC"
            lines={["96% de Frequência - 0.8/10"]}
          />
          <Card
            title="Cálculo I"
            color="#7500BC"
            lines={["96% de Frequência - 0.8/10"]}
          />
          <Card
            title="Cálculo III"
            color="#7500BC"
            lines={["96% de Frequência - 0.8/10"]}
          />
        </HomeCard>
        <HomeCard title="Atividades da Semana">
          <Card
            title="P1"
            color="#10673D"
            lines={[
              "Introdução a Ciências da Computação",
              "30% da Nota - Terça",
            ]}
          />
          <Card
            title="P1"
            color="#104867"
            lines={[
              "Introdução a Ciências da Computação",
              "30% da Nota - Terça",
            ]}
          />
        </HomeCard>
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default Home;
