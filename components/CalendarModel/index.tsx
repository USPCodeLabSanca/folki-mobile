// ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import theme from "../../config/theme";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import getActivityColorByType from "../../utils/getActivityColorByType";
import parseUTCDate from "../../utils/parseUTCDate";
import Title from "../Title";

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
  onClose: () => void;
  paddingTop?: string | number;
}

const CalendarModal: React.FC<Props> = ({
  paddingTop,
  onDayPress,
  onClose,
}: Props) => {
  const { userActivities } = useUser();
  const [markedDates, setMarkedDates] = useState({});
  const [calendarHeight, setCalendarHeight] = useState(0);
  const { width: windowWidth } = useWindowDimensions();

  const updateList = () => {
    const markedDates: any = {};

    const activeActivities = userActivities.filter(
      (activity) => !activity.deletedAt
    );

    activeActivities.forEach((activity) => {
      const obj = {
        marked: true,
        color: getActivityColorByType(activity.type),
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

      markedDates[date].dots.push(obj);
    });

    console.log("Marked dates:", markedDates);
    setMarkedDates(markedDates);
  };

  useEffect(() => {
    updateList();
  }, [userActivities]);

  const isWebVersion = Platform.OS === "web";
  const dayHeight = Math.max(32, (calendarHeight - 160) / 6);

  return (
    // @ts-ignore
    <SafeAreaView style={[styles.container, { paddingTop }]}>
      <View
        style={{
          width: "100%",
          height: 58,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 18,
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Voltar para atividades"
        >
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Title style={{ marginBottom: 0 }}>
          Atividades
        </Title>
      </View>

      <View
        style={{ flex: 1 }}
        onLayout={(event) => setCalendarHeight(event.nativeEvent.layout.height)}
      >
        {calendarHeight > 0 && (
          <CalendarList
            key={JSON.stringify(markedDates)}
            horizontal={true}
            pagingEnabled
            scrollEnabled={true}
            style={{ width: windowWidth, height: calendarHeight }}
            markedDates={markedDates}
            markingType={"multi-dot"}
            onDayPress={onDayPress}
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
    </SafeAreaView>
  );
};

export default CalendarModal;
