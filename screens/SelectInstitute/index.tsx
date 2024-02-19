import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const SelectInstitute = () => {
  const [instituteId, setInstituteId] = useState("");
  const navigation = useNavigation();

  const handleInstituteButton = () => {
    // @ts-ignore
    navigation.navigate("SelectCourse", { instituteId });
  };

  return (
    <DefaultBackground>
      <Title>De onde cê é?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={instituteId}
          onChangeValue={setInstituteId}
          options={[
            { value: "1", name: "ICMC" },
            { value: "2", name: "EESC" },
          ]}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!instituteId}
        onPress={handleInstituteButton}
      />
    </DefaultBackground>
  );
};

export default SelectInstitute;
