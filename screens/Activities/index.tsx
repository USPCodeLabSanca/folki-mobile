import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { useUser } from "../../contexts/UserContext";
import getGradingPercentage from "../../utils/getGradingPercentage";
import getActivityDate from "../../utils/getActivityDate";
import getActivityColorByType from "../../utils/getActivityColorByType";
import verifyIfIsActivityFinished from "../../utils/verifyIfIsActivityFinished";
import theme from "../../config/theme";
import apiClient from "../../clients/apiClient";
import Activity from "../../types/Activity";
import CalendarModal from "../../components/CalendarModel";
import FloatRight from "./components/FloatRight";
import { DateData } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Activities = () => {
  const { userActivities, token, setUserActivities } = useUser();
  const navigation = useNavigation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showLateActivities, setShowLateActivities] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const [showCheckedActivities, setShowCheckedActivities] = useState(true);

  const handleNewActivityPress = () => {
    // @ts-ignore
    navigation.navigate("CreateActivity");
  };

  const getRemainingActivities = () => {
    return userActivities.filter(
      (activity) => !verifyIfIsActivityFinished(activity.finishDate)
    );
  };

  const removeFromUserActivities = (activity: Activity) => {
    setUserActivities(userActivities.filter((act) => act.id !== activity.id));
  };

  const removeActivityNotification = async (activity: Activity) => {
    const notificationIdentifier = await AsyncStorage.getItem(
      `activity-notification-${activity.id}`
    );
    if (notificationIdentifier) {
      await Notifications.cancelScheduledNotificationAsync(
        notificationIdentifier
      );
      await AsyncStorage.removeItem(`activity-notification-${activity.id}`);
    }
  };

  const onRemoveActivityPress = async (activity: Activity) => {
    removeFromUserActivities(activity);
    try {
      await apiClient.removeActivity(activity.id.toString(), token!);
      await removeActivityNotification(activity);
    } catch (error: any) {
      console.error(error);
    }
  };

  const onUpdateActivityPress = (activity: Activity) => {
    // @ts-ignore
    navigation.navigate("CreateActivity", {
      activity,
    });
  };

  const onDayPress = (date: DateData) => {
    console.log(date);
    // @ts-ignore
    navigation.navigate("ActivitiesDate", {
      activityDate: date,
    });
  };

  const check = async (activity: Activity) => {
    const newActivity = { ...activity, checked: true };
    const newActivities = userActivities.map((act) =>
      act.id === activity.id ? newActivity : act
    );
    setUserActivities(newActivities);

    try {
      await apiClient.checkActivity(activity.id.toString(), token!);
    } catch (error: any) {
      console.error(error);
    }
  };

  const uncheck = async (activity: Activity) => {
    const newActivity = { ...activity, checked: false };
    const newActivities = userActivities.map((act) =>
      act.id === activity.id ? newActivity : act
    );
    setUserActivities(newActivities);

    try {
      await apiClient.uncheckActivity(activity.id.toString(), token!);
    } catch (error: any) {
      console.error(error);
    }
  };

  const remainingActivitiesNumber = getRemainingActivities().length;

  const lateActivities = userActivities.filter(
    (activity) =>
      !activity.checked &&
      verifyIfIsActivityFinished(activity.finishDate)
  );

  const ongoingActivities = userActivities.filter(
    (activity) =>
      !activity.checked &&
      !verifyIfIsActivityFinished(activity.finishDate)
  );

  const checkedActivities = userActivities.filter((activity) => activity.checked);

  return (
    <DefaultBackground>
      <Title>Atividades</Title>
      <Paragraph>
        {remainingActivitiesNumber} Atividade
        {remainingActivitiesNumber !== 1 ? "s" : ""} Restante
        {remainingActivitiesNumber !== 1 ? "s" : ""}!
      </Paragraph>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        <Button text="Adicionar Atividade" onPress={handleNewActivityPress} />

        {lateActivities.length > 0 && (
          <View>
            <TouchableOpacity
              onPress={() => setShowLateActivities(!showLateActivities)}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color:"white", padding: 12}}>
                {showLateActivities ? "▼" : "►"} ATIVIDADES ATRASADAS
              </Text>
            </TouchableOpacity>
            {showLateActivities &&
              lateActivities.map((activity) => (
                <View key={`late-${activity.id}`} style={{ marginBottom: 8 }}>
                  <Card
                    title={activity.name}
                    color={getActivityColorByType(activity.type)}
                    middleLeftIcons={[
                      activity.checked ? "checkbox-outline" : "square-outline",
                    ]}
                    middleLeftIconsOnPress={[
                      activity.checked
                        ? () => uncheck(activity)
                        : () => check(activity),
                    ]}
                    topRightIcons={["pencil", "trash"]}
                    topRightIconsOnPress={[
                      () => onUpdateActivityPress(activity),
                      () => onRemoveActivityPress(activity),
                    ]}
                    lines={[
                      activity.subjectClass!.subject.name!,
                      `${getGradingPercentage(activity.value)}% da Nota - ${getActivityDate(
                        activity.finishDate
                      )}`,
                    ]}
                  />
                </View>
              ))}
          </View>
        )}

        <View>
          <TouchableOpacity
            onPress={() => setShowActivities(!showActivities)}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color:"white", padding: 12}}>
              {showActivities ? "▼" : "►"} ATIVIDADES
            </Text>
          </TouchableOpacity>
          {showActivities &&
            ongoingActivities.map((activity) => (
                <View key={`late-${activity.id}`} style={{ marginBottom: 8 }}>
                  <Card
                    title={activity.name}
                    color={getActivityColorByType(activity.type)}
                    middleLeftIcons={[
                      activity.checked ? "checkbox-outline" : "square-outline",
                    ]}
                    middleLeftIconsOnPress={[
                      activity.checked
                        ? () => uncheck(activity)
                        : () => check(activity),
                    ]}
                    topRightIcons={["pencil", "trash"]}
                    topRightIconsOnPress={[
                      () => onUpdateActivityPress(activity),
                      () => onRemoveActivityPress(activity),
                    ]}
                    lines={[
                      activity.subjectClass!.subject.name!,
                      `${getGradingPercentage(activity.value)}% da Nota - ${getActivityDate(
                        activity.finishDate
                      )}`,
                    ]}
                  />
                </View>
              ))}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => setShowCheckedActivities(!showCheckedActivities)}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", padding: 12}}>
              {showCheckedActivities ? "▼" : "►"} CONCLUÍDAS
            </Text>
          </TouchableOpacity>
          {showCheckedActivities &&
            checkedActivities.map((activity) => (
                <View key={`late-${activity.id}`} style={{ marginBottom: 8 }}>
                  <Card
                    title={activity.name}
                    color={theme.colors.gray.gray2}
                    middleLeftIcons={[
                      activity.checked ? "checkbox-outline" : "square-outline",
                    ]}
                    middleLeftIconsOnPress={[
                      activity.checked
                        ? () => uncheck(activity)
                        : () => check(activity),
                    ]}
                    topRightIcons={["pencil", "trash"]}
                    topRightIconsOnPress={[
                      () => onUpdateActivityPress(activity),
                      () => onRemoveActivityPress(activity),
                    ]}
                    lines={[
                      activity.subjectClass!.subject.name!,
                      `${getGradingPercentage(activity.value)}% da Nota - ${getActivityDate(
                        activity.finishDate
                      )}`,
                    ]}
                  />
                </View>
              ))}
        </View>
      </ScrollView>
      <FloatRight
        onPress={() => setIsCalendarOpen(!isCalendarOpen)}
        isCalendarOpen={isCalendarOpen}
      />
      <ButtonsNavigation />
      {isCalendarOpen && <CalendarModal onDayPress={onDayPress} />}
    </DefaultBackground>
  );
};

export default Activities;
