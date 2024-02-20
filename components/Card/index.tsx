import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Button from "../Button";

interface CardProps {
  title: string;
  color: string;
  lines?: string[];
  buttonsTexts?: string[];
  buttonsOnPress?: (() => void)[];
  buttonsColors?: string[];
}

const CardContainer = styled.View`
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled.Text`
  font-size: 16px;
  font-family: Montserrat_700Bold;
  color: white;
`;

const CardLine = styled.Text`
  font-size: 12px;
  font-family: Montserrat_400Regular;
  color: #d6d6d6;
`;

const Card = ({
  title,
  color,
  lines,
  buttonsTexts,
  buttonsOnPress,
  buttonsColors,
}: CardProps) => {
  return (
    <CardContainer style={{ backgroundColor: color }}>
      <CardTitle>{title}</CardTitle>
      {(lines || []).map((line) => (
        <CardLine key={line}>{line}</CardLine>
      ))}
      {buttonsTexts ? (
        <View style={{ flexDirection: "row", marginTop: 8, gap: 6 }}>
          {buttonsTexts.map((buttonText, index) => (
            <Button
              key={buttonText}
              text={buttonText}
              width="100%"
              onPress={buttonsOnPress![index]}
              style={{
                backgroundColor: buttonsColors![index],
                padding: "0px 0px",
                width: "fit-content",
              }}
              styleText={{ fontSize: 10 }}
            />
          ))}
        </View>
      ) : null}
    </CardContainer>
  );
};

export default Card;
