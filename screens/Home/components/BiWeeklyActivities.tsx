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
  const getBiWeeklyActivities = (activitiesList: Activity[]) => {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 14);

    return activitiesList
      .filter((activity) => {
        const date = parseUTCDate(activity.finishDate);
        return date >= startDate && date <= endDate && !activity.deletedAt;
      })
      .sort((a, b) => {
        const dateA = parseUTCDate(a.finishDate);
        const dateB = parseUTCDate(b.finishDate);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const getTimeRemaining = (finishDate: string) => {
    const now = new Date();
    const finish = parseUTCDate(finishDate);

    if (finish < now) {
      return "Vencido";
    }

    const diffMs = finish.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
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
          biWeeklyActivities.map((activity) => (
            <Card
              key={`activity-${activity.id}`}
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
                  <StatusValue completed={activity.completed}>
                    {activity.completed ? "Concluído" : "Pendente"}
                  </StatusValue>
                </StatusBox>
              }
            />
          ))
        ) : (
          <Paragraph>Sem atividades nos próximos 14 dias</Paragraph>
        )}
      </HomeCard>
    </>
  );
};

export default BiWeeklyActivities;
