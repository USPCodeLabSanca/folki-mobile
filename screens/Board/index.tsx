import React, { useState, useEffect, useRef } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import  PostComposer from "./Components/PostComposer";
import PostCard from "./Components/PostCard";
import { ScrollView, ActivityIndicator, View, Platform } from "react-native";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import CommentModal from "./Components/Modal/CommentModal";
import { useUser } from "../../contexts/UserContext";
import { getUniversityDisplayName } from "../../utils/postTags";
import apiClient from "../../clients/apiClient";
import Post from "../../types/Post";
import Toast from "react-native-root-toast";
import { notificationHandler } from "../../services/notificationHandler";
import { useRoute, useNavigation } from "@react-navigation/native";

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

const Board = () => {
  const { user, userSubjects, token } = useUser();
  const route = useRoute();
  const navigation = useNavigation();
  const [filterSelectedTags, setFilterSelectedTags] = useState<string[]>([]);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentsScreen, setIsCommentsScreen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextId, setNextId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const universitySlug = user?.university?.slug || "usp";
  const universityName = getUniversityDisplayName(universitySlug);

  const openPostModal = async (postId: string) => {
    if (!token || !postId) return;

    try {
      const post = await apiClient.getPost(token, parseInt(postId));
      setSelectedPost(post);
      setIsCommentModalVisible(true);
      setIsCommentsScreen(true);
    } catch (error) {
      Toast.show("Erro ao carregar post", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  // Check for postId in route params (from notification)
  useEffect(() => {
    const params = route.params as any;
    if (params?.postId) {
      openPostModal(params.postId);
      // Clear the param after opening
      navigation.setParams({ postId: undefined });
    }
  }, [route.params]);

  useEffect(() => {
    notificationHandler.register('comment', (data) => {
      if (data.postId) {
        // @ts-ignore
        navigation.navigate('Board', { postId: data.postId });
      }
    });

    return () => {
      notificationHandler.unregister('comment');
    };
  }, [navigation]);

  const fetchPosts = async (isLoadMore: boolean = false) => {
    if (!token) return;
    
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setPosts([]);
      }

      const response = await apiClient.getPosts(
        token,
        20,
        filterSelectedTags.length > 0 ? filterSelectedTags : undefined,
        isLoadMore ? nextId || undefined : undefined
      );

      if (isLoadMore) {
        setPosts(prev => [...prev, ...response.posts]);
      } else {
        setPosts(response.posts);
      }
      
      setNextId(response.nextId);
    } catch (error) {
      Toast.show("Erro ao carregar posts", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filterSelectedTags, token]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    
    if (isCloseToBottom && !loadingMore && nextId !== null) {
      fetchPosts(true);
    }
  };

  return (
      <DefaultBackground>
        <Title>Mural</Title>
        <Paragraph>Fale o que quiser para a {universityName}</Paragraph>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          <PostComposer 
            filterSelectedTags={filterSelectedTags}
            setFilterSelectedTags={setFilterSelectedTags}
            isCommentsScreen={isCommentsScreen}
            universitySlug={universitySlug}
            userSubjects={userSubjects}
            onPostCreated={() => fetchPosts()}
          />
          {loading ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#5E17EB" />
            </View>
          ) : posts.length === 0 ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <Paragraph>Sem feed :(</Paragraph>
            </View>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard
                  onPress={() => {
                    setSelectedPost(post);
                    setIsCommentModalVisible(true);
                    setIsCommentsScreen(true);
                  }}
                  key={post.id}
                  userId={post.userId}
                  postId={post.id}
                  name={post.userName}
                  userInstituteName={post.userInstituteName}
                  timestamp={getTimeAgo(post.postDate)}
                  content={post.content}
                  tags={post.tags}
                  commentsCount={post.commentsCount}
                  isCommentsScreen={isCommentsScreen}
                  onDelete={() => fetchPosts()}
                />
              ))}
              {loadingMore && (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <ActivityIndicator size="small" color="#5E17EB" />
                </View>
              )}
            </>
          )}
        </ScrollView>
        <CommentModal 
          visible={isCommentModalVisible}
          onClose={() => setIsCommentModalVisible(false)}
          isCommentsScreen={isCommentsScreen}
          setIsCommentsScreen={setIsCommentsScreen}
          selectedPost={selectedPost}
        />
        <ButtonsNavigation />
      </DefaultBackground>
  );
}

export default Board;