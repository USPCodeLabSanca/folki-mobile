import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import UserSubject from "../../types/UserSubject";
import { useUser } from "../../contexts/UserContext";
import HomeCard from "../Home/components/HomeCard";

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

  const getDayClasses = (day: string, subjects: UserSubject[]) => {
    const result: UserSubject[] = [];

    for (const subject of subjects) {
      const days: string[] = [];

      subject.availableDays.map((day) => {
        days.push(day.day);
      });

      if (days.includes(day)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.availableDays.find((dayF) => dayF.day === day)?.start || "0"
      );
      const hourB = parseInt(
        b.availableDays.find((dayF) => dayF.day === day)?.start || "0"
      );
      return hourA - hourB;
    });
  };

  const getSubjectHour = (dayString: string, subject: UserSubject) => {
    for (const day of subject.availableDays) {
      if (day.day === dayString) {
        return `${day.start} - ${day.end}`;
      }
    }

    return "";
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
                  {classes.map((subject) => (
                    <Card
                      key={`${day.long}-class-today-${subject.subject.id}`}
                      title={subject.subject.name}
                      color="#7500BC"
                      lines={[
                        getSubjectHour(day.short, subject),
                        `${subject.absences} Faltas`,
                      ]}
                    />
                  ))}
                </HomeCard>
              );

            return (
              <HomeCard key={day.long} title={day.long}>
                <Paragraph>Nenhuma aula!</Paragraph>
              </HomeCard>
            );
          })}
        </ScrollView>
        <ButtonsNavigation />
      </DefaultBackground>
    </>
  );
};

export default Week;
