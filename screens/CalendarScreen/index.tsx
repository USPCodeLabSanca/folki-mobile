import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import CalendarComponent from "../../components/CalendarComponent";
import { DateData } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  const navigation = useNavigation();

  const onDayPress = (date: DateData) => {
    console.log(date);
    // @ts-ignore
    navigation.navigate("ActivitiesDate", {
      activityDate: date,
    });
  };

  return (
    <DefaultBackground style={{ paddingHorizontal: 0 }}>
      <CalendarComponent onDayPress={onDayPress} />
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default CalendarScreen;
