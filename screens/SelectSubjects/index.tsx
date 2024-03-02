import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import Subject from "../../types/Subject";

const SelectSubjects = ({ route }: any) => {
  const { campusId, courseId, period, routeSubjects } = route.params;

  const [subjects, setSubjects] = useState<Subject[]>(routeSubjects || []);
  const navigation = useNavigation();

  const handleChangeSubjects = async (values: Option[]) => {
    const newSubjects = values.map((value) => {
      return subjects.find((subject) => subject.id.toString() === value.value);
    });
    setSubjects(newSubjects as Subject[]);
  };

  const handleSubjectsButton = () => {
    // @ts-ignore
    navigation.navigate("SelectClasses", { subjects });
  };

  const handleAddSubjects = () => {
    // @ts-ignore
    navigation.navigate("AddNewSubjects", {
      routeSubjects: subjects,
      courseId,
      period,
      campusId,
    });
  };

  const getDefaultSubjects = async () => {
    try {
      const response = await apiClient.getDefaultSubjects(courseId, period);
      setSubjects(response);
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
    if (!routeSubjects) getDefaultSubjects();
    else setSubjects(routeSubjects);
  }, [routeSubjects]);

  return (
    <DefaultBackground>
      <Title>Seus Cursos?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <MultiRemoverSelector
          value={subjects.map((subject) => {
            return {
              value: subject.id.toString(),
              name: `${subject.code} - ${subject.name}`,
            };
          })}
          onChangeValue={handleChangeSubjects}
        />
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
