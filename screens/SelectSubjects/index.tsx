import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";

const SelectSubjects = () => {
  const [subjects, setSubjects] = useState<Option[]>([
    {
      value: "1",
      name: "Cálculo 1",
    },
    {
      value: "2",
      name: "Cálculo 2",
    },
  ]);
  const navigation = useNavigation();

  const handleSubjectsButton = () => {
    // @ts-ignore
    navigation.navigate("SelectClasses", { subjects });
  };

  const handleAddSubjects = () => {
    // @ts-ignore
    navigation.navigate("AddNewSubjects");
  };

  return (
    <DefaultBackground>
      <Title>Seus Cursos?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <MultiRemoverSelector value={subjects} onChangeValue={setSubjects} />
        <Button text="Adicionar Disciplinas" onPress={handleAddSubjects} />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!subjects.length}
        onPress={handleSubjectsButton}
      />
    </DefaultBackground>
  );
};

export default SelectSubjects;
