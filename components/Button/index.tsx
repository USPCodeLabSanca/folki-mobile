import React from "react";
import { TouchableOpacity, Text, DimensionValue } from "react-native";
import styled from "styled-components/native";
import theme from "../../config/theme";

interface ButtonProps {
  text: string;
  width?: DimensionValue;
  onPress?: () => void;
  disabled?: boolean;
  disabledStyle?: boolean;
  style?: any;
  styleText?: any;
  numberOfLines?: number;
  fontSize?: number;
}

interface TextButtonProps {
  fontSize?: number;
}

const TouchableButton = styled.TouchableOpacity`
  background-color: ${theme.colors.purple.primary};
  padding: 12px 28px;
  border-radius: 100px;
`;

const TextButton = styled.Text<TextButtonProps>`
  color: white;
  font-size: ${({ fontSize }) => fontSize ?? 14}px;
  font-family: Montserrat_600SemiBold;
  text-align: center;
`;

const Button = ({
  text,
  width,
  disabled,
  disabledStyle,
  style,
  styleText,
  numberOfLines,
  onPress,
  fontSize,
}: ButtonProps) => {
  return (
    <TouchableButton
      disabled={disabled}
      style={[
        {
          width,
          backgroundColor:
            disabled || disabledStyle
              ? theme.colors.gray.gray3
              : theme.colors.purple.primary,
        },
        style,
      ]}
      onPress={onPress}
    >
      <TextButton numberOfLines={numberOfLines} style={styleText} fontSize={fontSize}>
        {text}
      </TextButton>
    </TouchableButton>
  );
};

export default Button;
