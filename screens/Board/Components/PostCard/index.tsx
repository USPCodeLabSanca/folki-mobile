import React from "react";
import Title from "../../../../components/Title";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../../../../contexts/UserContext";

function Tag({ text }) {
  return (
    <S.TagBadge>
      <S.TagText>{text}</S.TagText>
    </S.TagBadge>
  );
}


function PostCard({ name, timestamp, content, tags, commentsCount, userId }) {

  const { user } = useUser();
  const postOwner = userId === user?.id;

  return (
    <S.PostContainer>
      <S.PostHeader>
        <S.UserAvatar
          source={{
            uri: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
          }}
        />

        <Title style={{ fontSize: 18, marginBottom: 0 }}>
          {name}
        </Title>

        <S.PostTimestamp>{timestamp}</S.PostTimestamp>

        {postOwner && (
          <S.DeleteButton >
            <Feather name="trash-2" size={16} color="white" />
          </S.DeleteButton>)
        }
      
      </S.PostHeader> 

      <S.PostText>
        {content}
      </S.PostText>

      <S.TagContainer>
        {tags.map((tag, i) => (
          <Tag key={i} text={tag} />
        ))}
      </S.TagContainer>

      <S.CommentsContainer>
        <S.CommentsText>{commentsCount} Comentários</S.CommentsText>

        <S.CommentsButton>
          <S.CommentsButtonText>Comentar</S.CommentsButtonText>
        </S.CommentsButton>
      </S.CommentsContainer>
    </S.PostContainer>
  );
}

export default PostCard;
