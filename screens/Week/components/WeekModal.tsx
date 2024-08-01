import React, { useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../../config/theme";
import styled from "styled-components/native";
import UserSubject from "../../../types/UserSubject";
import { useUser } from "../../../contexts/UserContext";
import { AvailableDay } from "../../../types/Subject";

const WeekViewContainer = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
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
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
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

const WeekModal = () => {
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

  const calculateDayHeight = (availableDay: AvailableDay) => {
    const hoursStart = parseInt(availableDay.start.slice(0, 2));
    const hoursEnd = parseInt(availableDay.end.slice(0, 2));

    const minutesStart = parseInt(availableDay.start.slice(3, 5));
    const minutesEnd = parseInt(availableDay.end.slice(3, 5));

    const start = hoursStart * 60 + minutesStart;
    const end = hoursEnd * 60 + minutesEnd;

    return `${(end - start) * 0.09583333333}%`;
  };

  const calculateDayTop = (availableDay: AvailableDay) => {
    const hoursStart = 6;
    const hoursEnd = parseInt(availableDay.start.slice(0, 2));

    const minutesStart = 0;
    const minutesEnd = parseInt(availableDay.start.slice(3, 5));

    const start = hoursStart * 60 + minutesStart;
    const end = hoursEnd * 60 + minutesEnd;

    return `${(end - start) * 0.09583333333}%`;
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
        padding: 8,
        backgroundColor: theme.colors.gray.gray1,
        flex: 1,
      }}
    >
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
            <WeekViewHeaderContainerText>06:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>07:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>08:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>09:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>10:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>11:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>12:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>13:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>14:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>15:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>16:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>17:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>18:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>19:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>20:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>21:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>22:00</WeekViewHeaderContainerText>
            <WeekViewHeaderContainerText>23:00</WeekViewHeaderContainerText>
          </WeekViewBodyTimeContainer>
          {days.map((dayString: string, index: number) => (
            <WeekViewBodyDayContainer key={`week-view-${dayString}`}>
              {now.getDay() - 1 === index ? (
                <NowMark
                  /* @ts-ignore */
                  style={{
                    top: calculateDayTop({
                      day: dayString,
                      start: `${now.getHours()}:${now.getMinutes()}`,
                      end: `${now.getHours()}:${now.getMinutes()}`,
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
