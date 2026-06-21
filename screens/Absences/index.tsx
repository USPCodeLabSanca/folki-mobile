import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DefaultBackground from "../../components/DefaultBackground";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import NewAbsenceModal from "./components/NewAbsenceModal";
import { useUser } from "../../contexts/UserContext";
import UserSubject from "../../types/UserSubject";
import getSubjectFrequence from "../../utils/getSubjectFrequence";
import SemesterText from "./components/SemesterText";
import { useScreenTracking } from "../../hooks/useScreenTracking";

const Absences = () => {
  useScreenTracking("Absences");
  const { userSubjects } = useUser();
  const [subjectIdAbsenceModalOpen, setSubjectIdAbsenceModalOpen] = useState(0);
  const navigation = useNavigation();

  const handleAbsenceViewPress = (userSubject: UserSubject) => {
    // @ts-ignore
    navigation.navigate("AbsenceList", { userSubject });
  };

  const removeDuplicates = (userSubjects: UserSubject[]) => {
    return userSubjects.filter(
      (userSubject, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.subjectClass.subject.id === userSubject.subjectClass.subject.id,
        ),
    );
  };

  return (
    <>
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
          <Title>Faltas</Title>
        </View>
        <Paragraph>Ainda posso faltar?</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {removeDuplicates(userSubjects).map((userSubject: UserSubject) => (
            <Card
              key={userSubject.subjectClass.subject.id}
              title={userSubject.subjectClass.subject.name}
              color="#3B005F"
              lines={[
                `${userSubject.absences} Falta${
                  userSubject.absences === 1 ? "" : "s"
                } Cadastrada${userSubject.absences === 1 ? "" : "s"}`,
              ]}
              buttonsTexts={["Adicionar Falta", "Ver Faltas"]}
              buttonsOnPress={[
                () =>
                  setSubjectIdAbsenceModalOpen(
                    userSubject.subjectClass.subject.id!,
                  ),
                () => handleAbsenceViewPress(userSubject),
              ]}
              buttonsColors={["#58008E", "#58008E"]}
            />
          ))}
        </ScrollView>
      </DefaultBackground>
      <NewAbsenceModal
        subjectId={subjectIdAbsenceModalOpen}
        onClose={() => setSubjectIdAbsenceModalOpen(0)}
      />
    </>
  );
};

export default Absences;
