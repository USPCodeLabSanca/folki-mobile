import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const SelectCampus = () => {
  const [campusId, setCampusId] = useState("");
  const navigation = useNavigation();

  const handleCampusButton = () => {
    // @ts-ignore
    navigation.navigate("SelectInstitute", { campusId });
  };

  return (
    <DefaultBackground>
      <Title>De onde cê é?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={campusId}
          onChangeValue={setCampusId}
          options={[
            { value: "1", name: "São Paulo" },
            { value: "2", name: "São Carlos" },
          ]}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!campusId}
        onPress={handleCampusButton}
      />
    </DefaultBackground>
  );
};

export default SelectCampus;
