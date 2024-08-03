import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { useUser } from "../../contexts/UserContext";
import UserSubject from "../../types/UserSubject";
import NewGradeModal from "./components/NewGradeModal";

const Grade = () => {
  const { userSubjects } = useUser();
  const navigation = useNavigation();

  const [subjectIdGradeModalOpen, setSubjectIdGradeModalOpen] = useState(0);

  const handleGradeViewPress = (userSubject: UserSubject) => {
    // @ts-ignore
    navigation.navigate("GradeList", { userSubject: userSubject });
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
        <Title>Notas</Title>
        <Paragraph>Se preparando melhor :)</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {removeDuplicates(userSubjects).map((userSubject: UserSubject) => (
            <Card
              key={userSubject.subjectClass.subject.id}
              title={userSubject.subjectClass.subject.name}
              color={userSubject.grading! >= 5 ? "#076f2c" : "#6f0707"}
              lines={[`Total de ${userSubject.grading!.toFixed(1)} de 10.0`]}
              buttonsTexts={["Visualizar", "Adicionar"]}
              buttonsOnPress={[
                () => handleGradeViewPress(userSubject),
                () => setSubjectIdGradeModalOpen(userSubject.id!),
              ]}
              buttonsColors={[
                userSubject.grading! >= 5 ? "#043816" : "#3c0404",
                userSubject.grading! >= 5 ? "#043816" : "#3c0404",
              ]}
            />
          ))}
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
      <NewGradeModal
        subjectId={subjectIdGradeModalOpen}
        onClose={() => setSubjectIdGradeModalOpen(0)}
      />
    </>
  );
};

export default Grade;
