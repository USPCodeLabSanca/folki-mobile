import React from "react";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import { View } from "react-native";

interface TagProps {
  text: string;
  color?: string;
  textColor?: string;
  style?: any;
  textStyle?: any;
}

const Container = styled.ScrollView`
  flex-grow: 0;
`;

const TagContainer = styled.View`
  padding: 8px 16px;
  border-radius: 8px;
`;

const TagText = styled.Text`
  font-family: Montserrat_600SemiBold;
  font-size: 12px;
`;

export const Tag = ({ text, color, textColor, style, textStyle }: TagProps) => {
  return (
    <View>
      <TagContainer
        style={[
          { backgroundColor: color || theme.colors.purple.primary },
          style,
        ]}
      >
        <TagText style={[{ color: textColor || "white" }, textStyle]}>
          {text}
        </TagText>
      </TagContainer>
    </View>
  );
};

const GroupsTagsSelector = () => {
  return (
    <Container contentContainerStyle={{ gap: 8 }} horizontal>
      <Tag text="São Carlos" />
      <Tag text="Computação" />
      <Tag
        text="Adicionar Tag"
        color={theme.colors.gray.gray2}
        textColor={theme.colors.gray.gray4}
      />
    </Container>
  );
};

export default GroupsTagsSelector;
