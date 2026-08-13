import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import Activity from "../../../types/Activity";
import HomeCard from "./HomeCard";
import Card from "../../../components/Card";
import Paragraph from "../../../components/Paragraph";
import theme from "../../../config/theme";
import parseUTCDate from "../../../utils/parseUTCDate";

interface BiWeeklyActivitiesProps {
  activities: Activity[];
}

const VISIBLE_ACTIVITY_COUNT = 4;
const ACTIVITY_CARD_ESTIMATED_HEIGHT = 82;
const ACTIVITY_CARD_GAP = 8;
const ACTIVITY_LIST_MAX_HEIGHT =
  VISIBLE_ACTIVITY_COUNT * ACTIVITY_CARD_ESTIMATED_HEIGHT +
  (VISIBLE_ACTIVITY_COUNT - 1) * ACTIVITY_CARD_GAP;

const StatusBox = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatusLabel = styled.Text`
  font-size: 10px;
  font-family: Montserrat_500Medium;
  color: white;
`;

const StatusValue = styled.Text<{ completed: boolean }>`
  font-size: 12px;
  font-family: Montserrat_600SemiBold;
  color: ${({ completed }) => (completed ? "#10B981" : "#E18336")};
`;

const BiWeeklyActivities = ({ activities }: BiWeeklyActivitiesProps) => {
  const getCalendarDayValue = (date: Date) =>
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  const getBiWeeklyActivities = (activitiesList: Activity[]) => {
    const today = new Date();
    const startDay = getCalendarDayValue(today);
    const endDay = startDay + 14 * 24 * 60 * 60 * 1000;

    return activitiesList
      .filter((activity) => {
        const activityDay = getCalendarDayValue(parseUTCDate(activity.finishDate));
        return activityDay >= startDay && activityDay <= endDay && !activity.deletedAt;
      })
      .sort((a, b) => {
        const dateA = parseUTCDate(a.finishDate);
        const dateB = parseUTCDate(b.finishDate);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const getTimeRemaining = (finishDate: string) => {
    const today = new Date();
    const finish = parseUTCDate(finishDate);
    const diffDays = Math.round(
      (getCalendarDayValue(finish) - getCalendarDayValue(today)) /
        (24 * 60 * 60 * 1000),
    );

    if (diffDays < 0) return "Vencido";
    if (diffDays === 0) return "Vence hoje";
    if (diffDays === 1) return "Vence amanhã";
    return `Vence em ${diffDays} dias`;
  };

  const biWeeklyActivities = getBiWeeklyActivities(activities);

  return (
    <>
      <HomeCard
        title="Atividades"
        icon="document-text-outline"
        iconColor="#E18336"
        iconContainerColor="#32251E"
        navigationTarget="Activities"
      >
        {biWeeklyActivities.length ? (
          <>
            <Paragraph>Estas são suas atividades dos próximos 14 dias.</Paragraph>
            <ScrollView
              style={{ maxHeight: ACTIVITY_LIST_MAX_HEIGHT }}
              contentContainerStyle={{ gap: ACTIVITY_CARD_GAP }}
              nestedScrollEnabled
              showsVerticalScrollIndicator={biWeeklyActivities.length > VISIBLE_ACTIVITY_COUNT}
            >
              {biWeeklyActivities.map((activity) => (
                <View key={`activity-${activity.id}`}>
                  <Card
                    title={activity.name}
                    color={theme.colors.gray.gray1}
                    lines={[
                      activity.subjectClass?.subject.name || "",
                      getTimeRemaining(activity.finishDate),
                      activity.value ? `${activity.userValue}/${activity.value}` : "",
                    ]}
                    linesIcons={[
                      "folder-outline",
                      "time-outline",
                      "triangle-outline",
                    ]}
                    rightItem={
                      <StatusBox>
                        <StatusLabel>Status</StatusLabel>
                        <StatusValue completed={!!activity.checked}>
                          {activity.checked ? "Concluído" : "Pendente"}
                        </StatusValue>
                      </StatusBox>
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <Paragraph>Sem atividades nos próximos 14 dias</Paragraph>
        )}
      </HomeCard>
    </>
  );
};

export default BiWeeklyActivities;
