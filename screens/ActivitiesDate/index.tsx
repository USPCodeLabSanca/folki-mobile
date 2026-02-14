import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { useUser } from "../../contexts/UserContext";
import Card from "../../components/Card";
import verifyIfIsActivityFinished from "../../utils/verifyIfIsActivityFinished";
import getActivityColorByType from "../../utils/getActivityColorByType";
import theme from "../../config/theme";
import getGradingPercentage from "../../utils/getGradingPercentage";
import getActivityDate from "../../utils/getActivityDate";
import Activity from "../../types/Activity";
import { ImportantDate } from "../../types/ImportantDate";
import getImportantColorByType from "../../utils/getImportantColorByType";
import parseUTCDate from "../../utils/parseUTCDate";

const ActivitiesDate = ({ route }: any) => {
  const { activityDate } = route.params;
  const { userActivities, importantDates } = useUser();

  const activitiesFromThisDate: Activity[] = [];
  const importantDatesFromThisDate: ImportantDate[] = [];

  userActivities.forEach((activity) => {
    const activityDateObj = parseUTCDate(activity.finishDate);
    if (
      activityDateObj.getDate() === activityDate.day &&
      activityDateObj.getMonth() === activityDate.month - 1 &&
      activityDateObj.getFullYear() === activityDate.year
    ) {
      activitiesFromThisDate.push(activity);
    }
  });

  importantDates.forEach((importantDate) => {
    const importantDateObj = parseUTCDate(importantDate.date);
    if (
      importantDateObj.getDate() === activityDate.day &&
      importantDateObj.getMonth() === activityDate.month - 1 &&
      importantDateObj.getFullYear() === activityDate.year
    ) {
      importantDatesFromThisDate.push(importantDate);
    }
  });

  return (
    <DefaultBackground>
      <Title>Atividades</Title>
      <Paragraph>
        Atividades do dia{" "}
        {getActivityDate(`${activityDate.dateString}T03:00:00`)}
      </Paragraph>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {activitiesFromThisDate.map((activity, index) => (
          <Card
            key={`activity-${activity.id}`}
            title={activity.name}
            color={
              verifyIfIsActivityFinished(activity.finishDate)
                ? theme.colors.gray.gray2
                : getActivityColorByType(activity.type)
            }
            lines={[
              activity.subjectClass!.subject.name!,
              `${getGradingPercentage(
                activity.value
              )}% da Nota - ${getActivityDate(activity.finishDate)}`,
            ]}
          />
        ))}

        {importantDatesFromThisDate.map((importantDate, index) => (
          <Card
            key={`important-date-${importantDate.id}`}
            title={importantDate.name}
            color={getImportantColorByType(importantDate.type)}
            lines={[`${getActivityDate(importantDate.date)}`]}
          />
        ))}
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default ActivitiesDate;
