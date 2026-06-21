import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import DefaultBackground from "../../components/DefaultBackground";
import { Linking, ScrollView, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import UserSubject from "../../types/UserSubject";
import { useUser } from "../../contexts/UserContext";
import { AvailableDay } from "../../types/Subject";
import WeekModal from "./components/WeekModal";
import theme from "../../config/theme";
import { useScreenTracking } from "../../hooks/useScreenTracking";

const days = [
  {
    long: "Segunda",
    short: "seg",
  },
  {
    long: "Terça",
    short: "ter",
  },
  {
    long: "Quarta",
    short: "qua",
  },
  {
    long: "Quinta",
    short: "qui",
  },
  {
    long: "Sexta",
    short: "sex",
  },
  {
    long: "Sábado",
    short: "sáb",
  },
];

const Week = () => {
  useScreenTracking("Week");
  const navigation = useNavigation();
  const { userSubjects, user } = useUser();
  const [isWeekViewOpen, setIsWeekViewOpen] = useState(false);

  const getTodayDayShort = () => {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const dayMap = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    if (today === 0) return "seg"; // Default to Monday on Sundays
    return dayMap[today];
  };

  const [selectedDay, setSelectedDay] = useState(getTodayDayShort());

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
          "0",
      );
      const hourB = parseInt(
        b.subjectClass.availableDays.find((dayF) => dayF.day === day)?.start ||
          "0",
      );
      return hourA - hourB;
    });
  };

  const openSubjectWebPage = async (subjectCode: string, day: AvailableDay) => {
    if (user?.university?.slug === "USP")
      await WebBrowser.openBrowserAsync(
        `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${subjectCode}`,
      );

    if (user?.university?.slug === "UFSCar") {
      const place = `São Carlos, UFSCar, ${day.classRoom}`;

      const url =
        "https://www.google.com/maps/search/?api=1&query=" + encodeURI(place);

      await Linking.openURL(url);
    }
  };

  const isClassHappeningNow = (dayShort: string, start: string, end: string) => {
    const now = new Date();
    const dayMap = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    const currentDayShort = dayMap[now.getDay()];

    if (currentDayShort !== dayShort) return false;

    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const nowTotal = currentHours * 60 + currentMinutes;
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    return nowTotal >= startTotal && nowTotal <= endTotal;
  };

  return (
    <>
      <DefaultBackground>
        {/* Header Row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            height: 40,
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
                backgroundColor: !isWeekViewOpen
                  ? theme.colors.purple.light
                  : theme.colors.gray.gray2,
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
                color={!isWeekViewOpen ? "white" : theme.colors.gray.gray5}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsWeekViewOpen(true)}
              style={{
                backgroundColor: isWeekViewOpen
                  ? theme.colors.purple.light
                  : theme.colors.gray.gray2,
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
                color={isWeekViewOpen ? "white" : theme.colors.gray.gray5}
              />
            </TouchableOpacity>
          </View>
        </View>

        {!isWeekViewOpen ? (
          <>
            {/* Weekdays bar */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 12,
                gap: 6,
              }}
            >
              {days.map((day) => {
                const isActive = selectedDay === day.short;
                return (
                  <TouchableOpacity
                    key={day.short}
                    onPress={() => setSelectedDay(day.short)}
                    style={{
                      flex: 1,
                      aspectRatio: 1,
                      borderRadius: 9999,
                      backgroundColor: isActive
                        ? theme.colors.purple.light
                        : theme.colors.gray.gray2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontFamily: isActive
                          ? "Montserrat_700Bold"
                          : "Montserrat_500Medium",
                      }}
                    >
                      {day.long.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Classes List */}
            <ScrollView contentContainerStyle={{ gap: 8 }}>
              {getDayClasses(selectedDay, userSubjects).length === 0 ? (
                <View
                  style={{
                    backgroundColor: theme.colors.gray.gray2,
                    padding: 24,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Paragraph>Sem aulas hoje \o/</Paragraph>
                </View>
              ) : (
                getDayClasses(selectedDay, userSubjects).map((subject) => {
                  const cards: any[] = [];

                  subject.subjectClass.availableDays.forEach((dayFE) => {
                    if (dayFE.day !== selectedDay) return;

                    const isNow = isClassHappeningNow(
                      selectedDay,
                      dayFE.start,
                      dayFE.end,
                    );

                    cards.push(
                      <View
                        key={`${selectedDay}-class-${subject.subjectClass.subject.id}-${dayFE.start}`}
                        style={{
                          flexDirection: "row",
                          alignItems: "stretch",
                          marginBottom: 12,
                        }}
                      >
                        {/* Timeline Column */}
                        <View
                          style={{
                            width: 60,
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingVertical: 4,
                            marginRight: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: isNow
                                ? theme.colors.purple.light
                                : "white",
                              fontSize: 12,
                              fontFamily: "Montserrat_700Bold",
                            }}
                          >
                            {dayFE.start}
                          </Text>

                          {/* Vertical axis line and dot */}
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              marginVertical: 4,
                              position: "relative",
                              width: 2,
                            }}
                          >
                            <View
                              style={{
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                width: 1,
                                backgroundColor: theme.colors.gray.gray3,
                              }}
                            />
                            <View
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: isNow
                                  ? theme.colors.purple.light
                                  : theme.colors.gray.gray5,
                                zIndex: 1,
                              }}
                            />
                          </View>

                          <Text
                            style={{
                              color: theme.colors.gray.gray5,
                              fontSize: 12,
                              fontFamily: "Montserrat_400Regular",
                            }}
                          >
                            {dayFE.end}
                          </Text>
                        </View>

                        {/* Card Column */}
                        <View style={{ flex: 1 }}>
                          <Card
                            onPress={() =>
                              openSubjectWebPage(
                                subject.subjectClass.subject.code!,
                                dayFE,
                              )
                            }
                            title={subject.subjectClass.subject.name}
                            color={theme.colors.gray.gray2}
                            borderColor={
                              isNow ? theme.colors.purple.light : undefined
                            }
                            badgeText={isNow ? "ACONTECENDO AGORA" : undefined}
                            badgeIcon={
                              isNow ? "chatbubble-ellipses-outline" : undefined
                            }
                            lines={[
                              `${subject.absences} Falta${
                                subject.absences !== 1 ? "s" : ""
                              }`,
                              dayFE.classRoom ? `BSI ${dayFE.classRoom}` : "",
                            ]}
                            linesIcons={["person-outline", "location-outline"]}
                          />
                        </View>
                      </View>,
                    );
                  });

                  return cards;
                })
              )}
            </ScrollView>
          </>
        ) : (
          <WeekModal
            setIsWeekViewOpen={setIsWeekViewOpen}
            navigation={navigation}
          />
        )}
      </DefaultBackground>
    </>
  );
};

export default Week;
