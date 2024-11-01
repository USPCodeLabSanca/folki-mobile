import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import YesOrNoModal from "../../../components/YesOrNoModal";
import ButtonsModal from "../../../components/ButtonsModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../contexts/UserContext";

interface RemoveActivityModalProps {
  handleCancel: () => void;
  handleIgnoreActivity: () => void;
  handleDeleteActivity: () => void;
  onClose: () => void;
}

const RemoveActivityModal = ({
  handleCancel,
  handleIgnoreActivity,
  handleDeleteActivity,
  onClose,
}: RemoveActivityModalProps) => {
  const { updateToken } = useUser();
  const navigation = useNavigation();

  const [step, setStep] = useState(0);

  const handleUpdateSubjects = async () => {
    await AsyncStorage.removeItem("token");
    updateToken("");
    navigation.navigate("Login" as never);
  };

  const handleDeleteActivityNextStep = () => {
    setStep(1);
  };

  if (!step)
    return (
      <ButtonsModal
        title={"Remover Atividade"}
        paragraph={"Por que você deseja remover essa atividade?"}
        buttonsText={[
          "Excluí a Matéria",
          "Quero Ignorar essa Atividade",
          "Essa Atividade Não Existe",
        ]}
        buttonsStyle={{ flexDirection: "column", gap: 6 }}
        handleButtons={[
          handleUpdateSubjects,
          handleIgnoreActivity,
          handleDeleteActivityNextStep,
        ]}
        onClose={onClose}
      />
    );

  return (
    <YesOrNoModal
      title={"Tem Certeza?"}
      paragraph={
        "Ao remover essa atividade pública, todos os seus colegas de turma terão a atividade deletada. Tem certeza?"
      }
      handleYes={handleDeleteActivity}
      handleCancel={handleCancel}
      onClose={onClose}
    />
  );
};

export default RemoveActivityModal;
