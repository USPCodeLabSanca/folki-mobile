import React, { useState } from "react";
import theme from "../../../../config/theme";
import Button from "../../../../components/Button";
import * as S from "./styles";
import TagSelectorModal from "./TagSelectorModal";

const mainButtons = [
  { text: "Tags", style: { backgroundColor: theme.colors.gray.gray4, paddingHorizontal: 20 } },
  { text: "Enviar", style: { paddingHorizontal: 28 } },
];

function PostComposer() {
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [tagFlag, setTagFlag] = useState<"filter" | "post" | null>(null);
  const [filterSelectedTags, setFilterSelectedTags] = useState<string[]>([]);
  const [postSelectedTags, setPostSelectedTags] = useState<string[]>([]);

  return (
    <S.ComposerContainer>
      <S.PostInputCard>
        <S.InputText
          placeholder="Escreva aqui! Divulgue oportunidades, discuta ideias ou filosofique!"
          placeholderTextColor={theme.colors.gray.gray4}
          multiline
        />

        <S.PostActionsRow>
            <Button
              text="Tags"
              onPress={() => { setIsTagModalVisible(true); setTagFlag("post"); }}
              style={{ backgroundColor: theme.colors.gray.gray4, paddingHorizontal: 20, paddingVertical: 6 }}
              fontSize={10}
            />
            <Button
              text="Enviar"
              style={{ paddingHorizontal: 28, paddingVertical: 6 }}
              fontSize={10}
            />
        </S.PostActionsRow>
      </S.PostInputCard>

      <S.TagFilterSection>
        <Button
          onPress={() => { setIsTagModalVisible(true); setTagFlag("filter"); }}
          text="Filtrar por Tags"
          style={{
            backgroundColor: theme.colors.gray.gray4,
            paddingHorizontal: 28,
            paddingVertical: 6,
            marginBottom: 12,
          }}
          fontSize={10}
        />
      </S.TagFilterSection>
      <TagSelectorModal
        visible={isTagModalVisible}
        onClose={() => setIsTagModalVisible(false)}
        selectedTags={tagFlag === "filter" ? filterSelectedTags : postSelectedTags}
        setSelectedTags={tagFlag === "filter" ? setFilterSelectedTags : setPostSelectedTags}
        tags={["São Carlos", "Computação",  "Dados",  "IA", "São Carlos", "Ciências",  "Dados",  "IA", "São Carlos", "Computação",  "Dados",  "IA", "São Carlos", "Computação",  "Dados",  "IA"]}
      />
    </S.ComposerContainer>
  );
}

export default PostComposer;