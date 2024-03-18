import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { TouchableOpacity } from "react-native";
import DateInput from "../../../components/DateInput";
import Toast from "react-native-toast-message";
import apiClient from "../../../clients/apiClient";
import { useUser } from "../../../contexts/UserContext";

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
  const { token, userSubjects, setUserSubjects } = useUser();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDate(undefined);
    setLoading(false);
  }, [subjectId]);

  const updateAbsences = () => {
    const newUserSubjects = userSubjects.map((userSubjectItem) => {
      if (userSubjectItem.subject.id === subjectId) {
        return {
          ...userSubjectItem,
          absences: userSubjectItem.absences + 1,
        };
      }
      return userSubjectItem;
    });

    setUserSubjects(newUserSubjects);
  };

  const handleAddAbsence = async () => {
    if (!date) return;

    setLoading(true);
    try {
      await apiClient.createAbsence(subjectId.toString(), date, token!);
      updateAbsences();
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
      <AbsenceModalContainer>
        <Title>Adicionar Falta</Title>
        <DateInput value={date} onChangeValue={setDate} />
        <Button
          onPress={handleAddAbsence}
          text={loading ? "..." : "Adicionar"}
          disabled={!date || loading}
        />
      </AbsenceModalContainer>
    </Container>
  );
};

export default NewAbsenceModal;
