import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import CalendarComponent from "../../components/CalendarComponent";
import { DateData } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useScreenTracking } from "../../hooks/useScreenTracking";
import goBackOrHome from "../../utils/goBackOrHome";

//usar a lógica para não dar erro de quando clicarmos num dia num mês aleatório, quando voltarmos para o calendário, voltarmos ao mês que estávamos olhando, e não o atual
// logo a lógica deve ser: clicar num dia-> pegar o mês que o user está vendo-> salvar esse mês-> acessar as atividades referente ao dia clicado
const CalendarScreen = ({route}:any) => {
  useScreenTracking("Calendar"); 
  const navigation = useNavigation<any>();

  const savedVisibleMonth: string | undefined =
    route.params?.visibleMonth; //vamos salvar o mês atual, se route.params existir, pega o mês atual, caso contrário, retorna undefined mas sem dar erro
  
  //ao clicar no dia vamos salvar o mês atual e só depois navegar para as atividades daquele dia.
  const onDayPress = (date: DateData) => {
    navigation.setParams({
      visibleMonth: date.dateString,
    })

  navigation.navigate("ActivitiesDate",{
    activityDate: date,
  })
  };

  return (
    <DefaultBackground style={{ paddingHorizontal: 0 }}>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 12,
          height: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => goBackOrHome(navigation)}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Calendário</Title>
      </View>
      {Platform.OS === "web" ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, minHeight: 520 }}
        >
          <CalendarComponent 
          initialVisibleMonth={savedVisibleMonth}
          onDayPress={onDayPress} />
        </ScrollView>
      ) : (
        <CalendarComponent initialVisibleMonth={savedVisibleMonth} onDayPress={onDayPress} />
      )}
    </DefaultBackground>
  );
};

export default CalendarScreen;
