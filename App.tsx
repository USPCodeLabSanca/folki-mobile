import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
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
import Grade from "./screens/Grade";
import GradeList from "./screens/GradeList";
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
import CalendarScreen from "./screens/CalendarScreen";
import Welcome from "./screens/Welcome";
import { PaperProvider, MD3DarkTheme as PaperDarkMode } from "react-native-paper";
import { Helmet, HelmetProvider } from "react-helmet-async";


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setNavigationBarTransparent();
  }, []);

  const setNavigationBarTransparent = () => {
    if (Platform.OS !== 'web') {
      NavigationBar.setPositionAsync("absolute");
      NavigationBar.setBackgroundColorAsync("transparent");
    }
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
    <HelmetProvider>
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon-167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Folki" />
      </Helmet>
    <>
      <StatusBar style="light" />
      <PaperProvider theme={PaperDarkMode}>
        <UserProvider>
          <NavigationContainer
            documentTitle={{
            formatter: () => `Folki`
          }}>
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name="Verification" component={Verification} />
              <Stack.Screen name="Home" component={Home} />

              <Stack.Screen name="Week" component={Week} />
              <Stack.Screen name="Calendar" children={CalendarScreen} />

              <Stack.Screen name="Starter" component={Starter} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Welcome" component={Welcome} />

              <Stack.Screen name="Activities" component={Activities} />
              <Stack.Screen name="ActivitiesDate" component={ActivitiesDate} />
              <Stack.Screen name="CreateActivity" component={CreateActivity} />

              <Stack.Screen name="Absences" component={Absences} />
              <Stack.Screen name="AbsenceList" component={AbsenceList} />

              <Stack.Screen name="Grade" component={Grade} />
              <Stack.Screen name="GradeList" component={GradeList} />

              <Stack.Screen name="Groups" component={Groups} />
              <Stack.Screen name="Group" component={Group} />

              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Contact" component={Contact} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </UserProvider>
      </PaperProvider>
    </>
    </HelmetProvider>
  );
}
