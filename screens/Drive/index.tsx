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
import Subject from "../../types/Subject";
import NewDriveModal from "./components/NewDriveModal";

const Drive = () => {
  const { userSubjects } = useUser();
  const navigation = useNavigation();

  const [subjectIdDriveModalOpen, setSubjectIdDriveModalOpen] = useState(0);

  const handleDriveViewPress = (subject: Subject) => {
    // @ts-ignore
    navigation.navigate("DriveList", { subject });
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
        <Title>Drive</Title>
        <Paragraph>Se preparando melhor</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {removeDuplicates(userSubjects).map((userSubject: UserSubject) => (
            <Card
              key={userSubject.subjectClass.subject.id}
              title={userSubject.subjectClass.subject.name}
              color="#3B005F"
              lines={[
                `${userSubject.subjectClass.subject.driveItemsNumber} Materi${
                  userSubject.subjectClass.subject.driveItemsNumber === 1
                    ? "al"
                    : "ais"
                } Disponíve${
                  userSubject.subjectClass.subject.driveItemsNumber === 1
                    ? "l"
                    : "is"
                }`,
              ]}
              buttonsTexts={["Visualizar", "Adicionar"]}
              buttonsOnPress={[
                () => handleDriveViewPress(userSubject.subjectClass.subject),
                () =>
                  setSubjectIdDriveModalOpen(
                    userSubject.subjectClass.subject.id
                  ),
              ]}
              buttonsColors={["#58008E", "#58008E"]}
            />
          ))}
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
      <NewDriveModal
        subjectId={subjectIdDriveModalOpen}
        onClose={() => setSubjectIdDriveModalOpen(0)}
      />
    </>
  );
};

export default Drive;
