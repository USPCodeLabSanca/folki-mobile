import styled from "styled-components/native";
import HomeCard from "./HomeCard";
import Paragraph from "../../../components/Paragraph";

const QuickAccessGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

const QuickAccessCardContainer = styled.View`
  flex: 1;
`;

const HomeQuickAccess = () => {
  return (
    <>
      <QuickAccessGrid>
        <QuickAccessCardContainer>
          <HomeCard
            title="Notas"
            icon="school-outline"
            iconColor="#10B981"
            iconContainerColor="#1A3A3A"
            navigationTarget="Grade"
            hideChevron={true}
          />
        </QuickAccessCardContainer>

        <QuickAccessCardContainer>
          <HomeCard
            title="Faltas"
            icon="alert-circle-outline"
            iconColor="#EF4444"
            iconContainerColor="#3A2525"
            navigationTarget="Absences"
            hideChevron={true}
          />
        </QuickAccessCardContainer>
      </QuickAccessGrid>
      <QuickAccessGrid>
        <QuickAccessCardContainer>
          <HomeCard
            title="Agenda"
            icon="calendar-outline"
            iconColor="#EC4899"
            iconContainerColor="#3A2535"
            navigationTarget="Calendar"
            hideChevron={true}
          />
        </QuickAccessCardContainer>

        <QuickAccessCardContainer>
          <HomeCard
            title=""
            icon="settings-outline"
            iconColor="#9CA3AF"
            iconContainerColor="#2A2A2A"
            navigationTarget="Settings"
            hideChevron={true}
          />
        </QuickAccessCardContainer>
      </QuickAccessGrid>
    </>
  );
};

export default HomeQuickAccess;
