import styled from "styled-components/native";
import theme from "../../../../config/theme";
import Paragraph from "../../../../components/Paragraph";
import { Dimensions } from "react-native";

export const PostContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.colors.gray.gray3};
  border-radius: 16px;
  padding: 8px 8px 8px 8px;
  margin-bottom: 16px;
`;

export const PostHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const UserAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  margin-right: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const InstituteText = styled.Text`
  font-size: 9px;
  color: ${theme.colors.gray.gray5};
  margin-top: 2px;
  font-family: Montserrat_400Regular;
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
  margin-top: 12px;
`;

export const TagBadge = styled.View<{ isOpportunity?: boolean }>`
  background-color: ${(props) => 
    props.isOpportunity ? theme.colors.green.primary : theme.colors.purple.primary};
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
  margin-top: 8px;
`;

export const CommentsText = styled.Text`
  color: white;
  font-size: 10px;
  font-family: Montserrat_400Regular;
`;

export const CommentsButton = styled.TouchableOpacity`
  padding: 9px 14px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin-left: auto;
`;

export const CommentsButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-family: Montserrat_600SemiBold;
`;

export const PostText = styled(Paragraph)`
  color: ${theme.colors.gray.gray5};
  font-size: 13px;
  margin-bottom: 0;
`;

export const ImagesContainer = styled.View`
  margin-top: 10px;
  width: 100%;
`;

export const PostImage = styled.Image`
  width: 100%;
  border-radius: 12px;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

export const VoteWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 4px 8px;
  gap: 6px;
`;

export const VoteButton = styled.TouchableOpacity<{ isActive?: boolean }>`
  padding: 2px;
  background-color: ${(props) => 
    props.isActive ? 'rgba(94, 23, 235, 0.3)' : 'transparent'};
  border-radius: 4px;
`;

export const VoteCount = styled.Text`
  color: white;
  font-size: 13px;
  font-family: Montserrat_600SemiBold;
  min-width: 20px;
  text-align: center;
`;

export const CommentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 6px 16px;
  gap: 6px;
`;

export const CommentCount = styled.Text`
  color: white;
  font-size: 13px;
  font-family: Montserrat_600SemiBold;
`;
