// ts-nocheck
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DateData } from "react-native-calendars";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../Title";
import CalendarComponent from "../CalendarComponent";

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

        <Title style={{ marginBottom: 0 }}>Atividades</Title>
      </View>

      <CalendarComponent onDayPress={onDayPress} />
    </SafeAreaView>
  );
};

export default CalendarModal;
