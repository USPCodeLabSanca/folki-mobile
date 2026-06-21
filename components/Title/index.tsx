import styled from "styled-components/native";
import { TextProps } from "react-native";

type TitleProps = {
  fontSize?: number;
  marginBottom?: number;
} & TextProps;

const Title = styled.Text<TitleProps>`
  font-family: Montserrat_700Bold;
  color: white;
  font-size: ${(props) => props.fontSize ?? 32}px;
  margin-bottom: ${(props) => props.marginBottom ?? 8}px;
`;

export default Title;
