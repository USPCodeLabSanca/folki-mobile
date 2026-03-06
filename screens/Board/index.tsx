import React, { useState, useEffect, useRef, useCallback } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import  PostComposer from "./Components/PostComposer";
import PostCard from "./Components/PostCard";
import { ActivityIndicator, View, Platform, RefreshControl, ScrollView } from "react-native";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import CommentModal from "./Components/Modal/CommentModal";
import { useUser } from "../../contexts/UserContext";
import { getUniversityDisplayName } from "../../utils/postTags";
import apiClient from "../../clients/apiClient";
import Post from "../../types/Post";
import Toast from "react-native-root-toast";
import { notificationHandler } from "../../services/notificationHandler";
import { useRoute, useNavigation } from "@react-navigation/native";
import mixpanel from "../../services/mixpanel";
import { useScreenTracking } from "../../hooks/useScreenTracking";

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
  useScreenTracking('Board');
  const { user, userSubjects, token } = useUser();
  const route = useRoute();
  const navigation = useNavigation();
  const [filterSelectedTags, setFilterSelectedTags] = useState<string[]>([]);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentsScreen, setIsCommentsScreen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextId, setNextId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const universitySlug = user?.university?.slug || "usp";
  const universityName = getUniversityDisplayName(universitySlug);

  const openPostModal = async (postId: string) => {
    if (!token || !postId) return;

    try {
      const post = await apiClient.getPost(token, parseInt(postId));
      setSelectedPost(post);
      setIsCommentModalVisible(true);
      setIsCommentsScreen(true);
      mixpanel.track('Post Opened', { postId });
    } catch (error) {
      showErrorToast("Erro ao carregar post");
    }
  };

  const handleRouteParams = () => {
    const params = route.params as any;
    if (params?.postId) {
      openPostModal(params.postId);
      navigation.setParams({ postId: null } as any);
    }
  };

  const registerNotificationHandler = () => {
    notificationHandler.register('comment', (data) => {
      if (data.postId) {
        // @ts-ignore
        navigation.navigate('Board', { postId: data.postId });
      }
    });

    return () => {
      notificationHandler.unregister('comment');
    };
  };

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
      showErrorToast("Erro ao carregar posts");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && nextId !== null) {
      fetchPosts(true);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(false);
    setRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    
    if (scrollY + height >= contentHeight - 100 && !loadingMore && nextId !== null) {
      handleLoadMore();
    }
  };

  const openCommentModal = useCallback((post: Post) => {
    setSelectedPost(post);
    setIsCommentModalVisible(true);
    setIsCommentsScreen(true);
  }, []);

  const showErrorToast = (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  };

  const renderEmptyState = () => (
    <View style={{ padding: 40, alignItems: "center" }}>
      <Paragraph>Sem feed :(</Paragraph>
    </View>
  );

  const renderLoadingIndicator = () => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#5E17EB" />
    </View>
  );

  const renderLoadMoreIndicator = () => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <ActivityIndicator size="small" color="#5E17EB" />
    </View>
  );

  useEffect(() => {
    handleRouteParams();
  }, [route.params]);

  useEffect(() => {
    return registerNotificationHandler();
  }, [navigation]);

  useEffect(() => {
    fetchPosts();
  }, [filterSelectedTags, token]);

  return (
      <DefaultBackground>
        <Title>Mural</Title>
        <Paragraph>Fale o que quiser para a {universityName}</Paragraph>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#5E17EB"
              colors={["#5E17EB"]}
            />
          }
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
            renderLoadingIndicator()
          ) : posts.length === 0 ? (
            renderEmptyState()
          ) : (
            posts.map((item) => (
              <PostCard
                key={item.id}
                onPress={() => openCommentModal(item)}
                userId={item.userId}
                postId={item.id}
                name={item.userName}
                userInstituteName={item.userInstituteName}
                timestamp={getTimeAgo(item.postDate)}
                content={item.content}
                tags={item.tags}
                commentsCount={item.commentsCount}
                isCommentsScreen={isCommentsScreen}
                onDelete={() => fetchPosts()}
                imageUrls={item.imageUrls}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                voted={item.voted}
              />
            ))
          )}
          
          {loadingMore && renderLoadMoreIndicator()}
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