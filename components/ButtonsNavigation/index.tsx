import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../config/theme";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
`;

const ButtonsNavigationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 6px;
  border-radius: 100px;
  background-color: ${theme.colors.gray.gray2};
  width: fit-content;
  margin-top: 6px;
`;

const ButtonNavigation = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray1};
  width: 32px;
  height: 32px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 6px;
`;

/*
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Groups"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Groups" as never)}
        >
          <Ionicons
            name="people-outline"
            size={22}
            color={route.name === "Groups" ? "white" : theme.colors.gray.gray2}
          />
        </ButtonNavigation>
*/

const ButtonsNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Container>
      <ButtonsNavigationContainer>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Home"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Home" as never)}
        >
          <Ionicons
            name="home"
            size={22}
            color={route.name === "Home" ? "white" : theme.colors.gray.gray2}
          />
        </ButtonNavigation>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Board"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Board" as never)}
        >
          <Ionicons
            name="chatbox-outline"
            size={22}
            color={
              route.name === "Board" ? "white" : theme.colors.gray.gray2
            }
          />
        </ButtonNavigation>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Week"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Week" as never)}
        >
          <Ionicons
            name="list-outline"
            size={22}
            color={route.name === "Week" ? "white" : theme.colors.gray.gray2}
          />
        </ButtonNavigation>

        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Calendar"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Calendar" as never)}
        >
          <Ionicons
            name="calendar-outline"
            size={22}
            color={
              route.name === "Calendar" ? "white" : theme.colors.gray.gray2
            }
          />
        </ButtonNavigation>

        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Activities"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Activities" as never)}
        >
          <Ionicons
            name="bookmark"
            size={22}
            color={
              route.name === "Activities" ? "white" : theme.colors.gray.gray2
            }
          />
        </ButtonNavigation>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Absences"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Absences" as never)}
        >
          <Ionicons
            name="bag-outline"
            size={22}
            color={
              route.name === "Absences" ? "white" : theme.colors.gray.gray2
            }
          />
        </ButtonNavigation>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Grade"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Grade" as never)}
        >
          <Ionicons
            name="file-tray-full-outline"
            size={22}
            color={route.name === "Grade" ? "white" : theme.colors.gray.gray2}
          />
        </ButtonNavigation>
        <ButtonNavigation
          style={{
            backgroundColor:
              route.name === "Settings"
                ? theme.colors.purple.primary
                : theme.colors.gray.gray1,
          }}
          onPress={() => navigation.navigate("Settings" as never)}
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={
              route.name === "Settings" ? "white" : theme.colors.gray.gray2
            }
          />
        </ButtonNavigation>
      </ButtonsNavigationContainer>
    </Container>
  );
};

export default ButtonsNavigation;
