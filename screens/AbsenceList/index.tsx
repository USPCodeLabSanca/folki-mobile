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
import UserSubject from "../../types/UserSubject";
import Absence from "../../types/Absence";
import apiClient from "../../clients/apiClient";
import { useUser } from "../../contexts/UserContext";
import getActivityDate from "../../utils/getActivityDate";
import Toast from "react-native-toast-message";

const AbsenceList = ({ route }: any) => {
  const { userSubject } = route.params;
  const { userSubjects, token, setUserSubjects } = useUser();
  const navigation = useNavigation();

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
        token!,
      );
      setAbsences(absences);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateUserSubjectsAbsences = () => {
    const newUserSubjects = userSubjects.map((userSubjectItem) => {
      if (userSubjectItem.id === userSubject.id) {
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
      (absence) => absence.id.toString() !== value.value,
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
    getAbsences(userSubject.subjectClass.subject.id);
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
        <Title>{`${userSubject.absences} Falta${
          userSubject.absences === 1 ? "" : "s"
        }`}</Title>
      </View>
      <Paragraph>
        Suas Faltas em {userSubject.subjectClass.subject.name}
      </Paragraph>
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
    </DefaultBackground>
  );
};

export default AbsenceList;
