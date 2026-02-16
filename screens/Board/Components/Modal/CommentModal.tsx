import React from "react";
import { Modal, ScrollView } from "react-native";
import * as S from "./styles";
import DefaultBackground from "../../../../components/DefaultBackground";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../../../../components/Title";
import PostComposer from "../PostComposer";
import PostCard from "../PostCard";
import posts from "../../posts.json";

interface Props {
  visible: boolean;
  onClose: () => void;
  isCommentsScreen: boolean;
  setIsCommentsScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Teste = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default function CommentModal({ visible, onClose, isCommentsScreen, setIsCommentsScreen }: Props) {

  return (
    <Modal visible={visible}>
        <DefaultBackground>
          <Teste>
            <S.CloseButton onPress={() => { onClose(); setIsCommentsScreen(false); }}>
              <Ionicons
              name="arrow-back-outline"
              size={22}
              color={"white"}
            />
            </S.CloseButton>
            <Title>Mural</Title>
          </Teste>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <PostComposer
              isCommentsScreen={isCommentsScreen}
            />
            <PostCard
              userId={posts[0].userId}
              name={posts[0].userName}
              timestamp={"10m"}
              content={posts[0].content}
              tags={posts[0].tags}
              commentsCount={posts[0].commentsCount}
              isCommentsScreen={isCommentsScreen}
            />
            {posts.map((post, i) => (
              <PostCard
                userId={post.userId}
                name={post.userName}
                timestamp={"10m"}
                content={post.content}
                isCommentsScreen={isCommentsScreen}
              />
            ))}
          </ScrollView>
        </DefaultBackground>
    </Modal>
  );
}
