import React from "react";
import ButtonsModal from "../ButtonsModal";

interface YesOrNoModalProps {
  title: string;
  paragraph: string;
  handleYes: () => void;
  handleCancel: () => void;
  onClose: () => void;
}

const YesOrNoModal = ({
  title,
  paragraph,
  handleYes,
  handleCancel,
  onClose,
}: YesOrNoModalProps) => {
  return (
    <ButtonsModal
      title={title}
      paragraph={paragraph}
      buttonsText={["Sim", "Cancelar"]}
      handleButtons={[handleYes, handleCancel]}
      onClose={onClose}
    />
  );
};

export default YesOrNoModal;
