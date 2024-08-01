import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from "styled-components/native";
import theme from "../../../config/theme";

const FloatRightContainer = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  bottom: 110px;
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.purple.primary};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  z-index: 1;
`;

interface FloatRightProps {
  onPress: () => void;
  isCalendarOpen: boolean;
}

const FloatRight = ({ onPress, isCalendarOpen }: FloatRightProps) => (
  <FloatRightContainer onPress={onPress}>
    <Ionicons
      name={isCalendarOpen ? "list" : "calendar"}
      size={24}
      color="white"
    />
  </FloatRightContainer>
);

export default FloatRight;
