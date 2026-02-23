import React, { useState } from "react";
import theme from "../../../../config/theme";
import Button from "../../../../components/Button";
import * as S from "./styles";
import TagSelectorModal from "../Modal/TagSelectorModal";
import { getPostTags } from "../../../../utils/postTags";
import UserSubject from "../../../../types/UserSubject";
import apiClient from "../../../../clients/apiClient";
import Toast from "react-native-toast-message";
import { useUser } from "../../../../contexts/UserContext";
import mixpanel from "../../../../services/mixpanel";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  filterSelectedTags?: string[];
  setFilterSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  isCommentsScreen?: boolean;
  universitySlug?: string;
  userSubjects?: UserSubject[];
  onPostCreated?: () => void;
  parentId?: number;
}

function PostComposer({ 
  filterSelectedTags=[], 
  setFilterSelectedTags=() => {}, 
  isCommentsScreen = false, 
  universitySlug, 
  userSubjects = [],
  onPostCreated,
  parentId
}: Props) {
  const { token } = useUser();
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [tagFlag, setTagFlag] = useState<"filter" | "post" | null>(null);
  const [postSelectedTags, setPostSelectedTags] = useState<string[]>([]);
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{ uri: string; name: string; type: string }[]>([]);
  
  const subjectNames = userSubjects.map(us => {
    const subject = us.subjectClass.subject;
    return subject.code ? `${subject.code} - ${subject.name}` : subject.name;
  });
  const tags = getPostTags(universitySlug, subjectNames);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Toast.show({
          type: 'error',
          text1: 'Permissão necessária',
          text2: 'Você precisa permitir o acesso às fotos',
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const uriParts = asset.uri.split('/');
        const fileName = uriParts[uriParts.length - 1];
        const fileType = asset.mimeType || `image/${fileName.split('.').pop()}`;
        
        setSelectedImages([{
          uri: asset.uri,
          name: fileName,
          type: fileType,
        }]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao selecionar imagem',
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages([]);
  };

  const handleSendPost = async () => {
    if (!postContent.trim() && selectedImages.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Escreva algo ou adicione uma imagem',
      });
      return;
    }

    if (!isCommentsScreen && postSelectedTags.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Selecione pelo menos uma tag',
      });
      return;
    }

    try {
      setIsPosting(true);
      await apiClient.createPost(
        token!,
        postContent,
        postSelectedTags,
        parentId,
        selectedImages
      );

      Toast.show({
        type: 'success',
        text1: 'Post enviado com sucesso!',
      });

      // Mixpanel: Track post creation
      mixpanel.track(isCommentsScreen ? 'Comment Created' : 'Post Created', {
        tags: postSelectedTags,
        hasParent: !!parentId,
        contentLength: postContent.length,
        hasImages: selectedImages.length > 0,
        imagesCount: selectedImages.length,
      });

      setPostContent("");
      setPostSelectedTags([]);
      setSelectedImages([]);
      
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar post',
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <S.ComposerContainer>
      <S.PostInputCard>
        <S.InputText
          placeholder={!isCommentsScreen ? 
            "Escreva aqui! Divulgue oportunidades, discuta ideias ou filosofe!" 
            : "Comente aqui!"}
          placeholderTextColor={theme.colors.gray.gray4}
          multiline
          value={postContent}
          onChangeText={setPostContent}
          editable={!isPosting}
        />

        {selectedImages.length > 0 && (
          <S.ImagePreviewContainer>
            <Image 
              source={{ uri: selectedImages[0].uri }} 
              style={{ width: '100%', height: 200, borderRadius: 8, marginTop: 10 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => removeImage(0)}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: theme.colors.purple.primary,
                borderRadius: 12,
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="x" size={16} color="white" />
            </TouchableOpacity>
          </S.ImagePreviewContainer>
        )}

        <S.PostActionsRow>
            <S.LeftActions>
              {selectedImages.length === 0 && (
                <TouchableOpacity
                  onPress={pickImage}
                  disabled={isPosting}
                  style={{
                    backgroundColor: theme.colors.gray.gray4, 
                    paddingHorizontal: 12, 
                    paddingVertical: 8,
                    marginRight: 8,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Feather name="image" size={16} color="white" />
                </TouchableOpacity>
              )}
              {!isCommentsScreen && (
                <Button
                  text={`Tags${postSelectedTags.length > 0 ? ` (${postSelectedTags.length})` : ""}`}
                  onPress={() => { setIsTagModalVisible(true); setTagFlag("post"); }}
                  style={{ 
                    backgroundColor: postSelectedTags.length > 0 ? theme.colors.purple.primary : theme.colors.gray.gray4, 
                    paddingHorizontal: 20, 
                    paddingVertical: 6 
                  }}
                  fontSize={10}
                  disabled={isPosting}
                />
              )}
            </S.LeftActions>
            <Button
              text={isPosting ? "Enviando..." : "Enviar"}
              style={{ paddingHorizontal: 28, paddingVertical: 6 }}
              fontSize={10}
              onPress={handleSendPost}
              disabled={isPosting}
            />
        </S.PostActionsRow>
      </S.PostInputCard>

      <S.TagFilterSection>
        {!isCommentsScreen && (
          <Button
            onPress={() => { setIsTagModalVisible(true); setTagFlag("filter"); }}
            text={`Filtrar por Tags${filterSelectedTags.length > 0 ? ` (${filterSelectedTags.length})` : ""}`}
            style={{
              backgroundColor: filterSelectedTags.length > 0 ? theme.colors.purple.primary : theme.colors.gray.gray4,
              paddingHorizontal: 28,
              paddingVertical: 6,
              marginBottom: 12,
            }}
            fontSize={10}
          />
        )}
      </S.TagFilterSection>

      <TagSelectorModal
        visible={isTagModalVisible}
        onClose={() => setIsTagModalVisible(false)}
        selectedTags={tagFlag === "filter" ? filterSelectedTags : postSelectedTags}
        setSelectedTags={tagFlag === "filter" ? setFilterSelectedTags : setPostSelectedTags}
        tags={tags}
      />
    </S.ComposerContainer>
  );
}

export default PostComposer;