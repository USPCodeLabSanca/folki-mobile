import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import NewAbsenceModal from "./components/NewAbsenceModal";

const Absences = () => {
  const [isNewAbsenceModalOpen, setIsNewAbsenceModalOpen] = useState(false);
  const navigation = useNavigation();

  const handleAbsenceViewPress = () => {
    // @ts-ignore
    navigation.navigate("AbsenceList");
  };

  return (
    <>
      <DefaultBackground>
        <Title>Faltas</Title>
        <Paragraph>Ainda posso faltar?</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          <Card
            title="Cálculo II"
            color="#3B005F"
            lines={["2 Faltas"]}
            buttonsTexts={["Adicionar Falta", "Ver Faltas"]}
            buttonsOnPress={[
              () => setIsNewAbsenceModalOpen(true),
              handleAbsenceViewPress,
            ]}
            buttonsColors={["#58008E", "#58008E"]}
          />
          <Card
            title="Cálculo II"
            color="#3B005F"
            lines={["2 Faltas"]}
            buttonsTexts={["Adicionar Falta", "Ver Faltas"]}
            buttonsOnPress={[() => {}, () => {}]}
            buttonsColors={["#58008E", "#58008E"]}
          />
          <Card
            title="Cálculo II"
            color="#3B005F"
            lines={["2 Faltas"]}
            buttonsTexts={["Adicionar Falta", "Ver Faltas"]}
            buttonsOnPress={[() => {}, () => {}]}
            buttonsColors={["#58008E", "#58008E"]}
          />
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
      <NewAbsenceModal
        isOpen={isNewAbsenceModalOpen}
        onClose={() => setIsNewAbsenceModalOpen(false)}
      />
    </>
  );
};

export default Absences;
