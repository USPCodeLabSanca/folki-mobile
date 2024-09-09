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
import YesOrNoModal from "../../components/YesOrNoModal";

const TYPES = [
  { label: "Prova", value: "EXAM" },
  { label: "Trabalho", value: "HOMEWORK" },
  { label: "Atividade", value: "ACTIVITY" },
  { label: "Lista", value: "LIST" },
];

const CreateActivity = ({ navigation, route }: any) => {
  const activity = route?.params?.activity;
  const { userSubjects, token, userActivities, setUserActivities } = useUser();

  const [publicUpdateActivity, setPublicUpdateActivity] = useState(null);
  const [id] = useState(activity?.id);
  const [name, setName] = useState(activity?.name || "");
  const [type, setType] = useState(activity?.type || "");
  const [date, setDate] = useState<Date | undefined>(
    activity?.finishDate ? new Date(activity.finishDate) : undefined
  );
  const [isPublic, setIsPublic] = useState("Sim");
  const [subjectClassId, setSubjectClassId] = useState(
    activity?.subjectClassId
  );
  const [value, setValue] = useState(activity?.value.toString() || "");

  const [loading, setLoading] = useState(false);

  const goToActivities = () => {
    // @ts-ignore
    navigation.navigate("Activities");
  };

  const handleUpdateButton = () => {
    if (activity?.isPrivate) return update();
    setPublicUpdateActivity(activity);
  };

  const update = async () => {
    setLoading(true);
    setPublicUpdateActivity(null);

    try {
      await apiClient.updateActivity(
        id,
        {
          name,
          type,
          finishDate: new Date(date!.setHours(15)),
          value: parseFloat(value),
          subjectClassId,
        },
        token!
      );

      const userActivitiesUpdated = userActivities.map((act) => {
        if (act.id === id) {
          return {
            ...act,
            name,
            type,
            finishDate: date!.toISOString(),
            subjectClassId,
            value: parseFloat(value),
          };
        }

        return act;
      });

      setUserActivities(userActivitiesUpdated);
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

  const handleCreateButton = async () => {
    setLoading(true);

    try {
      await apiClient.createActivity(
        name,
        type,
        new Date(date!.setHours(15)),
        parseFloat(value),
        subjectClassId,
        isPublic === "Não",
        token!
      );

      const { activities } = await apiClient.getUserActivities(token!);

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
        index ===
        self.findIndex(
          (t) =>
            t.subjectClass.subject.id === userSubject.subjectClass.subject.id
        )
    );
  };

  const getSubjectClassIds = () => {
    return removeDuplicates(userSubjects).map((userSubject) => ({
      label: userSubject.subjectClass.subject.name,
      value: userSubject.subjectClass.id.toString(),
    }));
  };

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
        <Title style={{ textAlign: "center" }}>
          {activity ? "Atualizar" : "Nova"} Atividade
        </Title>
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
          value={subjectClassId}
          onChangeValue={setSubjectClassId}
          items={getSubjectClassIds()}
        />
        {!activity ? (
          <SelectInput
            style={{ marginBottom: 8 }}
            placeholder="A Atividade é Pública?"
            value={isPublic}
            onChangeValue={setIsPublic}
            items={[
              { label: "Atividade Pública", value: "Sim" },
              { label: "Atividade Privada", value: "Não" },
            ]}
          />
        ) : null}
        <Button
          text={loading ? "..." : id ? "Atualizar" : "Criar"}
          width="100%"
          disabled={
            !name || !type || !date || !subjectClassId || !value || loading
          }
          onPress={id ? handleUpdateButton : handleCreateButton}
        />
      </View>
      <ButtonsNavigation />

      {publicUpdateActivity && (
        <YesOrNoModal
          title="Tem Certeza?"
          paragraph={
            "Ao atualizar essa atividade pública, todos os seus colegas de turma terão a atividade atualizada. Tem certeza?"
          }
          handleCancel={() => setPublicUpdateActivity(null)}
          handleYes={() => update()}
          onClose={() => setPublicUpdateActivity(null)}
        />
      )}
    </DefaultBackground>
  );
};

export default CreateActivity;
