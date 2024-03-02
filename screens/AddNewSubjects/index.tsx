import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SubjectsList from "./components/SubjectsList";
import Subject from "../../types/Subject";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";

const AddNewSubjects = ({ route }: any) => {
  const { campusId, courseId, period, routeSubjects } = route.params;

  const [searchText, setSearchText] = useState("");
  const [searchSubjects, setSearchSubjects] = useState<Subject[]>([]);
  const navigation = useNavigation();

  const handleSubjectPress = (subject: Subject) => {
    // @ts-ignore
    navigation.navigate("SelectSubjects", {
      campusId,
      courseId,
      period,
      routeSubjects: [...routeSubjects, subject],
    });
  };

  const handleCancelButton = () => {
    navigation.goBack();
  };

  const startSearch = async () => {
    try {
      const response = await apiClient.searchSubjects(searchText, campusId);
      setSearchSubjects(response);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(startSearch, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <DefaultBackground>
      <Title>Procurar</Title>
      <Input
        placeholder="Cálculo I, SMA300, ..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <SubjectsList
        subjects={searchSubjects}
        onSubjectPress={handleSubjectPress}
      />
      <Button text="Cancelar" width="100%" onPress={handleCancelButton} />
    </DefaultBackground>
  );
};

export default AddNewSubjects;
