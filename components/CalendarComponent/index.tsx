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
  initialVisibleMonth?: string;
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

const CalendarComponent: React.FC<Props> = ({ 
  onDayPress, initialVisibleMonth,
}: Props) => {
  const { userActivities, importantDates } = useUser();
  const [markedDates, setMarkedDates] = useState({});
  const [calendarHeight, setCalendarHeight] = useState(0);
  const { width: windowWidth } = useWindowDimensions();
  const calendarRef = useRef<any>(null);
  const visibleMonthRef = useRef<string | null>(
    initialVisibleMonth ?? null,
  );
  const previousWindowWidthRef = useRef(windowWidth);
  const [currentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const [visibleMonth, setVisibleMonth] = useState(
  initialVisibleMonth ?? currentDate,
);

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

  const isAtCurrentMonth =
  visibleMonth.slice(0, 7) === currentDate.slice(0, 7);

  useEffect(()=>{
    if (!initialVisibleMonth || calendarHeight <= 0) return;
      visibleMonthRef.current = initialVisibleMonth;
      setVisibleMonth(initialVisibleMonth);
      calendarRef.current?.scrollToMonth(initialVisibleMonth);
  }, [initialVisibleMonth, calendarHeight]);

  useEffect(() => {
    if (!isWebVersion || previousWindowWidthRef.current === windowWidth) return;

    previousWindowWidthRef.current = windowWidth;

    if (visibleMonthRef.current) {
      calendarRef.current?.scrollToMonth(visibleMonthRef.current);
    }
  }, [isWebVersion, windowWidth]);
  

  const handleVisibleMonthsChange = (months: DateData[]) => {
  /*
   * Recupera a data do primeiro mês visível.
   */
  const newVisibleMonth = months[0]?.dateString;
    if (!newVisibleMonth) return;
    visibleMonthRef.current = newVisibleMonth;
    setVisibleMonth(newVisibleMonth);
  };

  const handleArrowLeft = (_method: () => void, month: any) => {
    if (!month) return;

    const previousMonth = month.clone().addMonths(-1, true);

    const previousMonthDate =
      previousMonth.toString("yyyy-MM-dd");

    const currentMonth = currentDate.slice(0, 7);

    if (previousMonthDate.slice(0, 7) < currentMonth) {
      return;
    }
    visibleMonthRef.current = previousMonthDate;
    setVisibleMonth(previousMonthDate);
    if (previousMonthDate.slice(0, 7) === currentMonth) {
      calendarRef.current?.scrollToDay(
        `${currentMonth}-01`,
        1,
        false
      );

      return;
    }
    calendarRef.current?.scrollToMonth(previousMonthDate);
  };

  const handleArrowRight = (_method: () => void, month: any) => {
    if (!month) return;

    const nextMonth = month.clone().addMonths(1, true);

    const nextMonthDate =
      nextMonth.toString("yyyy-MM-dd");

    visibleMonthRef.current = nextMonthDate;
    setVisibleMonth(nextMonthDate);
    calendarRef.current?.scrollToMonth(nextMonthDate);
  };

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => setCalendarHeight(event.nativeEvent.layout.height)}
    >
      {calendarHeight > 0 && (
        <CalendarList
          ref={calendarRef}
          key={`${currentDate}-${windowWidth}`}
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
          onPressArrowLeft={handleArrowLeft}
          onPressArrowRight={handleArrowRight}
          calendarHeight={calendarHeight}
          calendarWidth={windowWidth}
          hideArrows={false}
          disableArrowLeft={isAtCurrentMonth}
          renderArrow={(direction: string) => {
            const hideLeftArrow =
              direction === "left" && isAtCurrentMonth;
            return (
              <MaterialIcons
                name={
                  direction === "left"
                    ? "chevron-left"
                    : "chevron-right"
                }
                size={24}
                color={hideLeftArrow ? "transparent" : "white"}
              />
            );
          }}
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
