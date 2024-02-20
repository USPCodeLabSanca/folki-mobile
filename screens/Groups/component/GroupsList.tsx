import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import { View } from "react-native";
import { Tag } from "./GroupsTagsSelector";

const Container = styled.ScrollView`
  gap: 8px;
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
  onPress: () => void;
}

const Group = ({ onPress }: GroupProps) => {
  return (
    <GroupContainer onPress={onPress}>
      <GroupContainerHorizontal>
        <GroupImage
          source={{
            uri: "https://codelab-icmc.netlify.app/android-icon-192x192.png",
          }}
        />
        <View style={{ flex: 1 }}>
          <GroupTitle>CodeLab São Carlos</GroupTitle>
          <GroupDescription>
            O USPCodeLab (UCL) é um grupo de extensão universitário que tem por
            missão estimular a inovação tecnológica na USP.
          </GroupDescription>
        </View>
      </GroupContainerHorizontal>
      <TagsView>
        <Tag
          text="São Carlos"
          style={{ padding: 2 }}
          textStyle={{ fontSize: 10 }}
        />
        <Tag
          text="Computação"
          style={{ padding: 2 }}
          textStyle={{ fontSize: 10 }}
        />
        <Tag
          text="Programação"
          style={{ padding: 2 }}
          textStyle={{ fontSize: 10 }}
        />
      </TagsView>
    </GroupContainer>
  );
};

const GroupsList = () => {
  const navigation = useNavigation();

  const handleGroup = () => {
    navigation.navigate("Group" as never);
  };

  return (
    <Container>
      <Group onPress={handleGroup} />
    </Container>
  );
};

export default GroupsList;
