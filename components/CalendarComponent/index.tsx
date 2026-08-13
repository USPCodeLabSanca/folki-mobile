// ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Platform, View, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import theme from "../../config/theme";
import { useUser } from "../../contexts/UserContext";
import parseUTCDate from "../../utils/parseUTCDate";

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt";

interface Props {
  onDayPress: (date: DateData) => void;
}

const MAX_ACTIVITY_DOTS_PER_DAY = 3;
const MAX_CALENDAR_DOTS_PER_DAY = 4;

const getCalendarActivityColorByType = (type: string) => {
  switch (type) {
    case "EXAM":
      return "#4ADE80";
    case "HOMEWORK":
      return "#FACC15";
    case "ACTIVITY":
      return "#38BDF8";
    case "LIST":
      return "#A78BFA";
    default:
      return "#E879F9";
  }
};

const getCalendarImportantColorByType = (type: string) =>
  type === "DAY_OFF" ? "#FB7185" : "#4ADE80";

const CalendarComponent: React.FC<Props> = ({ onDayPress }: Props) => {
  const { userActivities, importantDates } = useUser();
  const [markedDates, setMarkedDates] = useState({});
  const [calendarHeight, setCalendarHeight] = useState(0);
  const { width: windowWidth } = useWindowDimensions();
  const calendarRef = useRef<any>(null);
  const visibleMonthRef = useRef<string | null>(null);
  const previousWindowWidthRef = useRef(windowWidth);
  const [currentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const updateList = () => {
    const markedDates: any = {};

    const activeActivities = userActivities.filter(
      (activity) => !activity.deletedAt
    );

    activeActivities.forEach((activity) => {
      const obj = {
        marked: true,
        color: getCalendarActivityColorByType(activity.type),
      };

      const activityDate = parseUTCDate(activity.finishDate);

      const year = activityDate.getFullYear();
      const month = String(activityDate.getMonth() + 1).padStart(2, "0");
      const day = String(activityDate.getDate()).padStart(2, "0");

      const date = `${year}-${month}-${day}`;

      if (!markedDates[date]) {
        markedDates[date] = { dots: [obj] };
        return;
      }

      if (markedDates[date].dots.length < MAX_ACTIVITY_DOTS_PER_DAY) {
        markedDates[date].dots.push(obj);
      }
    });

    importantDates.forEach((importantDate) => {
      const obj = {
        marked: true,
        color: getCalendarImportantColorByType(importantDate.type),
      };

      const importantDateObj = parseUTCDate(importantDate.date);

      const year = importantDateObj.getFullYear();
      const month = String(importantDateObj.getMonth() + 1).padStart(2, "0");
      const day = String(importantDateObj.getDate()).padStart(2, "0");

      const dateFormatted = `${year}-${month}-${day}`;

      if (!markedDates[dateFormatted]) {
        markedDates[dateFormatted] = { dots: [obj] };
        return;
      }

      if (markedDates[dateFormatted].dots.length < MAX_CALENDAR_DOTS_PER_DAY) {
        markedDates[dateFormatted].dots.push(obj);
      }
    });

    setMarkedDates(markedDates);
  };

  useEffect(() => {
    updateList();
  }, [userActivities, importantDates]);

  const isWebVersion = Platform.OS === "web";
  const dayHeight = Math.max(32, (calendarHeight - 160) / 6);

  useEffect(() => {
    if (!isWebVersion || previousWindowWidthRef.current === windowWidth) return;

    previousWindowWidthRef.current = windowWidth;

    if (visibleMonthRef.current) {
      calendarRef.current?.scrollToMonth(visibleMonthRef.current);
    }
  }, [isWebVersion, windowWidth]);

  const handleVisibleMonthsChange = (months: DateData[]) => {
    if (months[0]?.dateString) {
      visibleMonthRef.current = months[0].dateString;
    }
  };

  const handleWebArrowLeft = (_method: () => void, month: any) => {
    if (!isWebVersion || !month) return;

    const previousMonth = month.clone().addMonths(-1, true);
    const previousMonthDate = previousMonth.toString("yyyy-MM-dd");
    const firstAvailableMonth = currentDate.slice(0, 7);

    if (previousMonthDate.slice(0, 7) < firstAvailableMonth) return;

    if (previousMonthDate.slice(0, 7) === firstAvailableMonth) {
      calendarRef.current?.scrollToDay(
        `${firstAvailableMonth}-01`,
        1,
        false,
      );
      return;
    }

    calendarRef.current?.scrollToMonth(previousMonthDate);
  };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => setCalendarHeight(event.nativeEvent.layout.height)}
    >
      {calendarHeight > 0 && (
        <CalendarList
          ref={calendarRef}
          key={`${currentDate}-${windowWidth}-${JSON.stringify(markedDates)}`}
          current={currentDate}
          horizontal={true}
          pagingEnabled
          pastScrollRange={0}
          futureScrollRange={12}
          scrollEnabled={true}
          style={{ width: windowWidth, height: calendarHeight }}
          markedDates={markedDates}
          markingType={"multi-dot"}
          onDayPress={onDayPress}
          onVisibleMonthsChange={handleVisibleMonthsChange}
          onPressArrowLeft={handleWebArrowLeft}
          calendarHeight={calendarHeight}
          calendarWidth={windowWidth}
          hideArrows={!isWebVersion}
          renderArrow={(direction: string) =>
            direction === "left" ? (
              <MaterialIcons name="chevron-left" size={24} color="white" />
            ) : (
              <MaterialIcons name="chevron-right" size={24} color="white" />
            )
          }
          theme={{
            backgroundColor: theme.colors.gray.gray1,
            calendarBackground: theme.colors.gray.gray1,
            todayTextColor: "#3FA14C",
            dayTextColor: "white",
            monthTextColor: "white",
            textDayFontFamily: "Montserrat_400Regular",
            textDayFontSize: 20,
            textMonthFontFamily: "Montserrat_700Bold",
            // @ts-ignore
            "stylesheet.day.basic": {
              base: {
                height: dayHeight,
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
      )}
    </View>
  );
};

export default CalendarComponent;
