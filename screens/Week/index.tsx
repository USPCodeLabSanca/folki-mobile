import React, { useState } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import UserSubject from "../../types/UserSubject";
import { useUser } from "../../contexts/UserContext";
import HomeCard from "../Home/components/HomeCard";
import { AvailableDay } from "../../types/Subject";
import FloatRight from "../Activities/components/FloatRight";
import WeekModal from "./components/WeekModal";
import theme from "../../config/theme";

const days = [
  {
    long: "Segunda",
    short: "seg",
  },
  {
    long: "Terça",
    short: "ter",
  },
  {
    long: "Quarta",
    short: "qua",
  },
  {
    long: "Quinta",
    short: "qui",
  },
  {
    long: "Sexta",
    short: "sex",
  },
];

const Week = () => {
  const { userSubjects } = useUser();
  const [isWeekViewOpen, setIsWeekViewOpen] = useState(true);

  const getDayClasses = (day: string, subjects: UserSubject[]) => {
    const result: UserSubject[] = [];

    for (const subject of subjects) {
      const days: string[] = [];

      subject.subjectClass.availableDays.map((day) => {
        days.push(day.day);
      });

      if (days.includes(day)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0"
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0"
      );
      return hourA - hourB;
    });
  };

  const getSubjectHour = (availableDay: AvailableDay) => {
    return `${availableDay.start} - ${availableDay.end}`;
  };

  return (
    <>
      <DefaultBackground>
        <Title>Semana</Title>
        <Paragraph>Suas aulas aqui ;)</Paragraph>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {days.map((day: { short: string; long: string }) => {
            const classes = getDayClasses(day.short, userSubjects);

            if (classes.length)
              return (
                <HomeCard key={day.long} title={day.long}>
                  {classes.map((subject) => {
                    const cards: any[] = [];

                    subject.subjectClass.availableDays.forEach((dayFE) => {
                      if (dayFE.day !== day.short) return;
                      cards.push(
                        <Card
                          key={`${day.long}-class-${subject.subjectClass.subject.id}-${dayFE.start}`}
                          title={subject.subjectClass.subject.name}
                          color={subject.color || theme.colors.purple.primary}
                          lines={[
                            getSubjectHour(dayFE),
                            `${subject.absences} Faltas`,
                            subject?.observation,
                          ]}
                        />
                      );
                    });

                    return cards;
                  })}
                </HomeCard>
              );

            return (
              <HomeCard key={day.long} title={day.long}>
                <Paragraph>Nenhuma aula!</Paragraph>
              </HomeCard>
            );
          })}
        </ScrollView>
        <FloatRight
          onPress={() => setIsWeekViewOpen(!isWeekViewOpen)}
          isCalendarOpen={isWeekViewOpen}
        />
        {isWeekViewOpen && <WeekModal />}
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Week;
