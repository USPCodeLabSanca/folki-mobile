import React, { useEffect, useMemo, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Linking,
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
  onBack: () => void;
}

const FALLBACK_START_MINUTES = 6 * 60;
const FALLBACK_END_MINUTES = 24 * 60;
const BEFORE_FIRST_CLASS_MINUTES = 2 * 60;
const AFTER_LAST_CLASS_MINUTES = 60;
const DEFAULT_HOUR_HEIGHT = 56;
const MIN_HOUR_HEIGHT = 40;
const MAX_HOUR_HEIGHT = 120;
const HOUR_HEIGHT_STEP = 8;
const SCHEDULE_FIT_PADDING = 16;
const ZOOM_STORAGE_KEY_PREFIX = "weekScheduleZoom";
const MIN_SUBJECT_FONT_SIZE = 5;
const MAX_SUBJECT_FONT_SIZE = 16;
const SUBJECT_TEXT_VERTICAL_PADDING = 22;

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

const WeekViewDay = styled.TouchableOpacity`
  background-color: ${theme.colors.purple.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding-horizontal: 3px;
  width: 100%;
  overflow: hidden;
`;

const WeekViewDayText = styled.Text<{ fontSize: number; lineHeight: number }>`
  color: white;
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
  font-family: "Montserrat_500Medium";
  text-align: center;
  width: 100%;
`;

const WeekViewTimeText = styled.Text<{ fontSize: number }>`
  color: #ffffff99;
  font-size: ${({ fontSize }) => fontSize}px;
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

const darkenHexColor = (color: string, factor = 0.3) => {
  const normalized = color.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return color;
  }

  const channels = [0, 2, 4].map((offset) =>
    Math.round(parseInt(normalized.slice(offset, offset + 2), 16) * (1 - factor)),
  );

  return `#${channels
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
};

const WeekModal = ({ setIsWeekViewOpen, onBack }: WeekModalProps) => {
  const { user, userSubjects } = useUser();
  const [now, setNow] = useState(new Date());
  const [hourHeight, setHourHeight] = useState(DEFAULT_HOUR_HEIGHT);
  const [scheduleViewportHeight, setScheduleViewportHeight] = useState(0);
  const [hasLoadedStoredZoom, setHasLoadedStoredZoom] = useState(false);
  const [hasStoredZoom, setHasStoredZoom] = useState(false);
  const { width, height } = useWindowDimensions();
  const zoomScale = Math.sqrt(hourHeight / DEFAULT_HOUR_HEIGHT);
  const baseSubjectFontSize = Math.max(
    7,
    Math.min(
      MAX_SUBJECT_FONT_SIZE,
      Math.round(width * 0.009 * zoomScale),
    ),
  );
  const timeFontSize = Math.max(
    6,
    Math.min(11, Math.round(width * 0.006 * zoomScale)),
  );

  const pixelsPerMinute = hourHeight / 60;

  const getMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const { scheduleStartMinutes, scheduleEndMinutes } = useMemo(() => {
    const weekClasses: AvailableDay[] = userSubjects.flatMap(
      (subject: UserSubject) =>
        subject.subjectClass.availableDays.filter((availableDay: AvailableDay) =>
          days.includes(availableDay.day),
        ),
    );

    if (weekClasses.length === 0) {
      return {
        scheduleStartMinutes: FALLBACK_START_MINUTES,
        scheduleEndMinutes: FALLBACK_END_MINUTES,
      };
    }

    const firstClassMinutes = Math.min(
      ...weekClasses.map((availableDay) => getMinutes(availableDay.start)),
    );
    const lastClassMinutes = Math.max(
      ...weekClasses.map((availableDay) => getMinutes(availableDay.end)),
    );

    return {
      scheduleStartMinutes: Math.max(
        0,
        firstClassMinutes - BEFORE_FIRST_CLASS_MINUTES,
      ),
      scheduleEndMinutes: Math.min(
        24 * 60,
        lastClassMinutes + AFTER_LAST_CLASS_MINUTES,
      ),
    };
  }, [userSubjects]);

  const scheduleDurationMinutes = scheduleEndMinutes - scheduleStartMinutes;
  const scheduleHeight = scheduleDurationMinutes * pixelsPerMinute;

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

  const openSubjectWebPage = async (
    subjectCode: string,
    day: AvailableDay,
  ) => {
    if (user?.university?.slug === "USP") {
      await WebBrowser.openBrowserAsync(
        `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${subjectCode}`,
      );
    }

    if (user?.university?.slug === "UFSCar") {
      const place = `São Carlos, UFSCar, ${day.classRoom}`;
      const url =
        "https://www.google.com/maps/search/?api=1&query=" + encodeURI(place);
      await Linking.openURL(url);
    }
  };

  const calculateDayHeight = (availableDay: AvailableDay) => {
    const duration = getMinutes(availableDay.end) - getMinutes(availableDay.start);
    return Math.max(20, duration * pixelsPerMinute);
  };

  const calculateDayTop = (availableDay: AvailableDay) =>
    (getMinutes(availableDay.start) - scheduleStartMinutes) * pixelsPerMinute;

  const estimateWrappedLines = (text: string, charsPerLine: number) => {
    const words = text.trim().split(/\s+/);
    let lines = 1;
    let currentLineLength = 0;

    for (const word of words) {
      if (word.length > charsPerLine) {
        const extraLines = Math.floor(word.length / charsPerLine);
        lines += extraLines;
        currentLineLength = word.length % charsPerLine;
        continue;
      }

      const nextLength = currentLineLength === 0
        ? word.length
        : currentLineLength + 1 + word.length;

      if (nextLength <= charsPerLine) {
        currentLineLength = nextLength;
      } else {
        lines += 1;
        currentLineLength = word.length;
      }
    }

    return lines;
  };

  const getSubjectTextMetrics = (
    subjectName: string,
    availableDay: AvailableDay,
  ) => {
    const dayColumnWidth = Math.max(1, (width - 106) / days.length);
    const textWidth = Math.max(1, dayColumnWidth - 6);
    const cardHeight = calculateDayHeight(availableDay);
    const availableTextHeight = Math.max(
      1,
      cardHeight - SUBJECT_TEXT_VERTICAL_PADDING,
    );

    let fontSize = baseSubjectFontSize;

    while (fontSize > MIN_SUBJECT_FONT_SIZE) {
      const lineHeight = fontSize + 3;
      const charsPerLine = Math.max(
        1,
        Math.floor(textWidth / (fontSize * 0.58)),
      );
      const neededLines = estimateWrappedLines(subjectName, charsPerLine);
      const availableLines = Math.max(
        1,
        Math.floor(availableTextHeight / lineHeight),
      );

      if (neededLines <= availableLines) {
        break;
      }

      fontSize -= 0.5;
    }

    return {
      fontSize,
      lineHeight: fontSize + 3,
    };
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentTimeTop =
    (currentMinutes - scheduleStartMinutes) * pixelsPerMinute;
  const clampedCurrentTimeTop = Math.max(
    0,
    Math.min(Math.max(0, scheduleHeight - 2), currentTimeTop),
  );

  const firstHourLabel = Math.ceil(scheduleStartMinutes / 60);
  const lastHourLabel = Math.floor(scheduleEndMinutes / 60);
  const hours = Array.from(
    { length: Math.max(0, lastHourLabel - firstHourLabel + 1) },
    (_, index) => firstHourLabel + index,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadStoredZoom = async () => {
      setHasLoadedStoredZoom(false);
      setHasStoredZoom(false);

      if (!user?.id) {
        if (isActive) {
          setHasLoadedStoredZoom(true);
        }
        return;
      }

      try {
        const storedZoom = await AsyncStorage.getItem(
          `${ZOOM_STORAGE_KEY_PREFIX}:${user.id}`,
        );
        const parsedZoom = Number(storedZoom);
        const isValidStoredZoom =
          storedZoom !== null &&
          Number.isFinite(parsedZoom) &&
          parsedZoom >= MIN_HOUR_HEIGHT &&
          parsedZoom <= MAX_HOUR_HEIGHT;

        if (isActive && isValidStoredZoom) {
          setHourHeight(parsedZoom);
          setHasStoredZoom(true);
        }
      } catch (error) {
        console.warn("Failed to load weekly schedule zoom", error);
      } finally {
        if (isActive) {
          setHasLoadedStoredZoom(true);
        }
      }
    };

    loadStoredZoom();

    return () => {
      isActive = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (
      !hasLoadedStoredZoom ||
      hasStoredZoom ||
      scheduleViewportHeight <= 0 ||
      scheduleDurationMinutes <= 0
    ) {
      return;
    }

    const fittedHourHeight =
      ((scheduleViewportHeight - SCHEDULE_FIT_PADDING) * 60) /
      scheduleDurationMinutes;

    setHourHeight(
      Math.max(
        MIN_HOUR_HEIGHT,
        Math.min(MAX_HOUR_HEIGHT, Math.round(fittedHourHeight)),
      ),
    );
  }, [
    hasLoadedStoredZoom,
    hasStoredZoom,
    scheduleViewportHeight,
    scheduleDurationMinutes,
    scheduleStartMinutes,
    scheduleEndMinutes,
  ]);

  const saveZoom = async (zoom: number) => {
    setHourHeight(zoom);
    setHasStoredZoom(true);

    if (user?.id) {
      try {
        await AsyncStorage.setItem(
          `${ZOOM_STORAGE_KEY_PREFIX}:${user.id}`,
          String(zoom),
        );
      } catch (error) {
        console.warn("Failed to save weekly schedule zoom", error);
      }
    }
  };

  const zoomOut = () => {
    const nextZoom = Math.max(
      MIN_HOUR_HEIGHT,
      hourHeight - HOUR_HEIGHT_STEP,
    );
    saveZoom(nextZoom);
  };

  const zoomIn = () => {
    const nextZoom = Math.min(
      MAX_HOUR_HEIGHT,
      hourHeight + HOUR_HEIGHT_STEP,
    );
    saveZoom(nextZoom);
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
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ marginTop: -3, zIndex: 10 }}
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
          onLayout={(event) =>
            setScheduleViewportHeight(event.nativeEvent.layout.height)
          }
        >
          <WeekViewBodyContainer style={{ height: scheduleHeight }}>
            <WeekViewBodyTimeContainer>
              {hours.map((hour) => (
                <View
                  key={`hour-${hour}`}
                  style={{
                    position: "absolute",
                    top: Math.min(
                      Math.max(0, scheduleHeight - 14),
                      Math.max(
                        0,
                        (hour * 60 - scheduleStartMinutes) * pixelsPerMinute -
                          7,
                      ),
                    ),
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
                {now.getDay() - 1 === index ? (
                  <NowMark style={{ top: clampedCurrentTimeTop }} />
                ) : null}

                {getDayClasses(dayString, userSubjects).flatMap((userSubject) =>
                  userSubject.subjectClass.availableDays
                    .filter((dayFE) => dayFE.day === dayString)
                    .map((dayFE) => {
                      const subjectName = userSubject.subjectClass.subject.name;
                      const textMetrics = getSubjectTextMetrics(subjectName, dayFE);

                      return (
                        <WeekViewDay
                          key={`week-view-day-${dayString}-${userSubject.subjectClass.id}-${dayFE.start}`}
                          activeOpacity={0.8}
                          onPress={() =>
                            openSubjectWebPage(
                              userSubject.subjectClass.subject.code!,
                              dayFE,
                            )
                          }
                          style={{
                            backgroundColor: darkenHexColor(
                            userSubject.color || theme.colors.purple.primary,
                          ),
                            height: calculateDayHeight(dayFE),
                            top: calculateDayTop(dayFE),
                          }}
                        >
                          <WeekViewTimeText
                            fontSize={timeFontSize}
                            style={{ top: 2, left: 3 }}
                          >
                            {dayFE.start}
                          </WeekViewTimeText>
                          <WeekViewTimeText
                            fontSize={timeFontSize}
                            style={{ bottom: 2, right: 3 }}
                          >
                            {dayFE.end}
                          </WeekViewTimeText>
                          <WeekViewDayText
                            fontSize={textMetrics.fontSize}
                            lineHeight={textMetrics.lineHeight}
                          >
                            {subjectName}
                          </WeekViewDayText>
                        </WeekViewDay>
                      );
                    }),
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
