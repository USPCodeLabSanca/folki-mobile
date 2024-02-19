import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import Paragraph from "../../components/Paragraph";

interface SelectClassProps {
  onContinueClick: () => void;
}

const SelectClass = ({ onContinueClick }: SelectClassProps) => {
  const [classId, setClassId] = useState("");

  return (
    <DefaultBackground>
      <Title>Cálculo I</Title>
      <Paragraph>Selecione a sua turma de Cálculo II.</Paragraph>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={classId}
          onChangeValue={setClassId}
          options={[
            { value: "1", name: "Reinaldo" },
            { value: "2", name: "Givaldo" },
          ]}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!classId}
        onPress={onContinueClick}
      />
    </DefaultBackground>
  );
};

const SelectClasses = () => {
  const navigation = useNavigation();

  const handleContinueClick = () => {
    // @ts-ignore
    navigation.navigate("SelectSubjects", { classId });
  };

  return <SelectClass onContinueClick={handleContinueClick} />;
};

export default SelectClasses;
