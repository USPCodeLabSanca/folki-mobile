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
import SendEmail from "./screens/SendEmail";
import AuthCode from "./screens/AuthCode";
import SetName from "./screens/SetName";
import SelectCampus from "./screens/SelectCampus";
import SelectInstitute from "./screens/SelectInstitute";
import SelectCourse from "./screens/SelectCourse";
import SelectPeriod from "./screens/SelectPeriod";
import SelectSubjects from "./screens/SelectSubjects";
import AddNewSubjects from "./screens/AddNewSubjects";
import SelectClasses from "./screens/SelectClasses";
import Home from "./screens/Home";
import Activities from "./screens/Activities";

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Starter" component={Starter} />
          <Stack.Screen name="SendEmail" component={SendEmail} />
          <Stack.Screen name="AuthCode" component={AuthCode} />
          <Stack.Screen name="SetName" component={SetName} />
          <Stack.Screen name="SelectCampus" component={SelectCampus} />
          <Stack.Screen name="SelectInstitute" component={SelectInstitute} />
          <Stack.Screen name="SelectCourse" component={SelectCourse} />
          <Stack.Screen name="SelectPeriod" component={SelectPeriod} />
          <Stack.Screen name="SelectSubjects" component={SelectSubjects} />
          <Stack.Screen name="AddNewSubjects" component={AddNewSubjects} />
          <Stack.Screen name="SelectClasses" component={SelectClasses} />

          <Stack.Screen name="Activities" component={Activities} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
