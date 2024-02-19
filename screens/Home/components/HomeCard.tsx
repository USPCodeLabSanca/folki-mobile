import React from "react";
import theme from "../../../config/theme";
import styled from "styled-components/native";

interface HomeCardProps {
  title: string;
  children: React.ReactNode;
}

const HomeCardContainer = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  gap: 8px;
`;

const HomeCardTitle = styled.Text`
  font-size: 18px;
  font-family: Montserrat_700Bold;
  color: white;
  margin-bottom: 8px;
`;

const HomeCard = ({ title, children }: HomeCardProps) => {
  return (
    <HomeCardContainer>
      <HomeCardTitle>{title}</HomeCardTitle>
      {children}
    </HomeCardContainer>
  );
};

export default HomeCard;
