import styled from "styled-components/native";
import theme from "../../../../config/theme";
import Paragraph from "../../../../components/Paragraph";

export const PostContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.colors.gray.gray3};
  border-radius: 16px;
  padding: 8px 8px 4px 8px;
  margin-bottom: 12px;
`;

export const PostHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const UserAvatar = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  margin-right: 10px;
`;

export const PostTimestamp = styled.Text`
  font-size: 11px;
  margin-left: auto;
  margin-right: 8px;
  color: white;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 5px;
`;

export const TagBadge = styled.View`
  background-color: ${theme.colors.purple.primary};
  padding: 4px 20px;
  border-radius: 20px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const TagText = styled.Text`
  color: white;
  font-size: 10px;
`;

export const CommentsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const CommentsText = styled.Text`
  color: white;
  font-size: 10px;
  font-family: Montserrat_400Regular;
`;

export const CommentsButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background-color: transparent;
`;

export const CommentsButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-family: Montserrat_400Regular;
`;

export const PostText = styled(Paragraph)`
  color: ${theme.colors.gray.gray5};
  font-size: 12px;
  margin-bottom: 0;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
`;
