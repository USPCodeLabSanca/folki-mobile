import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const SelectPeriod = () => {
  const [period, setPeriod] = useState("");
  const navigation = useNavigation();

  const handlePeriodButton = () => {
    // @ts-ignore
    navigation.navigate("SelectSubjects", { period });
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
