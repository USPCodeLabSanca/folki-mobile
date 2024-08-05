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

const GradeModalContainer = styled.View`
  background-color: ${theme.colors.gray.gray1};
  width: 90%;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

interface NewGradeModalProps {
  subjectId: number;
  onClose: () => void;
}

const NewGradeModal = ({ subjectId, onClose }: NewGradeModalProps) => {
  const { token, setUserSubjects } = useUser();
  const [name, setName] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
    setPercentage("");
    setValue("");
    setLoading(false);
  }, [subjectId]);

  const updateGrades = async () => {
    const { userSubjects } = await apiClient.getUserSubjects(token!);
    setUserSubjects(userSubjects);
  };

  const handleAddGrade = async () => {
    if (!value) return;

    setLoading(true);
    try {
      await apiClient.createGradeItem(
        subjectId.toString(),
        name,
        Number(percentage),
        Number(value),
        token!
      );
      await updateGrades();
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
      <GradeModalContainer>
        <Title>Adicionar Nota</Title>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Nome da Atividade (P1, P2, etc.)"
          style={{ width: "100%" }}
        />
        <Input
          value={percentage}
          onChangeText={setPercentage}
          keyboardType="numeric"
          placeholder="Porcentagem na Nota Final (0 a 100)"
          style={{ width: "100%" }}
        />
        <Input
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
          placeholder="Nota da Atividade (0 a 10)"
          style={{ width: "100%" }}
        />
        <Button
          onPress={handleAddGrade}
          text={loading ? "..." : "Adicionar"}
          disabled={!name || !percentage || !value || loading}
        />
      </GradeModalContainer>
    </Container>
  );
};

export default NewGradeModal;
