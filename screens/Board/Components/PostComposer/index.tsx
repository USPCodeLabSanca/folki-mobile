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
  universitySlug = "usp", 
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
  
  const subjectNames = userSubjects.map(us => {
    const subject = us.subjectClass.subject;
    return subject.code ? `${subject.code} - ${subject.name}` : subject.name;
  });
  const tags = getPostTags(universitySlug, subjectNames);

  const handleSendPost = async () => {
    if (!postContent.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Escreva algo antes de enviar',
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
        parentId
      );

      Toast.show({
        type: 'success',
        text1: 'Post enviado com sucesso!',
      });

      setPostContent("");
      setPostSelectedTags([]);
      
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

        <S.PostActionsRow>
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