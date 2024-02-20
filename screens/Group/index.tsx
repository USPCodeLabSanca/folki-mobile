import styled from "styled-components/native";
import theme from "../../config/theme";
import DefaultBackground from "../../components/DefaultBackground";
import React from "react";
import { Tag } from "../Groups/component/GroupsTagsSelector";
import Markdown from "react-native-markdown-display";
import { ScrollView, TouchableOpacity } from "react-native";

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

const text = `

![Imagem](https://i0.wp.com/jornal.usp.br/wp-content/uploads/2021/06/20210602_00_uspcodelab.jpg?fit=1200%2C630&ssl=1)

## Quem somos

O USPCodeLab (UCL) é um grupo de extensão universitário que tem por missão estimular a inovação tecnológica na USP. Temos um programa educacional com 4 iniciativas que visa complementar a formação dos estudantes para que eles se tornem engenheiros de software capazes de desenvolver sistemas reais.

## dev.learn()

Cursos sobre tecnologia onde os participantes são apresentados a ferramentas e técnicas de desenvolvimento introdutórias e avançadas
`;

const Group = () => {
  return (
    <DefaultBackground style={{ gap: 12 }}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ gap: 12 }}
      >
        <GroupContainer>
          <GroupImage
            source={{
              uri: "https://codelab-icmc.netlify.app/android-icon-192x192.png",
            }}
          />
          <GroupTitle>CodeLab Sanca</GroupTitle>
          <TagsView>
            <Tag text="Computação" textStyle={{ fontSize: 9 }} />
            <Tag text="Programação" textStyle={{ fontSize: 9 }} />
          </TagsView>
        </GroupContainer>
        <GroupContainer>
          <Markdown
            style={{
              body: {
                color: theme.colors.gray.gray4,
                fontFamily: "Montserrat_400Regular",
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
            {text}
          </Markdown>
        </GroupContainer>
        <GroupContainer>
          <GroupTitle>Links</GroupTitle>
          <TagsView>
            <TouchableOpacity>
              <Tag text="Instagram" textStyle={{ fontSize: 9 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Tag text="Telegram" textStyle={{ fontSize: 9 }} />
            </TouchableOpacity>
          </TagsView>
        </GroupContainer>
      </ScrollView>
    </DefaultBackground>
  );
};

export default Group;
