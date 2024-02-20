import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import GroupsTagsSelector from "./component/GroupsTagsSelector";
import GroupsList from "./component/GroupsList";

const Groups = () => {
  return (
    <>
      <DefaultBackground>
        <Title>Grupos!</Title>
        <Paragraph>Encontre sua cara-metade</Paragraph>
        <GroupsTagsSelector />
        <GroupsList />
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Groups;
