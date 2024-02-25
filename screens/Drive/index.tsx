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

const Drive = () => {
  const { userSubjects } = useUser();
  const navigation = useNavigation();

  const handleDriveViewPress = (subject: Subject) => {
    // @ts-ignore
    navigation.navigate("DriveList", { subject });
  };

  return (
    <>
      <DefaultBackground>
        <Title>Drive</Title>
        <Paragraph>Se preparando melhor</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {userSubjects.map((userSubject: UserSubject) => (
            <Card
              key={userSubject.subject.id}
              title={userSubject.subject.name}
              color="#3B005F"
              lines={[
                `${userSubject.subject.driveItemsNumber} Materi${
                  userSubject.subject.driveItemsNumber === 1 ? "al" : "ais"
                } Disponíve${
                  userSubject.subject.driveItemsNumber === 1 ? "l" : "is"
                }`,
              ]}
              buttonsTexts={["Visualizar"]}
              buttonsOnPress={[() => handleDriveViewPress(userSubject.subject)]}
              buttonsColors={["#58008E"]}
            />
          ))}
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Drive;
