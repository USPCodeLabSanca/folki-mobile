import React, { useState } from "react";
import Title from "../../../../components/Title";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../../../../contexts/UserContext";
import apiClient from "../../../../clients/apiClient";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native";

function Tag({ text }: { text: string }) {
  return (
    <S.TagBadge>
      <S.TagText>{text}</S.TagText>
    </S.TagBadge>
  );
}

interface Props {
  name: string;
  timestamp: string;
  content: string;
  tags?: string[];
  commentsCount?: number;
  userId: number;
  postId: number;
  onPress?: () => void;
  isCommentsScreen: boolean;
  onDelete?: () => void;
}

function PostCard({ name, timestamp, content, tags = [], commentsCount, userId, postId, onPress, isCommentsScreen, onDelete }: Props) {
  const { user, token } = useUser();
  const postOwner = userId === user?.id;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    
    if (!token) return;
    
    try {
      setIsDeleting(true);
      await apiClient.deletePost(token, postId);
      
      Toast.show("Post deletado com sucesso!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      Toast.show("Erro ao deletar post", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.PostContainer onPress={onPress}>
      <S.PostHeader>
        <S.UserAvatar
          source={{
            uri: `https://api.dicebear.com/7.x/bottts/png?seed=${userId}`,
          }}
        />

        <Title style={{ fontSize: 14, marginBottom: 0 }}>
          {name}
        </Title>

        <S.PostTimestamp>{timestamp}</S.PostTimestamp>

        {postOwner && (
          <S.DeleteButton onPress={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Feather name="trash-2" size={16} color="white" />
            )}
          </S.DeleteButton>
        )}
      
      </S.PostHeader> 

      <S.PostText>
        {content}
      </S.PostText>

      <S.TagContainer
        style={{ marginBottom: isCommentsScreen  ? 18 : 0 }}
      >
        {tags.map((tag, i) => (
          <Tag key={i} text={tag} />
        ))}
      </S.TagContainer>
        
      {!isCommentsScreen && (
        <S.CommentsContainer>
          <S.CommentsText>{commentsCount} Comentários</S.CommentsText>

          <S.CommentsButton onPress={onPress}>
            <S.CommentsButtonText>Comentar</S.CommentsButtonText>
          </S.CommentsButton>
        </S.CommentsContainer>
      )}

    </S.PostContainer>
  );
}

export default PostCard;
