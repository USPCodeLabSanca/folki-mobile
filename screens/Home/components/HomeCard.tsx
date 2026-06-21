import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../../config/theme";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface HomeCardProps {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  iconContainerColor?: string;
  iconColor?: string;
  navigationTarget?: string;
  badge?: { text: string; backgroundColor: string; textColor: string };
  hideChevron?: boolean;
  children?: React.ReactNode;
}

const HomeCardContainer = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 8px;
  gap: 8px;
`;

const HomeCardTouchable = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray2};
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 8px;
  gap: 8px;
`;

const HomeCardTitle = styled.Text`
  font-size: 20px;
  font-family: Montserrat_600SemiBold;
  color: white;
`;

const HomeCardTitleIconContainer = styled.View<{ hideTitle: boolean }>`
  background-color: ${theme.colors.gray.gray3};
  padding: 8px;
  border-radius: 12px;
  margin-right: ${({ hideTitle }) => (hideTitle ? "0px" : "12px")};
`;

const HomeCardTitleContainer = styled.View<{ isTitleEmpty: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isTitleEmpty }) =>
    isTitleEmpty ? "center" : "space-between"};
`;

const HomeCardTitleLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HomeCardBadge = styled.View<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 8px;
`;

const HomeCardBadgeText = styled.Text<{ color: string }>`
  font-size: 10px;
  font-family: Montserrat_500Medium;
  color: ${(props) => props.color};
`;

const HomeCard = ({
  title,
  icon,
  iconContainerColor,
  iconColor,
  navigationTarget,
  badge,
  hideChevron,
  children,
}: HomeCardProps) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    if (navigationTarget && hideChevron) {
      navigation.navigate(navigationTarget as never);
    }
  };

  const Container =
    hideChevron && navigationTarget ? HomeCardTouchable : HomeCardContainer;

  return (
    <Container
      onPress={hideChevron && navigationTarget ? handleCardPress : undefined}
    >
      <HomeCardTitleContainer isTitleEmpty={!title}>
        <HomeCardTitleLeft>
          {icon && (
            <HomeCardTitleIconContainer
              hideTitle={!title}
              style={{
                backgroundColor: iconContainerColor ?? theme.colors.gray.gray3,
              }}
            >
              <Ionicons
                name={icon}
                size={26}
                color={iconColor ?? theme.colors.gray.gray5}
              />
            </HomeCardTitleIconContainer>
          )}
          {title && <HomeCardTitle>{title}</HomeCardTitle>}
          {badge && (
            <HomeCardBadge backgroundColor={badge.backgroundColor}>
              <HomeCardBadgeText color={badge.textColor}>
                {badge.text}
              </HomeCardBadgeText>
            </HomeCardBadge>
          )}
        </HomeCardTitleLeft>
        {navigationTarget && !hideChevron && (
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationTarget as never)}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.gray.gray5}
            />
          </TouchableOpacity>
        )}
      </HomeCardTitleContainer>
      {children}
    </Container>
  );
};

export default HomeCard;
