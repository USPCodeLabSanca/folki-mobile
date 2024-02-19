import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import Button from "../../../components/Button";
import React from "react";

const ButtonViewView = styled.View`
  align-items: center;
  width: 100%;
`;

const ButtonViewText = styled.Text`
  font-family: Montserrat_600SemiBold;
  color: white;
  font-size: 12px;
  text-align: center;
  margin-top: 8px;
`;

const ButtonView = () => {
  const navigation = useNavigation();

  const goToEmailPage = () => {
    navigation.navigate("SendEmail" as never);
  };

  return (
    <ButtonViewView>
      <Button text="Entrar" width="90%" onPress={goToEmailPage} />
      <ButtonViewText>Entre com seu Email USP</ButtonViewText>
    </ButtonViewView>
  );
};

export default ButtonView;
