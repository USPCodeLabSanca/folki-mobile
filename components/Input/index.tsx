import styled from "styled-components/native";
import theme from "../../config/theme";

const Input = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray.gray5,
})`
  background-color: ${theme.colors.gray.gray2};
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: Montserrat_400Regular;
  font-size: 16px;
  color: #fff;
  border-radius: 20px;
`;

export default Input;
