import React, { useEffect, useState } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { Linking, ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Subject from "../../types/Subject";
import DriveItem from "../../types/DriveItem";
import { useUser } from "../../contexts/UserContext";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";

const DriveList = ({ route }: { route: { params: { subject: Subject } } }) => {
  const { subject } = route.params;
  const { token } = useUser();

  const [loading, setLoading] = useState(true);
  const [driveItems, setDriveItems] = useState<DriveItem[]>([]);

  useEffect(() => {
    getDriveItems();
  }, []);

  const handleDriveViewPress = (link: string) => {
    Linking.openURL(link);
  };

  const getDriveItems = async () => {
    try {
      const driveItems = await apiClient.getDriveItems(
        subject.id.toString(),
        token!
      );
      setDriveItems(driveItems);
      setLoading(false);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao remover falta",
        text2: error.message,
      });
      console.log(error);
    }
  };

  return (
    <>
      <DefaultBackground>
        <Title>{subject.name}</Title>
        <Paragraph>{`${subject.driveItemsNumber} Materi${
          subject.driveItemsNumber === 1 ? "al" : "ais"
        } Disponíve${subject.driveItemsNumber === 1 ? "l" : "is"}`}</Paragraph>
        {loading ? (
          <Paragraph>Carregando...</Paragraph>
        ) : (
          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {driveItems.map((driveItem: DriveItem) => (
              <Card
                key={driveItem.id}
                title={driveItem.name}
                color="#3B005F"
                buttonsTexts={["Visualizar"]}
                buttonsOnPress={[() => handleDriveViewPress(driveItem.link)]}
                buttonsColors={["#58008E"]}
              />
            ))}
          </ScrollView>
        )}
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default DriveList;
