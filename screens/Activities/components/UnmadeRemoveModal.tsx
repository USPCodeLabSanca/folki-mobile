import React, { useEffect, useState } from "react";
import YesOrNoModal from "../../../components/YesOrNoModal";

interface UnmadeRemoveModalProps {
  handleYes: () => void;
  handleCancel: () => void;
  onClose: () => void;
}

const UnmadeRemoveModal = ({
  handleYes,
  handleCancel,
  onClose,
}: UnmadeRemoveModalProps) => {
  return (
    <YesOrNoModal
      title={"Tem Certeza?"}
      paragraph={
        "Ao desfazer a remoção dessa atividade pública, todos os seus colegas de turma terão a atividade reativada. Tem certeza?"
      }
      handleYes={handleYes}
      handleCancel={handleCancel}
      onClose={onClose}
    />
  );
};

export default UnmadeRemoveModal;
