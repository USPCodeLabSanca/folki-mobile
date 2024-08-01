import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import NewAbsenceModal from "./components/NewAbsenceModal";
import { useUser } from "../../contexts/UserContext";
import UserSubject from "../../types/UserSubject";
import getSubjectFrequence from "../../utils/getSubjectFrequence";
import SemesterText from "./components/SemesterText";

const Absences = () => {
  const { userSubjects } = useUser();
  const [userSubjectIdAbsenceModalOpen, setUserSubjectIdAbsenceModalOpen] =
    useState(0);
  const navigation = useNavigation();

  const handleAbsenceViewPress = (userSubject: UserSubject) => {
    // @ts-ignore
    navigation.navigate("AbsenceList", { userSubject });
  };

  const removeDuplicates = (userSubjects: UserSubject[]) => {
    return userSubjects.filter(
      (userSubject, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.subjectClass.subject.id === userSubject.subjectClass.subject.id
        )
    );
  };

  return (
    <>
      <DefaultBackground>
        <Title>Faltas</Title>
        <Paragraph>Ainda posso faltar?</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {removeDuplicates(userSubjects).map((userSubject: UserSubject) => (
            <Card
              key={userSubject.subjectClass.subject.id}
              title={userSubject.subjectClass.subject.name}
              color="#3B005F"
              lines={[
                `${userSubject.absences} Falta${
                  userSubject.absences === 1 ? "" : "s"
                } Cadastrada${userSubject.absences === 1 ? "" : "s"}`,
                `Aproximadamente* ${getSubjectFrequence(
                  userSubjects,
                  userSubject
                )}% de Frequência`,
              ]}
              buttonsTexts={["Adicionar Falta", "Ver Faltas"]}
              buttonsOnPress={[
                () => setUserSubjectIdAbsenceModalOpen(userSubject.id!),
                () => handleAbsenceViewPress(userSubject),
              ]}
              buttonsColors={["#58008E", "#58008E"]}
            />
          ))}
          <SemesterText>
            * Calculado com base em um semestre de 17 semanas de aulas completas
          </SemesterText>
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
      <NewAbsenceModal
        userSubjectId={userSubjectIdAbsenceModalOpen}
        onClose={() => setUserSubjectIdAbsenceModalOpen(0)}
      />
    </>
  );
};

export default Absences;
