import { Linking, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import React from "react";
import HomeCard from "./components/HomeCard";
import Card from "../../components/Card";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { useUser } from "../../contexts/UserContext";
import getWeekDay from "../../utils/getWeekDay";
import UserSubject from "../../types/UserSubject";
import Activity from "../../types/Activity";
import getActivityDate from "../../utils/getActivityDate";
import getGradingPercentage from "../../utils/getGradingPercentage";
import getActivityColorByType from "../../utils/getActivityColorByType";
import calculateSemester from "../../utils/calculateSemester";
import formatReal from "../../utils/formatReal";
import { AvailableDay, SubjectClass } from "../../types/Subject";

const Home = () => {
  const { user, ufscarData, userSubjects, userActivities } = useUser();

  const getTodayClasses = (subjects: UserSubject[]) => {
    const result: UserSubject[] = [];
    const today = getWeekDay().short;

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
          "0"
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((day) => day.day === today)?.start ||
          "0"
      );
      return hourA - hourB;
    });
  };

  const getTodayActivities = (activities: Activity[]) => {
    return activities.filter((activity) => {
      const date = new Date(activity.finishDate);
      const today = new Date();

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear() &&
        !activity.deletedAt
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

        return date >= startOfWeek && date <= endOfWeek && !activity.deletedAt;
      })
      .sort((a, b) => {
        const dateA = new Date(a.finishDate);
        const dateB = new Date(b.finishDate);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const openSubjectWebPage = async (
    subjectClass: SubjectClass,
    day: AvailableDay
  ) => {
    if (user?.university?.slug === "USP")
      await WebBrowser.openBrowserAsync(
        `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${subjectClass.subject.code}`
      );

    if (user?.university?.slug === "UFSCar") {
      const place = `São Carlos, UFSCar, ${day.classRoom}`;

      const url =
        "https://www.google.com/maps/search/?api=1&query=" + encodeURI(place);

      await Linking.openURL(url);
    }
  };

  return (
    <DefaultBackground>
      <Title>Olá, {user?.name?.split(" ")[0]}!</Title>
      <Paragraph>
        Outra{" "}
        {getWeekDay().full.charAt(0).toUpperCase() + getWeekDay().full.slice(1)}{" "}
        na {user?.university?.slug}!
      </Paragraph>
      <Paragraph>
        {calculateSemester(user!.university!.id)}% do Semestre Concluído. Vamos
        lá!
      </Paragraph>
      <ScrollView>
        {ufscarData?.balance ? (
          ufscarData.balance !== 1 ? (
            <HomeCard title="Saldo no RU">
              <Paragraph>
                {formatReal(ufscarData.balance)} (
                {parseInt((ufscarData.balance / 4.2).toString())} Refeições)
              </Paragraph>
            </HomeCard>
          ) : null
        ) : null}

        <HomeCard title="Atividades de Hoje">
          {getTodayActivities(userActivities).length ? (
            getTodayActivities(userActivities).map((activity) => (
              <Card
                key={`activity-today-${activity.id}`}
                title={activity.name}
                color={getActivityColorByType(activity.type)}
                lines={[
                  activity.subjectClass?.subject.name!,
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

              subject.subjectClass.availableDays.map((day) => {
                if (day.day !== getWeekDay().short) return;
                cards.push(
                  <Card
                    onPress={() =>
                      openSubjectWebPage(subject.subjectClass!, day)
                    }
                    key={`class-today-${subject.subjectClass.subject.id}-${day.day}-${day.start}`}
                    title={subject.subjectClass.subject.name}
                    color="#7500BC"
                    lines={[
                      `${day.start} - ${day.end}`,
                      subject.subjectClass.observations || "",
                      `${subject.absences} Faltas`,
                      day.classRoom ? `Sala ${day.classRoom}` : "",
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
                  activity.subjectClass?.subject.name!,
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
