import styled from "styled-components/native";
import theme from "../../config/theme";
import { TextProps } from "react-native";

type SubTitleProps = {
  fontSize?: number;
  marginBottom?: number;
} & TextProps;

const SubTitle = styled.Text<SubTitleProps>`
  font-family: Montserrat_400Regular;
  color: ${theme.colors.gray.gray5};
  font-size: ${(props) => props.fontSize ?? 26}px;
  margin-bottom: ${(props) => props.marginBottom ?? 8}px;
`;

export default SubTitle;
