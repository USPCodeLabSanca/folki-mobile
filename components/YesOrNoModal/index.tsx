import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../config/theme";
import { TouchableOpacity } from "react-native";
import Title from "../Title";
import Paragraph from "../Paragraph";
import Button from "../Button";

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

const YesOrNoModalContainer = styled.View`
  background-color: ${theme.colors.gray.gray1};
  width: 90%;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 16px;
`;

interface YesOrNoModalProps {
  title: string;
  paragraph: string;
  handleYes: () => void;
  handleCancel: () => void;
  onClose: () => void;
}

const YesOrNoModal = ({
  title,
  paragraph,
  handleYes,
  handleCancel,
  onClose,
}: YesOrNoModalProps) => {
  return (
    <Container>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={onClose}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
      <YesOrNoModalContainer>
        <Title>{title}</Title>
        <Paragraph style={{ textAlign: "center" }}>{paragraph}</Paragraph>
        <Buttons>
          <Button onPress={handleYes} text={"Sim"} />
          <Button
            onPress={handleCancel}
            text={"Cancelar"}
            style={{ backgroundColor: theme.colors.gray.gray2 }}
          />
        </Buttons>
      </YesOrNoModalContainer>
    </Container>
  );
};

export default YesOrNoModal;
