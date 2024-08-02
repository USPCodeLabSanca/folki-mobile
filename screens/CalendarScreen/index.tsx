import React from "react";
import DefaultBackground from "../../components/DefaultBackground";
import CalendarModal from "../../components/CalendarModel";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import CalendarComponent from "../../components/CalendarComponent";

const CalendarScreen = () => {
  return (
    <DefaultBackground>
      <CalendarComponent onDayPress={() => {}} />
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default CalendarScreen;
