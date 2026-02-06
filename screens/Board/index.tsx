import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import  PostComposer from "./Components/PostComposer";
import PostCard from "./Components/PostCard";
import { ScrollView } from "react-native";
import posts from "./posts.json";

const getTimeAgo = (timePost: string) => {
  const now = new Date();
  const postDate = new Date(timePost);

  const diffMs = now.getTime() - postDate.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days <= 7) return `${days}d`;

  return postDate.toLocaleDateString("pt-BR");
};


const Board = () => {
  return (
      <DefaultBackground>
        <Title>Mural</Title>
        <Paragraph>Fale o que quiser para a USP</Paragraph>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <PostComposer />
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              userId={post.userId}
              name={post.userName}
              timestamp={getTimeAgo(post.postDate)}
              content={post.content}
              tags={post.tags}
              commentsCount={post.commentsCount}
            />
          ))} 
        </ScrollView>
      </DefaultBackground>
  );
}

export default Board;