import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import React from "react";
import HomeCard from "./components/HomeCard";
import Card from "../../components/Card";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { useUser } from "../../contexts/UserContext";
import getWeekDay from "../../utils/getWeekDay";
import Subject from "../../types/Subject";
import UserSubject from "../../types/UserSubject";
import Activity from "../../types/Activity";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import getActivityDate from "../../utils/getActivityDate";
import getGradingPercentage from "../../utils/getGradingPercentage";
import getActivityColorByType from "../../utils/getActivityColorByType";

const Home = () => {
  const { user, userSubjects, userActivities } = useUser();

  const getTodayClasses = (subjects: UserSubject[]) => {
    const result: UserSubject[] = [];
    const today = getWeekDay().short;

    for (const subject of subjects) {
      const days: string[] = [];

      subject.availableDays.map((day) => {
        days.push(day.day);
      });

      if (days.includes(today)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.availableDays.find((day) => day.day === today)?.start || "0"
      );
      const hourB = parseInt(
        b.availableDays.find((day) => day.day === today)?.start || "0"
      );
      return hourA - hourB;
    });
  };

  const getSubjectHourOfToday = (subject: UserSubject) => {
    const today = getWeekDay().short;

    for (const day of subject.availableDays) {
      if (day.day === today) {
        return `${day.start} - ${day.end}`;
      }
    }

    return "";
  };

  const getTodayActivities = (activities: Activity[]) => {
    return activities.filter((activity) => {
      const date = new Date(activity.finishDate);
      const today = new Date();

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
  };

  const getWeekActivities = (activities: Activity[]) => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    return activities
      .filter((activity) => {
        const date = new Date(activity.finishDate);

        return date >= startOfWeek && date <= endOfWeek;
      })
      .sort((a, b) => {
        const dateA = new Date(a.finishDate);
        const dateB = new Date(b.finishDate);
        return dateA.getTime() - dateB.getTime();
      });
  };

  return (
    <DefaultBackground>
      <Title>Olá, {user?.name?.split(" ")[0]}!</Title>
      <Paragraph>
        Outra{" "}
        {getWeekDay().full.charAt(0).toUpperCase() + getWeekDay().full.slice(1)}{" "}
        na USP!
      </Paragraph>
      <ScrollView>
        <HomeCard title="Atividades de Hoje">
          {getTodayActivities(userActivities).length ? (
            getTodayActivities(userActivities).map((activity) => (
              <Card
                key={`activity-today-${activity.id}`}
                title={activity.name}
                color={getActivityColorByType(activity.type)}
                lines={[
                  activity.userSubject?.subject.name!,
                  `${getGradingPercentage(
                    activity.value
                  )}% da Nota - ${getActivityDate(activity.finishDate)}`,
                ]}
              />
            ))
          ) : (
            <Paragraph>Sem atividades para hoje.</Paragraph>
          )}
        </HomeCard>
        <HomeCard title="Aulas de Hoje">
          {getTodayClasses(userSubjects).length ? (
            getTodayClasses(userSubjects).map((subject) => {
              const cards: any[] = [];

              subject.availableDays.map((day) => {
                if (day.day !== getWeekDay().short) return;
                cards.push(
                  <Card
                    key={`class-today-${subject.subject.id}-${day.day}-${day.start}`}
                    title={subject.subject.name}
                    color="#7500BC"
                    lines={[
                      `${day.start} - ${day.end}`,
                      `${subject.absences} Faltas`,
                    ]}
                  />
                );
              });

              return cards;
            })
          ) : (
            <Paragraph>{`Sem aulas hoje >:)`}</Paragraph>
          )}
        </HomeCard>
        <HomeCard title="Atividades da Semana">
          {getWeekActivities(userActivities).length ? (
            getWeekActivities(userActivities).map((activity) => (
              <Card
                key={`activity-week-${activity.id}`}
                title={activity.name}
                color={getActivityColorByType(activity.type)}
                lines={[
                  activity.userSubject?.subject.name!,
                  `${getGradingPercentage(
                    activity.value
                  )}% da Nota - ${getActivityDate(activity.finishDate)}`,
                ]}
              />
            ))
          ) : (
            <Paragraph>Sem atividades para essa semana.</Paragraph>
          )}
        </HomeCard>
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default Home;
