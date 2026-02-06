import React from "react";
import theme from "../../../../config/theme";
import Button from "../../../../components/Button";
import * as S from "./styles";

const mainButtons = [
  { text: "Tags", style: { backgroundColor: theme.colors.gray.gray4, paddingHorizontal: 20 } },
  { text: "Enviar", style: { paddingHorizontal: 28 } },
];

function PostComposer() {
  return (
    <S.ComposerContainer>
      <S.PostInputCard>
        <S.InputText
          placeholder="Escreva aqui! Divulgue oportunidades, discuta ideias ou filosofique!"
          placeholderTextColor={theme.colors.gray.gray4}
          multiline
        />

        <S.PostActionsRow>
          {mainButtons.map((btn, i) => (
            <Button
              key={i}
              text={btn.text}
              style={{ ...btn.style, paddingVertical: 6 }}
              fontSize={10}
            />
          ))}
        </S.PostActionsRow>
      </S.PostInputCard>

      <S.TagFilterSection>
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
      </S.TagFilterSection>
    </S.ComposerContainer>
  );
}

export default PostComposer;