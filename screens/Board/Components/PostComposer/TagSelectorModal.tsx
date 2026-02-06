import React, { useState } from "react";
import { Modal } from "react-native";
import * as S from "./styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagSelectorModal({ visible, onClose, tags, selectedTags, setSelectedTags }: Props) {

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <S.ModalOverlay>
        <S.ModalContent>

          <S.ModalHeader>
            <S.ModalTitle>Selecionar Tags</S.ModalTitle>

            <S.CloseButton onPress={onClose}>
              <S.CloseText>X</S.CloseText>
            </S.CloseButton>
          </S.ModalHeader>

          <S.TagList>
            {tags.map(tag => {
              const isSelected = selectedTags.includes(tag);

              return (
                <S.TagOption
                  key={tag}
                  selected={isSelected}
                  onPress={() => toggleTag(tag)}
                >
                  <S.TagText>{tag}</S.TagText>
                </S.TagOption>
              );
            })}
          </S.TagList>

        </S.ModalContent>
      </S.ModalOverlay>
    </Modal>
  );
}
