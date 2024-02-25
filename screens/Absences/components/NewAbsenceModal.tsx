import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import Title from "../../../components/Title";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { TouchableOpacity } from "react-native";

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

const AbsenceModalContainer = styled.View`
  background-color: ${theme.colors.gray.gray1};
  width: 90%;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

interface NewAbsenceModalProps {
  subjectId: number;
  onClose: () => void;
}

const NewAbsenceModal = ({ subjectId, onClose }: NewAbsenceModalProps) => {
  if (!subjectId) return null;

  return (
    <Container>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={onClose}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
      <AbsenceModalContainer>
        <Title>Adicionar Falta</Title>
        <Input placeholder="Data" style={{ width: "100%" }} />
        <Button text="Adicionar" onPress={onClose} />
      </AbsenceModalContainer>
    </Container>
  );
};

export default NewAbsenceModal;
