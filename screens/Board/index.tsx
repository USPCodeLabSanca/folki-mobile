import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import  BoardComponents from "./Components";
import ButtonsNavigation from "../../components/ButtonsNavigation";

const Board = () => {
  return (
      <DefaultBackground>
        <Title>Mural</Title>
        <Paragraph>Fale o que quiser para a USP</Paragraph>
        <BoardComponents />
      </DefaultBackground>
  );
}

export default Board;