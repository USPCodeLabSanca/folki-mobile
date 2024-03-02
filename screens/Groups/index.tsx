import React, { useEffect } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import GroupsTagsSelector from "./component/GroupsTagsSelector";
import GroupsList from "./component/GroupsList";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Group from "../../types/Group";
import { View } from "react-native";

const Groups = () => {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user, token } = useUser();

  const getGroups = async () => {
    try {
      const groups = await apiClient.getGroups(
        user!.institute!.campusId!.toString(),
        token!
      );
      setGroups(groups);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <DefaultBackground>
        <Title>Grupos!</Title>
        <Paragraph>Encontre sua cara-metade</Paragraph>
        {loading ? (
          <View style={{ flex: 1 }}>
            <Paragraph>Carregando...</Paragraph>
          </View>
        ) : (
          <GroupsList groups={groups} />
        )}
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Groups;
