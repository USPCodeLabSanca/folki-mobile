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
