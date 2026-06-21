import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import GroupsTagsSelector from "./component/GroupsTagsSelector";
import GroupsList from "./component/GroupsList";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Group from "../../types/Group";
import { useScreenTracking } from "../../hooks/useScreenTracking";

const Groups = () => {
  useScreenTracking("Groups");
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user, token } = useUser();
  const navHook = useNavigation();

  const getGroups = async () => {
    try {
      const groups = await apiClient.getGroups(
        user!.institute!.campusId!.toString(),
        token!,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 12,
            marginBottom: 12,
            height: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navHook.goBack()}
            style={{ marginTop: -3 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Title>Grupos!</Title>
        </View>
        <Paragraph>Encontre sua cara-metade</Paragraph>
        {loading ? (
          <View style={{ flex: 1 }}>
            <Paragraph>Carregando...</Paragraph>
          </View>
        ) : (
          <GroupsList groups={groups} />
        )}
      </DefaultBackground>
    </>
  );
};

export default Groups;
