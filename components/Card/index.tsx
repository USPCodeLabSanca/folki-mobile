import React from "react";
import styled from "styled-components/native";

interface CardProps {
  title: string;
  color: string;
  lines: string[];
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

const Card = ({ title, color, lines }: CardProps) => {
  return (
    <CardContainer style={{ backgroundColor: color }}>
      <CardTitle>{title}</CardTitle>
      {lines.map((line) => (
        <CardLine key={line}>{line}</CardLine>
      ))}
    </CardContainer>
  );
};

export default Card;
