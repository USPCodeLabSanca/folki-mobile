// ts-nocheck
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import theme from "../../config/theme";
import { useUser } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import getActivityColorByType from "../../utils/getActivityColorByType";
import getImportantColorByType from "../../utils/getImportantColorByType";

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

  const updateList = () => {
    const markedDates: any = {};

    userActivities.forEach((activity) => {
      let obj = { marked: true, color: getActivityColorByType(activity.type) };

      const date = activity.finishDate.substr(0, 10);

      if (!markedDates[date]) {
        markedDates[date] = { dots: [obj] };
        return;
      }

      markedDates[date].dots.push(obj);
    });

    importantDates.forEach((date) => {
      const obj = { marked: true, color: getImportantColorByType(date.type) };
      const dateFormatted = date.date.substr(0, 10);

      if (!markedDates[dateFormatted]) {
        markedDates[dateFormatted] = { dots: [obj] };
        return;
      }

      markedDates[dateFormatted].dots.push(obj);
    });

    setMarkedDates(markedDates);
  };

  useEffect(() => updateList(), [userActivities]);

  const isWebVersion = Platform.OS === "web";

  return (
    // @ts-ignore
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarList
        horizontal={true}
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
    </SafeAreaView>
  );
};

export default CalendarComponent;
