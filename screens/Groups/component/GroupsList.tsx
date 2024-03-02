import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import { View } from "react-native";
import { Tag } from "./GroupsTagsSelector";
import Group from "../../../types/Group";

const Container = styled.ScrollView`
  flex: 1;
  margin-top: 12px;
`;

const GroupContainer = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray2};
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const GroupContainerHorizontal = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const GroupImage = styled.Image`
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 100px;
`;

const GroupTitle = styled.Text`
  font-size: 16px;
  font-family: Montserrat_700Bold;
  color: white;
  margin-bottom: 6px;
`;

const GroupDescription = styled.Text`
  font-size: 12px;
  font-family: Montserrat_400Regular;
  color: ${theme.colors.gray.gray4};
  flex-wrap: wrap;
  flex-shrink: 1;
`;

const TagsView = styled.View`
  flex-direction: row;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 6px;
`;

interface GroupProps {
  group: Group;
  onPress: () => void;
}

const GroupComponent = ({ group, onPress }: GroupProps) => {
  return (
    <GroupContainer onPress={onPress}>
      <GroupContainerHorizontal>
        <GroupImage
          source={{
            uri: group.logo,
          }}
        />
        <View style={{ flex: 1 }}>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupDescription>{group.shortDescription}</GroupDescription>
        </View>
      </GroupContainerHorizontal>
      <TagsView>
        {group.tags.map((tag) => (
          <Tag
            key={`group-${group.id}-tag-${tag.id}`}
            text={tag.name}
            style={{ padding: 2 }}
            textStyle={{ fontSize: 10 }}
          />
        ))}
      </TagsView>
    </GroupContainer>
  );
};

interface GroupsListProps {
  groups: Group[];
}

const GroupsList = ({ groups }: GroupsListProps) => {
  const navigation = useNavigation();

  const handleGroup = (group: Group) => {
    // @ts-ignore
    navigation.navigate("Group", { group });
  };

  return (
    <Container contentContainerStyle={{ gap: 12 }}>
      {groups.map((group) => (
        <GroupComponent
          key={`group-${group.id}`}
          group={group}
          onPress={() => handleGroup(group)}
        />
      ))}
    </Container>
  );
};

export default GroupsList;
