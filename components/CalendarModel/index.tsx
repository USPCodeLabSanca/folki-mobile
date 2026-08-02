// ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CalendarList, DateData, LocaleConfig } from "react-native-calendars";
import theme from "../../config/theme";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import getActivityColorByType from "../../utils/getActivityColorByType";
import getImportantColorByType from "../../utils/getImportantColorByType";
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
  const { userActivities, importantDates } = useUser();
  const [markedDates, setMarkedDates] = useState({});

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

    importantDates.forEach((importantDate) => {
      const obj = {
        marked: true,
        color: getImportantColorByType(importantDate.type),
      };

      const importantDateObj = parseUTCDate(importantDate.date);
      const year = importantDateObj.getFullYear();
      const month = String(importantDateObj.getMonth() + 1).padStart(2, "0");
      const day = String(importantDateObj.getDate()).padStart(2, "0");
      const date = `${year}-${month}-${day}`;

      if (!markedDates[date]) {
        markedDates[date] = { dots: [obj] };
        return;
      }

      markedDates[date].dots.push(obj);
    });
    setMarkedDates(markedDates);
  };

  useEffect(() => {
    updateList();
  }, [userActivities, importantDates]);

  const isWebVersion = Platform.OS === "web";

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

      <CalendarList
        key={JSON.stringify(markedDates)}
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

export default CalendarModal;
