import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import styled from "styled-components/native";
import { AvailableDay, SubjectClass } from "../../../types/Subject";
import UserSubject from "../../../types/UserSubject";
import getWeekDay from "../../../utils/getWeekDay";
import HomeCard from "./HomeCard";
import Card from "../../../components/Card";
import Paragraph from "../../../components/Paragraph";
import NewAbsenceModal from "../../Absences/components/NewAbsenceModal";
import { useState } from "react";
import theme from "../../../config/theme";

interface HomeTodayCoursesProps {
  userSubjects: UserSubject[];
  universitySlug: string;
}

const HomeTodayCourses = ({
  userSubjects,
  universitySlug,
}: HomeTodayCoursesProps) => {
  const [subjectIdAbsenceModalOpen, setSubjectIdAbsenceModalOpen] = useState(0);

  const getTodayClasses = (subjects: UserSubject[]) => {
    const result: UserSubject[] = [];
    /*const today = getWeekDay().short;*/
    const today = "seg";

    for (const subject of subjects) {
      const days: string[] = [];

      subject.subjectClass.availableDays.map((day) => {
        days.push(day.day);
      });

      if (days.includes(today)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.subjectClass.availableDays.find((day) => day.day === today)?.start ||
          "0",
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((day) => day.day === today)?.start ||
          "0",
      );
      return hourA - hourB;
    });
  };

  const openSubjectWebPage = async (
    subjectClass: SubjectClass,
    day: AvailableDay,
  ) => {
    if (universitySlug === "USP")
      await WebBrowser.openBrowserAsync(
        `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${subjectClass.subject.code}`,
      );

    if (universitySlug === "UFSCar") {
      const place = `São Carlos, UFSCar, ${day.classRoom}`;

      const url =
        "https://www.google.com/maps/search/?api=1&query=" + encodeURI(place);

      await Linking.openURL(url);
    }
  };

  return (
    <>
      <HomeCard
        title="Aulas"
        icon="tv-outline"
        iconColor="#60A5FA"
        iconContainerColor="#1F2635"
        navigationTarget="Week"
      >
        {getTodayClasses(userSubjects).length ? (
          getTodayClasses(userSubjects).map((subject) => {
            const cards: any[] = [];

            subject.subjectClass.availableDays.map((day) => {
              //if (day.day !== getWeekDay().short) return;
              if (day.day !== "seg") return;
              cards.push(
                <Card
                  onPress={() => openSubjectWebPage(subject.subjectClass!, day)}
                  key={`class-today-${subject.subjectClass.subject.id}-${day.day}-${day.start}`}
                  title={subject.subjectClass.subject.name}
                  color={theme.colors.gray.gray1}
                  lines={[
                    `${day.start} - ${day.end}`,
                    `${subject.absences} Falta${subject.absences === 1 ? "" : "s"}`,
                    subject.subjectClass.observations || "",
                    day.classRoom ? `Sala ${day.classRoom}` : "",
                  ]}
                  linesIcons={[
                    "time-outline",
                    "person-outline",
                    "navigate-circle-outline",
                    "navigate-circle-outline",
                  ]}
                  buttonsTexts={["Adicionar Falta"]}
                  buttonsOnPress={[
                    () =>
                      setSubjectIdAbsenceModalOpen(
                        subject.subjectClass.subject.id!,
                      ),
                  ]}
                  buttonsColors={["#58008E"]}
                />,
              );
            });

            return cards;
          })
        ) : (
          <Paragraph>{`Sem aulas hoje >:)`}</Paragraph>
        )}
      </HomeCard>
      <NewAbsenceModal
        subjectId={subjectIdAbsenceModalOpen}
        onClose={() => setSubjectIdAbsenceModalOpen(0)}
      />
    </>
  );
};

export default HomeTodayCourses;
