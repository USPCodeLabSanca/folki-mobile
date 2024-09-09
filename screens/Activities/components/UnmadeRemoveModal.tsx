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
import Paragraph from "../../../components/Paragraph";
import YesOrNoModal from "../../../components/YesOrNoModal";

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
  handleYes: () => void;
  handleCancel: () => void;
  onClose: () => void;
}

const UnmadeRemoveModal = ({
  handleYes,
  handleCancel,
  onClose,
}: NewAbsenceModalProps) => {
  return (
    <YesOrNoModal
      title={"Tem Certeza?"}
      paragraph={
        "Ao desfazer a remoção dessa atividade pública, todos os seus colegas de turma terão a atividade reativada. Tem certeza?"
      }
      handleYes={handleYes}
      handleCancel={handleCancel}
      onClose={onClose}
    />
  );
};

export default UnmadeRemoveModal;
