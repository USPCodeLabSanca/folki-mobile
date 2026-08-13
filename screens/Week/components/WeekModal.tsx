import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../../config/theme";
import styled from "styled-components/native";
import UserSubject from "../../../types/UserSubject";
import { useUser } from "../../../contexts/UserContext";
import { AvailableDay } from "../../../types/Subject";
import Title from "../../../components/Title";

interface WeekModalProps {
  setIsWeekViewOpen: (open: boolean) => void;
  navigation: any;
}

const START_HOUR = 6;
const END_HOUR = 24;
const DEFAULT_HOUR_HEIGHT = 56;
const MIN_HOUR_HEIGHT = 40;
const MAX_HOUR_HEIGHT = 96;
const HOUR_HEIGHT_STEP = 8;

const WeekViewContainer = styled.View`
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding-horizontal: 8px;
`;

const WeekViewHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
`;

const WeekViewHeaderBlank = styled.View`
  width: 50px;
`;

const WeekViewHeaderContainerText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.gray.gray4};
  font-family: "Montserrat_400Regular";
`;

const WeekViewHeaderAll = styled.View`
  flex-direction: row;
  padding-bottom: 6px;
`;

const WeekViewBodyTimeContainer = styled.View`
  width: 50px;
  position: relative;
`;

const WeekViewBodyContainer = styled.View`
  flex-direction: row;
`;

const WeekViewBodyDayContainer = styled.View`
  flex: 1;
  position: relative;
  margin-horizontal: 4px;
`;

const WeekViewDay = styled.View`
  background-color: ${theme.colors.purple.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-horizontal: 3px;
  width: 100%;
  overflow: hidden;
`;

const WeekViewDayText = styled.Text`
  color: white;
  font-size: 7px;
  line-height: 9px;
  font-family: "Montserrat_500Medium";
  text-align: center;
  width: 100%;
`;

const WeekViewTimeText = styled.Text`
  color: #ffffff99;
  font-size: 6px;
  font-family: "Montserrat_400Regular";
  text-align: center;
  position: absolute;
`;

const NowMark = styled.View`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: red;
  z-index: 2;
`;

const days = ["seg", "ter", "qua", "qui", "sex"];

const WeekModal = ({ setIsWeekViewOpen, navigation }: WeekModalProps) => {
  const { userSubjects } = useUser();
  const [now, setNow] = useState(new Date());
  const [hourHeight, setHourHeight] = useState(DEFAULT_HOUR_HEIGHT);
  const { width, height } = useWindowDimensions();

  const pixelsPerMinute = hourHeight / 60;
  const scheduleHeight = (END_HOUR - START_HOUR) * hourHeight;

  const getDayClasses = (day: string, subjects: UserSubject[]) => {
    const result: UserSubject[] = [];

    for (const subject of subjects) {
      const subjectDays = subject.subjectClass.availableDays.map(
        (availableDay) => availableDay.day,
      );

      if (subjectDays.includes(day)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0",
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0",
      );
      return hourA - hourB;
    });
  };

  const getMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const calculateDayHeight = (availableDay: AvailableDay) => {
    const duration = getMinutes(availableDay.end) - getMinutes(availableDay.start);
    return Math.max(20, duration * pixelsPerMinute);
  };

  const calculateDayTop = (availableDay: AvailableDay) => {
    const startMinutes = START_HOUR * 60;
    return (getMinutes(availableDay.start) - startMinutes) * pixelsPerMinute;
  };

  const currentTimeTop =
    (now.getHours() * 60 + now.getMinutes() - START_HOUR * 60) *
    pixelsPerMinute;
  const isCurrentTimeInRange =
    now.getHours() >= START_HOUR && now.getHours() < END_HOUR;

  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, index) => START_HOUR + index,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const zoomOut = () => {
    setHourHeight((current) =>
      Math.max(MIN_HOUR_HEIGHT, current - HOUR_HEIGHT_STEP),
    );
  };

  const zoomIn = () => {
    setHourHeight((current) =>
      Math.min(MAX_HOUR_HEIGHT, current + HOUR_HEIGHT_STEP),
    );
  };

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        paddingTop: 18,
        paddingBottom: 18,
        paddingHorizontal: 0,
        backgroundColor: theme.colors.gray.gray1,
        flex: 1,
        zIndex: 999,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          minHeight: 40,
          paddingHorizontal: 18,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: -3 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Title>Aulas</Title>
        </View>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TouchableOpacity
            onPress={zoomOut}
            disabled={hourHeight === MIN_HOUR_HEIGHT}
            style={{
              backgroundColor: theme.colors.gray.gray2,
              width: 32,
              height: 32,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              opacity: hourHeight === MIN_HOUR_HEIGHT ? 0.4 : 1,
            }}
          >
            <Ionicons name="remove" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={zoomIn}
            disabled={hourHeight === MAX_HOUR_HEIGHT}
            style={{
              backgroundColor: theme.colors.gray.gray2,
              width: 32,
              height: 32,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              opacity: hourHeight === MAX_HOUR_HEIGHT ? 0.4 : 1,
            }}
          >
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsWeekViewOpen(false)}
            style={{
              backgroundColor: theme.colors.gray.gray2,
              width: 36,
              height: 36,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="list"
              size={20}
              color={theme.colors.gray.gray5}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsWeekViewOpen(true)}
            style={{
              backgroundColor: theme.colors.purple.light,
              width: 36,
              height: 36,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="calendar-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <WeekViewContainer>
        <WeekViewHeaderAll>
          <WeekViewHeaderBlank />
          <WeekViewHeaderContainer>
            <WeekViewHeaderContainerText>Seg</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Ter</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Qua</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Qui</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Sex</WeekViewHeaderContainerText>
          </WeekViewHeaderContainer>
        </WeekViewHeaderAll>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator
        >
          <WeekViewBodyContainer style={{ height: scheduleHeight }}>
            <WeekViewBodyTimeContainer>
              {hours.map((hour, index) => (
                <View
                  key={`hour-${hour}`}
                  style={{
                    position: "absolute",
                    top: index * hourHeight - (index === 0 ? 0 : 7),
                  }}
                >
                  <WeekViewHeaderContainerText>
                    {hour === 24 ? "00:00" : `${String(hour).padStart(2, "0")}:00`}
                  </WeekViewHeaderContainerText>
                </View>
              ))}
            </WeekViewBodyTimeContainer>

            {days.map((dayString, index) => (
              <WeekViewBodyDayContainer key={`week-view-${dayString}`}>
                {isCurrentTimeInRange && now.getDay() - 1 === index ? (
                  <NowMark style={{ top: currentTimeTop }} />
                ) : null}

                {getDayClasses(dayString, userSubjects).flatMap((userSubject) =>
                  userSubject.subjectClass.availableDays
                    .filter((dayFE) => dayFE.day === dayString)
                    .map((dayFE) => (
                      <WeekViewDay
                        key={`week-view-day-${dayString}-${userSubject.subjectClass.id}-${dayFE.start}`}
                        style={{
                          backgroundColor:
                            userSubject.color || theme.colors.purple.primary,
                          height: calculateDayHeight(dayFE),
                          top: calculateDayTop(dayFE),
                        }}
                      >
                        <WeekViewTimeText style={{ top: 2, left: 3 }}>
                          {dayFE.start}
                        </WeekViewTimeText>
                        <WeekViewTimeText style={{ bottom: 2, right: 3 }}>
                          {dayFE.end}
                        </WeekViewTimeText>
                        <WeekViewDayText numberOfLines={2} ellipsizeMode="tail">
                          {userSubject.subjectClass.subject.name}
                        </WeekViewDayText>
                      </WeekViewDay>
                    )),
                )}
              </WeekViewBodyDayContainer>
            ))}
          </WeekViewBodyContainer>
        </ScrollView>
      </WeekViewContainer>
    </SafeAreaView>
  );
};

export default WeekModal;
