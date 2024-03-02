import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import apiClient from "../../../clients/apiClient";
import { useUser } from "../../../contexts/UserContext";
import Input from "../../../components/Input";

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const DriveModalContainer = styled.View`
  background-color: ${theme.colors.gray.gray1};
  width: 90%;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

interface NewDriveModalProps {
  subjectId: number;
  onClose: () => void;
}

const NewDriveModal = ({ subjectId, onClose }: NewDriveModalProps) => {
  const { token, userSubjects, setUserSubjects } = useUser();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
    setLink("");
  }, [subjectId]);

  const updateDrives = () => {
    const newUserSubjects = userSubjects.map((userSubjectItem) => {
      if (userSubjectItem.subject.id === subjectId) {
        return {
          ...userSubjectItem,
          subject: {
            ...userSubjectItem.subject,
            driveItemsNumber: userSubjectItem.subject.driveItemsNumber + 1,
          },
        };
      }
      return userSubjectItem;
    });

    setUserSubjects(newUserSubjects);
  };

  const handleAddDrive = async () => {
    if (!link) return;

    setLoading(true);
    try {
      await apiClient.createDriveItem(subjectId.toString(), name, link, token!);
      updateDrives();
      onClose();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.log(error);
      setLoading(false);
    }
  };

  if (!subjectId) return null;

  return (
    <Container>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={onClose}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
      <DriveModalContainer>
        <Title>Adicionar Material</Title>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Nome do Material"
          style={{ width: "100%" }}
        />
        <Input
          value={link}
          onChangeText={setLink}
          placeholder="Link para o Material"
          style={{ width: "100%" }}
        />
        <Button
          onPress={handleAddDrive}
          text={loading ? "..." : "Adicionar"}
          disabled={!name || !link || loading}
        />
      </DriveModalContainer>
    </Container>
  );
};

export default NewDriveModal;
