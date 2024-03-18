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

const ActivitiesDate = ({ route }: any) => {
  const { activityDate } = route.params;
  const { userActivities } = useUser();

  const activitiesFromThisDate: Activity[] = [];

  userActivities.forEach((activity) => {
    if (
      new Date(activity.finishDate).getDate() === activityDate.day &&
      new Date(activity.finishDate).getMonth() === activityDate.month - 1 &&
      new Date(activity.finishDate).getFullYear() === activityDate.year
    ) {
      activitiesFromThisDate.push(activity);
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
              activity.userSubject?.subject.name!,
              `${getGradingPercentage(
                activity.value
              )}% da Nota - ${getActivityDate(activity.finishDate)}`,
            ]}
          />
        ))}
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default ActivitiesDate;
