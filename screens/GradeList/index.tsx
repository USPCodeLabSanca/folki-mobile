import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";
import Paragraph from "../../components/Paragraph";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Toast from "react-native-toast-message";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import Grade from "../../types/Grade";

const GradeList = ({ route }: any) => {
  const { userSubject } = route.params;
  const { token, setUserSubjects } = useUser();

  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  const generateOptionsFromGrades = (grades: Grade[]) => {
    const options: Option[] = [];

    grades.map((grade) => {
      options.push({
        name: `${grade.name} - ${grade.value}`,
        value: grade.id.toString(),
      });
    });

    return options;
  };

  const getGrades = async (subjectId: number) => {
    setLoading(true);

    try {
      const grades = await apiClient.getGrades(subjectId.toString(), token!);
      setGrades(grades);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateUserSubjectsGrades = async () => {
    const { userSubjects } = await apiClient.getUserSubjects(token!);
    setUserSubjects(userSubjects);
  };

  const handleGradeRemove = async (value: Option) => {
    const newGrades = grades.filter(
      (grade) => grade.id.toString() !== value.value
    );

    try {
      await apiClient.deleteGrade(value.value, token!);
      updateUserSubjectsGrades();
      setGrades(newGrades);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao remover falta",
        text2: error.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getGrades(userSubject.id);
  }, [userSubject]);

  return (
    <DefaultBackground>
      <Title>Notas!</Title>
      <Paragraph>
        Suas Notas em {userSubject.subjectClass.subject.name}
      </Paragraph>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        {loading ? (
          <Paragraph>Carregando ...</Paragraph>
        ) : (
          <MultiRemoverSelector
            value={generateOptionsFromGrades(grades)}
            onRemoveItem={handleGradeRemove}
          />
        )}
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default GradeList;
