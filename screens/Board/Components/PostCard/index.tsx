import React, { useState, useMemo } from "react";
import Title from "../../../../components/Title";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../../../../contexts/UserContext";
import apiClient from "../../../../clients/apiClient";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native";
import PostImage from "./PostImage";

function Tag({ text }: { text: string }) {
  const isOpportunity = text === "Oportunidade Acadêmica";
  return (
    <S.TagBadge isOpportunity={isOpportunity}>
      <S.TagText>{text}</S.TagText>
    </S.TagBadge>
  );
}

interface Props {
  name: string;
  userInstituteName?: string | null;
  timestamp: string;
  content: string;
  tags?: string[];
  commentsCount?: number;
  userId: number;
  postId: number;
  onPress?: () => void;
  isCommentsScreen: boolean;
  onDelete?: () => void;
  imageUrls?: string[];
  upvotes?: number;
  downvotes?: number;
  voted?: 'up' | 'down' | null;
}

function PostCard({ name, userInstituteName, timestamp, content, tags = [], commentsCount, userId, postId, onPress, isCommentsScreen, onDelete, imageUrls = [], upvotes = 0, downvotes = 0, voted = null }: Props) {
  const { user, token } = useUser();
  const postOwner = userId === user?.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentVoted, setCurrentVoted] = useState(voted);
  const [isVoting, setIsVoting] = useState(false);

  const firstImageUrl = useMemo(() => {
    return imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
  }, [imageUrls]);

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

  const handleVote = async (e: any, isUpvote: boolean) => {
    e.stopPropagation();
    
    if (!token || isVoting) return;
    
    try {
      setIsVoting(true);
      const voteValue = isUpvote ? 1 : 0;
      
      const previousVoted = currentVoted;
      const previousUpvotes = currentUpvotes;
      
      if (currentVoted === (isUpvote ? 'up' : 'down')) {
        setCurrentVoted(null);
        if (isUpvote) {
          setCurrentUpvotes(prev => prev - 1);
        }
      } else if (currentVoted === null) {
        setCurrentVoted(isUpvote ? 'up' : 'down');
        if (isUpvote) {
          setCurrentUpvotes(prev => prev + 1);
        }
      } else {
        setCurrentVoted(isUpvote ? 'up' : 'down');
        if (isUpvote) {
          setCurrentUpvotes(prev => prev + 1);
        } else {
          setCurrentUpvotes(prev => prev - 1);
        }
      }
      
      await apiClient.votePost(token, postId, voteValue);
    } catch (error) {
      setCurrentVoted(voted);
      setCurrentUpvotes(upvotes);
      Toast.show("Erro ao votar", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setIsVoting(false);
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

        <S.UserInfo>
          <Title style={{ fontSize: 14, marginBottom: 0 }}>
            {name}
          </Title>
          {userInstituteName && (
            <S.InstituteText>{userInstituteName}</S.InstituteText>
          )}
        </S.UserInfo>

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

      {firstImageUrl && (
        <S.ImagesContainer>
          <PostImage imageUrl={firstImageUrl} />
        </S.ImagesContainer>
      )}

      {tags.length > 0 && (
        <S.TagContainer
          style={{ marginBottom: isCommentsScreen  ? 6 : 0 }}
        >
          {tags.map((tag, i) => (
            <Tag key={i} text={tag} />
          ))}
        </S.TagContainer>
      )}

      <S.ActionsContainer>
        <S.VoteWrapper>
          <S.VoteButton 
            onPress={(e) => handleVote(e, true)}
            disabled={isVoting}
            isActive={currentVoted === 'up'}
          >
            <Feather 
              name="arrow-up" 
              size={18} 
              color={currentVoted === 'up' ? '#7C3AED' : 'white'} 
            />
          </S.VoteButton>
          
          <S.VoteCount>{currentUpvotes}</S.VoteCount>
          
          <S.VoteButton 
            onPress={(e) => handleVote(e, false)}
            disabled={isVoting}
            isActive={currentVoted === 'down'}
          >
            <Feather 
              name="arrow-down" 
              size={18} 
              color={currentVoted === 'down' ? '#7C3AED' : 'white'} 
            />
          </S.VoteButton>
        </S.VoteWrapper>

        {!isCommentsScreen && (
          <S.CommentWrapper>
            <Feather name="message-circle" size={18} color="white" />
            <S.CommentCount>{commentsCount}</S.CommentCount>
          </S.CommentWrapper>
        )}

        {!isCommentsScreen && (
          <S.CommentsButton onPress={onPress}>
            <S.CommentsButtonText>Comentar</S.CommentsButtonText>
          </S.CommentsButton>
        )}
      </S.ActionsContainer>

    </S.PostContainer>
  );
}

export default React.memo(PostCard);
