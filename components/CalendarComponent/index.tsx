// ts-nocheck
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import theme from "../../config/theme";
import { useUser } from "../../contexts/UserContext";
import getActivityColorByType from "../../utils/getActivityColorByType";
import getImportantColorByType from "../../utils/getImportantColorByType";
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

const CalendarComponent: React.FC<Props> = ({ onDayPress }: Props) => {
  const { userActivities, importantDates } = useUser();
  const [markedDates, setMarkedDates] = useState({});
  const [currentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const updateList = () => {
    const newMarkedDates: any = {};

    const addDot = (date: string, color: string) => {
      const dot = { marked: true, color };

      if (!newMarkedDates[date]) {
        newMarkedDates[date] = { dots: [dot] };
        return;
      }

      newMarkedDates[date].dots.push(dot);
    };

    userActivities
      .filter((activity) => !activity.deletedAt)
      .forEach((activity) => {
        const activityDate = parseUTCDate(activity.finishDate);
        const year = activityDate.getFullYear();
        const month = String(activityDate.getMonth() + 1).padStart(2, "0");
        const day = String(activityDate.getDate()).padStart(2, "0");

        addDot(
          `${year}-${month}-${day}`,
          getActivityColorByType(activity.type),
        );
      });

    importantDates.forEach((importantDate) => {
      const importantDateObj = parseUTCDate(importantDate.date);
      const year = importantDateObj.getFullYear();
      const month = String(importantDateObj.getMonth() + 1).padStart(2, "0");
      const day = String(importantDateObj.getDate()).padStart(2, "0");

      addDot(
        `${year}-${month}-${day}`,
        getImportantColorByType(importantDate.type),
      );
    });

    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    updateList();
  }, [userActivities, importantDates]);

  const isWebVersion = Platform.OS === "web";

  return (
    <View style={{ flex: 1 }}>
      <CalendarList
        key={`${currentDate}-${JSON.stringify(markedDates)}`}
        current={currentDate}
        horizontal={true}
        pagingEnabled
        pastScrollRange={0}
        futureScrollRange={12}
        scrollEnabled={true}
        style={{ width: Dimensions.get("window").width }}
        markedDates={markedDates}
        markingType={"multi-dot"}
        onDayPress={onDayPress}
        calendarHeight={Dimensions.get("window").height - 68 - 83}
        calendarWidth={Dimensions.get("window").width}
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
              height: (Dimensions.get("window").height - 68 - 83 - 160) / 6,
              alignItems: "center",
              justifyContent: "center",
            },
          },
        }}
      />
    </View>
  );
};

export default CalendarComponent;
