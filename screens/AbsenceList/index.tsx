import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import MultiRemoverSelector, {
  Option,
} from "../../components/MultiRemoverSelector";
import Paragraph from "../../components/Paragraph";
import UserSubject from "../../types/UserSubject";
import Absence from "../../types/Absence";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import getActivityDate from "../../utils/getActivityDate";
import Toast from "react-native-toast-message";
import ButtonsNavigation from "../../components/ButtonsNavigation";

const AbsenceList = ({ route }: any) => {
  const { userSubject } = route.params;
  const { userSubjects, token, setUserSubjects } = useUser();

  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);

  const generateOptionsFromAbsences = (absences: Absence[]) => {
    const options: Option[] = [];

    absences.map((absence) => {
      options.push({
        name: getActivityDate(absence.date),
        value: absence.id.toString(),
      });
    });

    return options;
  };

  const getAbsences = async (subjectId: number) => {
    setLoading(true);

    try {
      const { absences } = await apiClient.getAbsences(
        subjectId.toString(),
        token!
      );
      setAbsences(absences);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateUserSubjectsAbsences = () => {
    const newUserSubjects = userSubjects.map((userSubjectItem) => {
      if (userSubjectItem.subject.id === userSubject.subject.id) {
        return {
          ...userSubjectItem,
          absences: userSubjectItem.absences - 1,
        };
      }

      return userSubjectItem;
    });

    userSubject.absences -= 1;

    setUserSubjects(newUserSubjects);
  };

  const handleAbsenceRemove = async (value: Option) => {
    const newAbsences = absences.filter(
      (absence) => absence.id.toString() !== value.value
    );

    try {
      await apiClient.deleteAbsence(value.value, token!);
      updateUserSubjectsAbsences();
      setAbsences(newAbsences);
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
    getAbsences(userSubject.subject.id);
  }, [userSubject]);

  return (
    <DefaultBackground>
      <Title>{`${userSubject.absences} Falta${
        userSubject.absences === 1 ? "" : "s"
      }`}</Title>
      <Paragraph>Suas Faltas em {userSubject.subject.name}</Paragraph>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        {loading ? (
          <Paragraph>Carregando ...</Paragraph>
        ) : (
          <MultiRemoverSelector
            value={generateOptionsFromAbsences(absences)}
            onRemoveItem={handleAbsenceRemove}
          />
        )}
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default AbsenceList;
