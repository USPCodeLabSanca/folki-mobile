import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";

const SelectCourse = () => {
  const [courseId, setCourseId] = useState("");
  const navigation = useNavigation();

  const handleCourseButton = () => {
    // @ts-ignore
    navigation.navigate("SelectPeriod", { courseId });
  };

  return (
    <DefaultBackground>
      <Title>Seu Curso?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={courseId}
          onChangeValue={setCourseId}
          options={[
            { value: "1", name: "Sistemas de Informação" },
            { value: "2", name: "Ciências de Computação" },
          ]}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!courseId}
        onPress={handleCourseButton}
      />
    </DefaultBackground>
  );
};

export default SelectCourse;
