import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import Starter from "./screens/Starter";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Activities from "./screens/Activities";
import CreateActivity from "./screens/CreateActivity";
import Absences from "./screens/Absences";
import AbsenceList from "./screens/AbsenceList";
import Drive from "./screens/Drive";
import DriveList from "./screens/DriveList";
import Groups from "./screens/Groups";
import Group from "./screens/Group";
import Week from "./screens/Week";
import Verification from "./screens/Verification";
import Toast from "react-native-toast-message";
import { UserProvider } from "./contexts/UserContext";
import Settings from "./screens/Settings";
import Contact from "./screens/Contact";
import ActivitiesDate from "./screens/ActivitiesDate";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setNavigationBarTransparent();
  }, []);

  const setNavigationBarTransparent = () => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("transparent");
  };

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, animation: "none" }}
          >
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Week" component={Week} />

            <Stack.Screen name="Starter" component={Starter} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen name="Activities" component={Activities} />
            <Stack.Screen name="ActivitiesDate" component={ActivitiesDate} />
            <Stack.Screen name="CreateActivity" component={CreateActivity} />

            <Stack.Screen name="Absences" component={Absences} />
            <Stack.Screen name="AbsenceList" component={AbsenceList} />

            <Stack.Screen name="Drive" component={Drive} />
            <Stack.Screen name="DriveList" component={DriveList} />

            <Stack.Screen name="Groups" component={Groups} />
            <Stack.Screen name="Group" component={Group} />

            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Contact" component={Contact} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </>
  );
}
