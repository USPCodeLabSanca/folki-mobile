import React from "react";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";

const MuralContainer = styled.View`
  width: 100%;
`;

const InputContainer = styled.View`
  width: 100%;
  background-color: ${theme.colors.gray.gray3};
  border-radius: 16px;
  padding: 8px 8px 4px 8px;
  margin-bottom: 12px;
`;

const InputText = styled.TextInput`
  color: white;
  min-height: 60px;
  font-size: 13px;
  margin-bottom: 12px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterContainer = styled.View`
  align-items: flex-start;
`;

const ContactImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 48px;
  margin-right: 10px;
`;

const TimeText = styled.Text`
  font-size: 10px;
  margin-left: auto;
  margin-right: 8px;
  color: white;
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 5px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${theme.colors.purple.primary};
  padding: 4px 20px;
  border-radius: 20px;
  margin-right: 5px;
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 10px;
`;

const CommentsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;   
  align-items: center;
  margin-top: 10px;
`;

const CommentsText = styled.Text`
  color: white;
  font-size: 10px;
  font-family: Montserrat_400Regular;
`;

const CommentsButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background-color: transparent;
`;

const CommentsButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-family: Montserrat_400Regular;
`;

function BoardComponents() {
  return (
    <MuralContainer>

      <InputContainer>
        <InputText
          placeholder="Escreva aqui! Divulgue oportunidades, discuta ideias ou filosofique!"
          placeholderTextColor={theme.colors.gray.gray4}
          multiline
        />

        <ButtonsContainer>
          <Button
            text="Tags"
            style={{
              backgroundColor: theme.colors.gray.gray4,
              paddingHorizontal: 20,
              paddingVertical: 6,
            }}
            fontSize={10}
          />

          <Button
            text="Enviar"
            style={{
              paddingHorizontal: 28,
              paddingVertical: 6,
            }}
            fontSize={10}
          />
        </ButtonsContainer>
      </InputContainer>

      <FilterContainer>
        <Button
          text="Filtrar por Tags"
          style={{
            backgroundColor: theme.colors.gray.gray4,
            paddingHorizontal: 28,
            paddingVertical: 6,
            marginBottom: 12,
          }}
          fontSize={10}
        />
      </FilterContainer>

      <InputContainer>
        <UserContainer>
          <ContactImage
            source={{ uri: "https://avatars.githubusercontent.com/u/134219205?v=4" }}
          />

          <Paragraph
            style={{
              color: "#FFFFFF",
              marginBottom: 0,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Allan Silva
          </Paragraph>

          <TimeText>12m</TimeText>
        </UserContainer>

        <Paragraph
          style={{
            color: theme.colors.gray.gray5,
            marginBottom: 0,
            fontSize: 12,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Paragraph>

        <TagContainer>
          <SendButton>
            <ButtonText>Computação</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Enviar</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Teste</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Paralelepipedo</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Enviar</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Carlinhos Maia</ButtonText>
          </SendButton>
          <SendButton>
            <ButtonText>Enviar</ButtonText>
          </SendButton>
        </TagContainer>

        <CommentsContainer>
          <CommentsText>103 Comentários</CommentsText>
          <CommentsButton>
            <CommentsButtonText>Comentar</CommentsButtonText>
          </CommentsButton>
        </CommentsContainer>

      </InputContainer>
      

    </MuralContainer>
  );
}

export default BoardComponents;
