import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../../components/Logo";
import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import getWeekDay from "../../../utils/getWeekDay";
import styled from "styled-components/native";
import theme from "../../../config/theme";
import { useNavigation } from "@react-navigation/native";

interface HomeHeaderProps {
  userName: string;
  universitySlug: string;
}

const HomeHeaderViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const HomeHeaderViewLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ButtonNavigation = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray2};
  width: 40px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ButtonNavigationRedDot = styled.View`
  background-color: ${theme.colors.red.red1};
  width: 7px;
  height: 7px;
  border-radius: 100px;
  position: absolute;
  top: 6px;
  right: 6px;
`;

const HomeHeader = ({ userName, universitySlug }: HomeHeaderProps) => {
  const navigation = useNavigation();

  const generateWeekDayText = () => {
    const day =
      getWeekDay().full.charAt(0).toUpperCase() + getWeekDay().full.slice(1);
    const otherString =
      day.includes("Sábado") || day.includes("Domingo") ? "Outro" : "Outra";

    return `${otherString} ${day} na ${universitySlug}!`;
  };

  return (
    <HomeHeaderViewContainer>
      <HomeHeaderViewLeftContainer>
        <Logo size={50} />
        <View>
          <Title fontSize={22} marginBottom={4}>
            Olá, {userName.split(" ")[0]}!
          </Title>
          <SubTitle fontSize={16} marginBottom={0}>
            {generateWeekDayText()}
          </SubTitle>
        </View>
      </HomeHeaderViewLeftContainer>
      <ButtonNavigation onPress={() => navigation.navigate("Notifications" as never)}>
        <Ionicons
          name="notifications-outline"
          size={26}
          color={theme.colors.gray.gray5}
        />
        <ButtonNavigationRedDot />
      </ButtonNavigation>
    </HomeHeaderViewContainer>
  );
};

export default HomeHeader;
