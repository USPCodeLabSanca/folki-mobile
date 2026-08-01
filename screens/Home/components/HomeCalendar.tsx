import HomeCard from "./HomeCard";
import Paragraph from "../../../components/Paragraph";

const HomeCalendar = () => {
  return (
    <HomeCard
      title="Calendário"
      icon="calendar-outline"
      iconColor="#EC4899"
      iconContainerColor="#3A2535"
      navigationTarget="CalendarScreen"
    >
      <Paragraph>Visão geral por mês</Paragraph>
    </HomeCard>
  );
};

export default HomeCalendar;
