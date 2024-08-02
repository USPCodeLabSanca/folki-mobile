import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import Button from "../../../components/Button";
import React from "react";

const ButtonViewView = styled.View`
  align-items: center;
  width: 100%;
`;

export const ButtonViewText = styled.Text`
  font-family: Montserrat_600SemiBold;
  color: white;
  font-size: 12px;
  text-align: center;
  margin-top: 8px;
`;

export const BlueColorText = styled.Text`
  color: #5ec8ae;
`;

const ButtonView = () => {
  const navigation = useNavigation();

  const goToLoginPage = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <ButtonViewView>
      <Button text="Entrar" width="90%" onPress={goToLoginPage} />
      <ButtonViewText>
        Criado <BlueColorText>Open Source</BlueColorText> por{" "}
        <BlueColorText>USPCodeLab</BlueColorText>
      </ButtonViewText>
    </ButtonViewView>
  );
};

export default ButtonView;
