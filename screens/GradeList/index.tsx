import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";
import Paragraph from "../../components/Paragraph";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Toast from "react-native-toast-message";
import Grade from "../../types/Grade";

const GradeList = ({ route }: any) => {
  const { userSubject } = route.params;
  const { token, setUserSubjects } = useUser();
  const navigation = useNavigation();

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
      (grade) => grade.id.toString() !== value.value,
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 12,
          height: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Notas!</Title>
      </View>
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
    </DefaultBackground>
  );
};

export default GradeList;
