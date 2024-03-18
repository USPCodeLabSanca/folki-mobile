import React, { useState } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DateInput from "../../components/DateInput";
import SelectInput from "../../components/SelectInput";
import { useUser } from "../../contexts/UserContext";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import UserSubject from "../../types/UserSubject";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import setActivityNotification from "../../utils/setActivityNotification";

const TYPES = [
  { label: "Prova", value: "EXAM" },
  { label: "Trabalho", value: "HOMEWORK" },
  { label: "Atividade", value: "ACTIVITY" },
  { label: "Lista", value: "LIST" },
];

const CreateActivity = ({ navigation }: any) => {
  const { userSubjects, token, setUserActivities } = useUser();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [subjectId, setSubjectId] = useState("");
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const goToActivities = () => {
    // @ts-ignore
    navigation.navigate("Activities");
  };

  const handleCreateButton = async () => {
    setLoading(true);

    try {
      const activity = await apiClient.createActivity(
        name,
        type,
        date!,
        parseFloat(value),
        subjectId,
        token!
      );

      const { activities } = await apiClient.getUserActivities(token!);

      await setActivityNotification(activity);

      setUserActivities(activities);
      goToActivities();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }

    setLoading(false);
  };

  const removeDuplicates = (userSubjects: UserSubject[]) => {
    return userSubjects.filter(
      (userSubject, index, self) =>
        index === self.findIndex((t) => t.subject.id === userSubject.subject.id)
    );
  };

  const getSubjectIds = () => {
    return removeDuplicates(userSubjects).map((userSubject) => ({
      label: userSubject.subject.name,
      value: userSubject.subject.id.toString(),
    }));
  };

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
        <Title style={{ textAlign: "center" }}>Nova Atividade</Title>
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Nome da Atividade"
          autoComplete="off"
          value={name}
          onChangeText={setName}
        />

        <DateInput
          style={{ marginBottom: 8 }}
          placeholder="Data da Atividade"
          value={date}
          onChangeValue={setDate}
        />

        <Input
          style={{ marginBottom: 8 }}
          placeholder="Valor da Atividade (0 até 10)"
          autoComplete="off"
          inputMode="numeric"
          autoCapitalize="none"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
        <SelectInput
          style={{ marginBottom: 8 }}
          placeholder="Tipo de Atividade"
          value={type}
          onChangeValue={setType}
          items={TYPES}
        />
        <SelectInput
          style={{ marginBottom: 8 }}
          placeholder="Disciplina da Atividade"
          value={subjectId}
          onChangeValue={setSubjectId}
          items={getSubjectIds()}
        />
        <Button
          text={loading ? "..." : "Criar"}
          width="100%"
          disabled={!name || !type || !date || !subjectId || !value || loading}
          onPress={handleCreateButton}
        />
      </View>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default CreateActivity;
