import styled from "styled-components/native";
import theme from "../../../../config/theme";

export const ComposerContainer = styled.View`
  width: 100%;
`;

export const PostInputCard = styled.View`
  width: 100%;
  background-color: ${theme.colors.gray.gray3};
  border-radius: 16px;
  padding: 8px 8px 4px 8px;
  margin-bottom: 12px;
`;

export const InputText = styled.TextInput`
  color: white;
  min-height: 60px;
  font-size: 13px;
  margin-bottom: 12px;
`;

export const PostActionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TagFilterSection = styled.View`
  align-items: flex-start;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 16px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  max-height: 80%;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 6px 10px;
`;

export const CloseText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const TagList = styled.ScrollView`
  flex-grow: 0;
`;

export const TagOption = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected
      ? theme.colors.purple.primary
      : theme.colors.gray.gray3};

  padding: 10px 16px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-self: flex-start;
`;


export const TagText = styled.Text`
  color: white;
  font-size: 13px;
`;

