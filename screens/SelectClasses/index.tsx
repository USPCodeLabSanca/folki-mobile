import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import Paragraph from "../../components/Paragraph";
import Subject from "../../types/Subject";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import Toast from "react-native-toast-message";

interface SelectClassProps {
  subject: Subject;
  onContinue: (classId: number) => void;
}

const SelectClass = ({ subject, onContinue }: SelectClassProps) => {
  const [classId, setClassId] = useState("");

  useEffect(() => {
    if (subject.subjectClass!.length === 1)
      onContinue(Number(subject.subjectClass![0].id.toString()));
  }, [subject.id]);

  if (subject.subjectClass!.length === 1) return null;

  return (
    <DefaultBackground>
      <Title>{subject.name}</Title>
      <Paragraph>Selecione a sua turma de {subject.name}.</Paragraph>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          ellipsis={false}
          value={classId}
          onChangeValue={setClassId}
          options={subject.subjectClass!.map((subjectClass) => {
            return {
              value: subjectClass.id.toString(),
              name: `${subjectClass.professorName} - ${subjectClass.details}`,
            };
          })}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!classId}
        onPress={() => onContinue(Number(classId))}
      />
    </DefaultBackground>
  );
};

const LoadingScreen = () => {
  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Title>Aguarde ;)</Title>
      <Paragraph>Estamos Criando sua Home...</Paragraph>
    </DefaultBackground>
  );
};

const SelectClasses = ({ route }: any) => {
  const { subjects } = route.params;
  const { token, setUser, setUserSubjects } = useUser();

  const navigation = useNavigation();
  const [classIds, setClassIds] = useState<number[]>([]);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleContinueClick = async (classId: number) => {
    if (loading) return;

    let newClassIds = [...classIds];

    if (subjectIndex < subjects.length) {
      newClassIds = [...classIds, classId];
      console.log(newClassIds);
      setClassIds(newClassIds);
      setSubjectIndex(subjectIndex + 1);
    }

    if (subjectIndex === subjects.length - 1) updateClasses(newClassIds);
  };

  const updateClasses = async (newClassIds: number[]) => {
    setLoading(true);

    console.log(newClassIds);

    try {
      await apiClient.updateMeSubjects(newClassIds, token!);

      const { user } = await apiClient.getMe(token!);
      const { userSubjects } = await apiClient.getUserSubjects(token!);

      setUser(user);
      setUserSubjects(userSubjects);

      // @ts-ignore
      navigation.navigate("Home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <SelectClass
      key={subjectIndex}
      subject={subjects[subjectIndex]}
      onContinue={handleContinueClick}
    />
  );
};

export default SelectClasses;
