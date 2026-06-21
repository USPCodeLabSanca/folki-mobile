import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import theme from "../../config/theme";
import { useScreenTracking } from "../../hooks/useScreenTracking";

interface NotificationItem {
  id: string;
  textParts: { text: string; bold?: boolean }[];
}

interface NotificationSection {
  title: string;
  items: NotificationItem[];
}

const mockNotifications: NotificationSection[] = [
  {
    title: "HOJE",
    items: [
      {
        id: "1",
        textParts: [
          {
            text: 'A data da atividade "P1" de "Matrizes, Vetores e Geometria Analítica" foi alterada para ',
          },
          { text: "01 de abril", bold: true },
        ],
      },
      {
        id: "2",
        textParts: [
          { text: "Seu post no mural recebeu um " },
          { text: "novo comentário", bold: true },
          { text: " de Lucien Franzen" },
        ],
      },
    ],
  },
  {
    title: "ONTEM",
    items: [
      {
        id: "3",
        textParts: [
          {
            text: 'A atividade "Trabalho 1" de "Introdução a Ciência da Computação I" ',
          },
          { text: "vence hoje.", bold: true },
        ],
      },
    ],
  },
  {
    title: "28 DE MARÇO",
    items: [
      {
        id: "4",
        textParts: [
          { text: "Aviso! Você " },
          { text: "não pode faltar", bold: true },
          { text: ' na aula de hoje de "Cálculo I"' },
        ],
      },
    ],
  },
];

const Notifications = () => {
  useScreenTracking("Notifications");
  const navigation = useNavigation();

  return (
    <DefaultBackground>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 20,
          height: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Notificações</Title>
      </View>

      {/* Notifications Scroll */}
      <ScrollView contentContainerStyle={{ gap: 20 }}>
        {mockNotifications.map((section) => (
          <View key={section.title} style={{ gap: 12 }}>
            {/* Section Title */}
            <Text
              style={{
                color: theme.colors.gray.gray5,
                fontSize: 14,
                fontFamily: "Montserrat_700Bold",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {section.title}
            </Text>

            {/* Section Items */}
            <View style={{ gap: 10 }}>
              {section.items.map((item) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: theme.colors.gray.gray2,
                    padding: 16,
                    borderRadius: 16,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "Montserrat_400Regular",
                      lineHeight: 20,
                    }}
                  >
                    {item.textParts.map((part, index) => (
                      <Text
                        key={index}
                        style={{
                          fontFamily: part.bold
                            ? "Montserrat_700Bold"
                            : "Montserrat_400Regular",
                        }}
                      >
                        {part.text}
                      </Text>
                    ))}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </DefaultBackground>
  );
};

export default Notifications;
