import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import CalendarComponent from "../../components/CalendarComponent";
import { DateData } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useScreenTracking } from "../../hooks/useScreenTracking";

const CalendarScreen = () => {
  useScreenTracking("Calendar");
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
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 12,
          height: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Calendário</Title>
      </View>
      <CalendarComponent onDayPress={onDayPress} />
    </DefaultBackground>
  );
};

export default CalendarScreen;
