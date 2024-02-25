import styled from "styled-components/native";
import theme from "../../config/theme";
import DefaultBackground from "../../components/DefaultBackground";
import React from "react";
import { Tag } from "../Groups/component/GroupsTagsSelector";
import Markdown from "react-native-markdown-display";
import { Linking, ScrollView, TouchableOpacity } from "react-native";
import { GroupLink, GroupTag } from "../../types/Group";

const GroupContainer = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  gap: 12px;
`;

const GroupImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
`;

const GroupTitle = styled.Text`
  font-size: 18px;
  font-family: Montserrat_700Bold;
  color: white;
`;

const TagsView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const Group = ({ route }: any) => {
  const { group } = route.params;
  return (
    <DefaultBackground style={{ gap: 12 }}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ gap: 12 }}
      >
        <GroupContainer>
          <GroupImage
            source={{
              uri: group.logo,
            }}
          />
          <GroupTitle>{group.name}</GroupTitle>
          <TagsView>
            {group.tags.map((tag: GroupTag) => (
              <Tag
                key={`group-${group.id}-tag-${tag.id}`}
                text={tag.name}
                textStyle={{ fontSize: 9 }}
              />
            ))}
          </TagsView>
        </GroupContainer>
        <GroupContainer>
          <Markdown
            style={{
              body: {
                color: theme.colors.gray.gray4,
                fontFamily: "Montserrat_400Regular",
                width: "100%",
              },
              heading1: {
                color: "white",
                fontSize: 24,
                fontFamily: "Montserrat_700Bold",
              },
              heading2: {
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat_700Bold",
              },
            }}
          >
            {group.fullDescription}
          </Markdown>
        </GroupContainer>
        {group.links ? (
          <GroupContainer>
            <GroupTitle>Links</GroupTitle>
            <TagsView>
              {group.links.map((link: GroupLink) => (
                <TouchableOpacity
                  key={`group-${group.id}-link-${link.id}`}
                  onPress={() => Linking.openURL(link.link)}
                >
                  <Tag text={link.name} textStyle={{ fontSize: 9 }} />
                </TouchableOpacity>
              ))}
            </TagsView>
          </GroupContainer>
        ) : null}
      </ScrollView>
    </DefaultBackground>
  );
};

export default Group;
