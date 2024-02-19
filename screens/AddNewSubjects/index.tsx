import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SubjectsList from "./components/SubjectsList";
import Subject from "../../types/Subject";

const AddNewSubjects = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const handleSubjectPress = (subject: Subject) => {
    // @ts-ignore
    navigation.navigate("SelectSubjects");
  };

  const handleCancelButton = () => {
    navigation.goBack();
  };

  return (
    <DefaultBackground>
      <Title>Procurar</Title>
      <Input
        placeholder="Cálculo I, SMA300, ..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <SubjectsList
        subjects={[{ id: 1, name: "Cálculo I" }]}
        onSubjectPress={handleSubjectPress}
      />
      <Button text="Cancelar" width="100%" onPress={handleCancelButton} />
    </DefaultBackground>
  );
};

export default AddNewSubjects;
