import React, { useState } from "react";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";
import Paragraph from "../../components/Paragraph";

const AbsenceList = () => {
  const [absences, setAbsences] = useState<Option[]>([
    {
      value: "1",
      name: "19 de Janeiro",
    },
    {
      value: "2",
      name: "20 de Janeiro",
    },
  ]);

  return (
    <DefaultBackground>
      <Title>2 Faltas</Title>
      <Paragraph>Suas Faltas em Cálculo II</Paragraph>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <MultiRemoverSelector value={absences} onChangeValue={setAbsences} />
      </ScrollView>
    </DefaultBackground>
  );
};

export default AbsenceList;
