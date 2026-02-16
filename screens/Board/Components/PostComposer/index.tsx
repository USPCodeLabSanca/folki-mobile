import React, { useState } from "react";
import theme from "../../../../config/theme";
import Button from "../../../../components/Button";
import * as S from "./styles";
import TagSelectorModal from "../Modal/TagSelectorModal";

const mainButtons = [
  { text: "Tags", style: { backgroundColor: theme.colors.gray.gray4, paddingHorizontal: 20 } },
  { text: "Enviar", style: { paddingHorizontal: 28 } },
];

interface Props {
  filterSelectedTags?: string[];
  setFilterSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  isCommentsScreen?: boolean;
}

function PostComposer({ filterSelectedTags=[], setFilterSelectedTags=() => {}, isCommentsScreen = false }: Props) {
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [tagFlag, setTagFlag] = useState<"filter" | "post" | null>(null);
  const [postSelectedTags, setPostSelectedTags] = useState<string[]>([]);

  return (
    <S.ComposerContainer>
      <S.PostInputCard>
        <S.InputText
          placeholder={!isCommentsScreen ? 
            "Escreva aqui! Divulgue oportunidades, discuta ideias ou filosofique!" 
            : "Comente aqui!"}
          placeholderTextColor={theme.colors.gray.gray4}
          multiline
        />

        <S.PostActionsRow>
            <Button
              text={!isCommentsScreen ? "Tags" : ""}
              onPress={() => { setIsTagModalVisible(true); setTagFlag("post"); }}
              style={!isCommentsScreen ? 
                { backgroundColor: theme.colors.gray.gray4, paddingHorizontal: 20, paddingVertical: 6 } 
                : { paddingHorizontal: 0, paddingVertical: 0}}
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
        {!isCommentsScreen && (
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
        )}
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