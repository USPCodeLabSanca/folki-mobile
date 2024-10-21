import React, { useEffect, useState } from "react";
import DefaultBackground from "../../../components/DefaultBackground";
import Paragraph from "../../../components/Paragraph";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";

const ExplanationModal = () => {
  const [openExplanation, setOpenExplanation] = useState(false);

  const verifyExplanation = async () => {
    const markAsReadActivityExplanation = await AsyncStorage.getItem(
      "markAsReadActivityExplanation"
    );
    setOpenExplanation(!markAsReadActivityExplanation);
  };

  const onPressOk = async () => {
    await AsyncStorage.setItem("markAsReadActivityExplanation", "true");
    setOpenExplanation(false);
  };

  useEffect(() => {
    verifyExplanation();
  }, []);

  if (openExplanation)
    return (
      <Modal transparent={true}>
        <DefaultBackground
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Title>Atividades</Title>
          <Paragraph style={{ fontSize: 80 }}>📚</Paragraph>
          <Paragraph style={{ textAlign: "center", lineHeight: 26 }}>
            Hey! As atividades podem ser públicas! Isso significa que ao criar
            ou deletar uma nova atividade, elas aparecem para os seus colegas!
            Assim, vocês se organizam juntos! ;)
          </Paragraph>
          <Button text={"Ok!"} onPress={onPressOk} />
        </DefaultBackground>
      </Modal>
    );

  return null;
};

export default ExplanationModal;
