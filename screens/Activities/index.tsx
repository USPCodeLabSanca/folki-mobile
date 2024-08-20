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

  const subjects = [...new Set(userActivities.map((activity) => activity.subjectClass!.subject.name))];
  const types = [...new Set(userActivities.map((activity) => activity.type))];

  const [selectedSubjects, setSelectedSubjects] = useState(subjects);
  const [selectedTypes, setSelectedTypes] = useState(types);

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

  const toggleSubject = (subjectName) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter((subject) => subject !== subjectName));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const selectAllSubjects = () => {
    if (selectedSubjects.length === subjects.length) {
      setSelectedSubjects([]); // Deselect all if all are selected
    } else {
      setSelectedSubjects(subjects); // Select all
    }
  };

  const selectAllTypes = () => {
    if (selectedTypes.length === types.length) {
      setSelectedTypes([]); // Deselect all if all are selected
    } else {
      setSelectedTypes(types); // Select all
    }
  };

  const ActivitySection = ({
    title,
    activities,
    isOpen,
    toggleOpen,
    onCheck,
    onUncheck,
    onUpdate,
    onRemove,
    colorOverride,
  }) => (
    activities.length > 0 && (
      <View>
      <TouchableOpacity onPress={toggleOpen}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", padding: 12 }}>
          {isOpen ? "▼" : "►"} {title}
        </Text>
      </TouchableOpacity>
      {isOpen &&
        activities.map((activity) => (
          <View key={`activity-${activity.id}`} style={{ marginBottom: 8 }}>
            <Card
              title={activity.name}
              color={colorOverride || getActivityColorByType(activity.type)}
              middleLeftIcons={[
                activity.checked ? "checkbox-outline" : "square-outline",
              ]}
              middleLeftIconsOnPress={[
                activity.checked ? () => onUncheck(activity) : () => onCheck(activity),
              ]}
              topRightIcons={["pencil", "trash"]}
              topRightIconsOnPress={[
                () => onUpdate(activity),
                () => onRemove(activity),
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
    </View>)
  );

  const FilterScrollView = ({ items, selectedItems, toggleItem, selectAll }) => (
    <ScrollView horizontal style={{ marginVertical: 8 }}>
      <View style={{ marginHorizontal: 4 }}>
        <Button
          text="Tudo"
          onPress={selectAll}
          style={{
            backgroundColor:
              selectedItems.length === items.length
                ? theme.colors.purple.primary
                : theme.colors.gray.gray3,
          }}
          styleText={{ color: "white" }}
        />
      </View>
      {items.map((item, index) => (
        <View key={index} style={{ marginHorizontal: 4 }}>
          <Button
            text={item}
            onPress={() => toggleItem(item)}
            style={{
              backgroundColor: selectedItems.includes(item)
                ? theme.colors.purple.primary
                : theme.colors.gray.gray3,
            }}
            styleText={{ color: "white" }}
          />
        </View>
      ))}
    </ScrollView>
  );
  
  const remainingActivitiesNumber = getRemainingActivities().length;
  const filteredActivities = userActivities.filter(
    (activity) =>
      selectedSubjects.length > 0 &&
      selectedTypes.length > 0 &&
      selectedSubjects.includes(activity.subjectClass!.subject.name) &&
      selectedTypes.includes(activity.type)
  );

  return (
    <DefaultBackground>
      <Title>Atividades</Title>
      <Paragraph>
        {remainingActivitiesNumber} Atividade
        {remainingActivitiesNumber !== 1 ? "s" : ""} Restante
        {remainingActivitiesNumber !== 1 ? "s" : ""}!
      </Paragraph>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        <FilterScrollView
          items={subjects}
          selectedItems={selectedSubjects}
          toggleItem={toggleSubject}
          selectAll={selectAllSubjects}
        />

        <FilterScrollView
          items={types}
          selectedItems={selectedTypes}
          toggleItem={toggleType}
          selectAll={selectAllTypes}
        />
        <Button text="Adicionar Atividade" onPress={handleNewActivityPress} />

        <ActivitySection
          title="ATIVIDADES ATRASADAS"
          activities={filteredActivities.filter(
            (activity) =>
              !activity.checked &&
              verifyIfIsActivityFinished(activity.finishDate)
          )}
          isOpen={showLateActivities}
          toggleOpen={() => setShowLateActivities(!showLateActivities)}
          onCheck={check}
          onUncheck={uncheck}
          onUpdate={onUpdateActivityPress}
          onRemove={onRemoveActivityPress}
        />

        <ActivitySection
          title="ATIVIDADES"
          activities={filteredActivities.filter(
            (activity) =>
              !activity.checked &&
              !verifyIfIsActivityFinished(activity.finishDate)
          )}
          isOpen={showActivities}
          toggleOpen={() => setShowActivities(!showActivities)}
          onCheck={check}
          onUncheck={uncheck}
          onUpdate={onUpdateActivityPress}
          onRemove={onRemoveActivityPress}
        />

        <ActivitySection
          title="CONCLUÍDAS"
          activities={filteredActivities.filter((activity) => activity.checked)}
          isOpen={showCheckedActivities}
          toggleOpen={() => setShowCheckedActivities(!showCheckedActivities)}
          onCheck={check}
          onUncheck={uncheck}
          onUpdate={onUpdateActivityPress}
          onRemove={onRemoveActivityPress}
          colorOverride={theme.colors.gray.gray2}
        />
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
