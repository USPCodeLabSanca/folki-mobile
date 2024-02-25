import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const SelectPeriod = ({ route }: any) => {
  const { campusId, courseId } = route.params;

  const [period, setPeriod] = useState("");
  const navigation = useNavigation();

  const handlePeriodButton = () => {
    // @ts-ignore
    navigation.navigate("SelectSubjects", { period, campusId, courseId });
  };

  return (
    <DefaultBackground>
      <Title>Seu Período?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={period}
          onChangeValue={setPeriod}
          options={[
            { value: "1", name: "1 Período" },
            { value: "2", name: "2 Período" },
            { value: "3", name: "3 Período" },
            { value: "4", name: "4 Período" },
            { value: "5", name: "5 Período" },
            { value: "6", name: "6 Período" },
            { value: "7", name: "7 Período" },
            { value: "8", name: "8 Período" },
            { value: "9", name: "9 Período" },
            { value: "10", name: "10 Período" },
          ]}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!period}
        onPress={handlePeriodButton}
      />
    </DefaultBackground>
  );
};

export default SelectPeriod;
