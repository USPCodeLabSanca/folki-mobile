import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import calculateSemester from "../../../utils/calculateSemester";
import theme from "../../../config/theme";

interface HomeProgressProps {
  universitySlug: string;
}

const HomeProgressContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const HomeProgressTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const HomeProgressText = styled.Text`
  font-family: Montserrat_400Regular;
  color: ${theme.colors.gray.gray5};
  font-size: 14px;
`;

const HomeProgressTextLeft = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const HomeProgressPercentageText = styled.Text`
  font-family: Montserrat_700Bold;
  color: ${theme.colors.purple.light};
  font-size: 14px;
`;

const HomeProgressBarContainer = styled.View`
  background-color: ${theme.colors.gray.gray2};
  height: 8px;
  border-radius: 4px;
  margin-top: 4px;
`;

const HomeProgressBarFill = styled.View`
  background-color: ${theme.colors.purple.light};
  height: 8px;
  border-radius: 4px;
`;

const HomeProgress = ({ universitySlug }: HomeProgressProps) => {
  const progressPercentage = calculateSemester(universitySlug);
  return (
    <HomeProgressContainer>
      <HomeProgressTextContainer>
        <HomeProgressTextLeft>
          <Ionicons
            name="analytics-outline"
            size={20}
            color={theme.colors.purple.light}
          />
          <HomeProgressText>Progresso do Semestre</HomeProgressText>
        </HomeProgressTextLeft>
        <HomeProgressPercentageText>
          {progressPercentage}%
        </HomeProgressPercentageText>
      </HomeProgressTextContainer>
      <HomeProgressBarContainer>
        <HomeProgressBarFill style={{ width: `${progressPercentage}%` }} />
      </HomeProgressBarContainer>
    </HomeProgressContainer>
  );
};

export default HomeProgress;
