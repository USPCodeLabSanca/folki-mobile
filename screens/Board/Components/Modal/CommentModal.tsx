import React, { useState, useEffect } from "react";
import { Modal, ScrollView, ActivityIndicator, View } from "react-native";
import * as S from "./styles";
import DefaultBackground from "../../../../components/DefaultBackground";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../../../../components/Title";
import Paragraph from "../../../../components/Paragraph";
import PostComposer from "../PostComposer";
import PostCard from "../PostCard";
import Post from "../../../../types/Post";
import apiClient from "../../../../clients/apiClient";
import { useUser } from "../../../../contexts/UserContext";
import Toast from "react-native-root-toast";

interface Props {
  visible: boolean;
  onClose: () => void;
  isCommentsScreen: boolean;
  setIsCommentsScreen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: Post | null;
}

const Teste = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const getTimeAgo = (timePost: string) => {
  const now = new Date();
  const postDate = new Date(timePost);

  const diff = now.getTime() - postDate.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days <= 7) return `${days}d`;

  return postDate.toLocaleDateString("pt-BR");
};

export default function CommentModal({ visible, onClose, isCommentsScreen, setIsCommentsScreen, selectedPost }: Props) {
  const { token, user, userSubjects } = useUser();
  const [comments, setComments] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!token || !selectedPost) return;
    
    try {
      setLoading(true);
      const response = await apiClient.getPostComments(token, selectedPost.id);
      setComments(response);
    } catch (error) {
      Toast.show("Erro ao carregar comentários", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && selectedPost) {
      fetchComments();
    }
  }, [visible, selectedPost]);

  if (!selectedPost) return null;

  return (
    <Modal visible={visible}>
        <DefaultBackground>
          <Teste>
            <S.CloseButton onPress={() => { onClose(); setIsCommentsScreen(false); setComments([]); }}>
              <Ionicons
              name="arrow-back-outline"
              size={22}
              color={"white"}
            />
            </S.CloseButton>
            <Title>Mural</Title>
          </Teste>
          <Paragraph>Comentários</Paragraph>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <PostCard
              userId={selectedPost.userId}
              postId={selectedPost.id}
              name={selectedPost.userName}
              userInstituteName={selectedPost.userInstituteName}
              timestamp={getTimeAgo(selectedPost.postDate)}
              content={selectedPost.content}
              tags={selectedPost.tags}
              commentsCount={selectedPost.commentsCount}
              isCommentsScreen={isCommentsScreen}
              onDelete={() => {
                onClose();
                setIsCommentsScreen(false);
                setComments([]);
              }}
            />
            {loading ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <ActivityIndicator size="large" color="#5E17EB" />
              </View>
            ) : (
              comments.map((comment) => (
                <PostCard
                  key={comment.id}
                  userId={comment.userId}
                  postId={comment.id}
                  name={comment.userName}
                  userInstituteName={comment.userInstituteName}
                  timestamp={getTimeAgo(comment.postDate)}
                  content={comment.content}
                  isCommentsScreen={isCommentsScreen}
                  onDelete={fetchComments}
                />
              ))
            )}
            <PostComposer
              isCommentsScreen={isCommentsScreen}
              universitySlug={user?.university?.slug}
              userSubjects={userSubjects}
              onPostCreated={fetchComments}
              parentId={selectedPost.id}
            />
          </ScrollView>
        </DefaultBackground>
    </Modal>
  );
}
