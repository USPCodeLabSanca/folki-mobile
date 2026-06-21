import React, { useEffect, useMemo } from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
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

const WeekViewContainer = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
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
`;

const WeekViewBodyTimeContainer = styled.View`
  width: 50px;
  position: relative;
  margin-top: 6px;
`;

const WeekViewBodyContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const WeekViewBodyDayContainer = styled.View`
  flex: 1;
  position: relative;
  margin-horizontal: 4px;
  margin-top: 6px;
`;

const WeekViewDay = styled.View`
  background-color: ${theme.colors.purple.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-horizontal: 3px;
  width: 100%;
`;

const WeekViewDayText = styled.Text`
  color: white;
  font-size: 6px;
  font-family: "Montserrat_400Regular";
  text-align: center;
`;

const WeekViewTimeText = styled.Text`
  color: #ffffff99;
  font-size: 5px;
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
const totalHours = 18;

const WeekModal = ({ setIsWeekViewOpen, navigation }: WeekModalProps) => {
  const { userSubjects } = useUser();
  const [now, setNow] = React.useState(new Date());

  const getDayClasses = (day: string, subjects: UserSubject[]) => {
    const result: UserSubject[] = [];

    for (const subject of subjects) {
      const days: string[] = [];

      subject.subjectClass.availableDays.map((day) => {
        days.push(day.day);
      });

      if (days.includes(day)) {
        result.push(subject);
      }
    }

    return result.sort((a, b) => {
      const hourA = parseInt(
        a.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0"
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0"
      );
      return hourA - hourB;
    });
  };
  
  const firstHour = useMemo(
    () => {
      const allMinutes = userSubjects
        .flatMap((s) => s.subjectClass.availableDays)
        .map((d) => parseInt(d.start.slice(0, 2)) * 60 + parseInt(d.start.slice(3, 5)));
      return Math.floor((allMinutes.length ? Math.min(...allMinutes)/60 : 6));
    },
    [userSubjects]
  );

  const totalMinutes = totalHours * 60;

  const calculateDayHeight = (d: AvailableDay) => {
    const start = Number(d.start.slice(0, 2)) * 60 + Number(d.start.slice(3, 5));
    const end = Number(d.end.slice(0, 2)) * 60 + Number(d.end.slice(3, 5));
    return `${((end - start) / totalMinutes) * 100}%`;
  };

  const calculateDayTop = (d: AvailableDay) => {
    const start = Number(d.start.slice(0, 2)) * 60 + Number(d.start.slice(3, 5));
    return `${((start - firstHour * 60) / totalMinutes) * 100}%`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        paddingTop: 18,
        paddingBottom: 18,
        paddingHorizontal: 0,
        backgroundColor: theme.colors.gray.gray1,
        flex: 1,
        zIndex: 999,
      }}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          height: 40,
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

        <View style={{ flexDirection: "row", gap: 8 }}>
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
            <Ionicons
              name="calendar-outline"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <WeekViewContainer>
        <WeekViewHeaderAll>
          <WeekViewHeaderBlank></WeekViewHeaderBlank>
          <WeekViewHeaderContainer>
            <WeekViewHeaderContainerText>Seg</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Ter</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Qua</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Qui</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>Sex</WeekViewHeaderContainerText>
          </WeekViewHeaderContainer>
        </WeekViewHeaderAll>
        <WeekViewBodyContainer>
          <WeekViewBodyTimeContainer>
              {Array.from(
                { length: totalHours },
                (_, i) =>
                  firstHour + i < 24 && (
                    <WeekViewHeaderContainerText
                      key={i}
                      style={{
                        position: "absolute",
                        top: `${(i / totalHours) * 100}%`
                      }}
                    >
                      {String(firstHour + i).padStart(2, "0") + ":00"}
                    </WeekViewHeaderContainerText>
                  )
              )}
          </WeekViewBodyTimeContainer>
          {days.map((dayString: string, index: number) => (
            <WeekViewBodyDayContainer key={`week-view-${dayString}`}>
              {now.getDay() - 1 === index ? (
                <NowMark
                  style={{
                    top: calculateDayTop({
                      day: dayString,
                      start: now.toTimeString().slice(0, 5),
                      end: now.toTimeString().slice(0, 5),
                    }),
                  }}
                />
              ) : null}
              {getDayClasses(dayString, userSubjects).map(
                (userSubject: UserSubject) => {
                  const views: any[] = [];

                  userSubject.subjectClass.availableDays.forEach((dayFE) => {
                    if (dayFE.day !== dayString) return;
                    views.push(
                      <WeekViewDay
                        key={`week-view-day-${dayString}-${Math.random()}`}
                        // @ts-ignore
                        style={{
                          backgroundColor:
                            userSubject.color || theme.colors.purple.primary,
                          height: calculateDayHeight(dayFE),
                          top: calculateDayTop(dayFE),
                        }}
                      >
                        <WeekViewTimeText style={{ top: 3, left: 3 }}>
                          {dayFE.start}
                        </WeekViewTimeText>
                        <WeekViewTimeText style={{ bottom: 3, right: 3 }}>
                          {dayFE.end}
                        </WeekViewTimeText>
                        <WeekViewDayText>
                          {userSubject.subjectClass.subject.name}
                        </WeekViewDayText>
                      </WeekViewDay>
                    );
                  });

                  return views;
                }
              )}
            </WeekViewBodyDayContainer>
          ))}
        </WeekViewBodyContainer>
      </WeekViewContainer>
    </SafeAreaView>
  );
};

export default WeekModal;
