import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView, View, TouchableOpacity } from "react-native";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import FilterModal from "./components/FilterModal";
import { useUser } from "../../contexts/UserContext";
import verifyIfIsActivityFinished from "../../utils/verifyIfIsActivityFinished";
import theme from "../../config/theme";
import apiClient from "../../clients/apiClient";
import Activity from "../../types/Activity";
import CalendarModal from "../../components/CalendarModel";
import FloatRight from "./components/FloatRight";
import { DateData } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActivitySection from "./components/ActivitySection";
import UnmadeRemoveModal from "./components/UnmadeRemoveModal";
import RemoveActivityModal from "./components/RemoveActivityModal";
import ExplanationModal from "./components/ExplanationModal";

const Activities = () => {
  const { userActivities, token, setUserActivities } = useUser();
  const navigation = useNavigation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showLateActivities, setShowLateActivities] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const [showCheckedActivities, setShowCheckedActivities] = useState(true);
  const [showDeletedActivities, setShowDeletedActivities] = useState(true);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const subjects = [
    ...new Set(
      userActivities.map((activity) => activity.subjectClass!.subject.name)
    ),
  ];
  const types = [...new Set(userActivities.map((activity) => activity.type))];

  const [selectedSubjects, setSelectedSubjects] = useState(subjects);
  const [selectedTypes, setSelectedTypes] = useState(types);

  const [unmadeActivity, setUnmadeActivity] = useState<Activity | null>(null);
  const [activityToRemove, setActivityToRemove] = useState<Activity | null>(
    null
  );

  const handleNewActivityPress = () => {
    // @ts-ignore
    navigation.navigate("CreateActivity");
  };

  const getRemainingActivities = () => {
    return userActivities.filter(
      (activity) =>
        !verifyIfIsActivityFinished(activity.finishDate) &&
        !activity.checked &&
        !activity.deletedAt
    );
  };

  const removeFromUserActivities = (activity: Activity) => {
    setUserActivities(
      userActivities.map((act) => {
        if (act.id === activity.id)
          return { ...act, deletedAt: new Date().toString() };
        return act;
      })
    );
  };

  const ignoreFromUserActivities = (activity: Activity) => {
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
    if (activity.isPrivate) return removeActivity(activity);
    setActivityToRemove(activity);
  };

  const removeActivity = async (activity: Activity) => {
    removeFromUserActivities(activity);
    setActivityToRemove(null);
    try {
      await apiClient.removeActivity(activity.id.toString(), token!);
      await removeActivityNotification(activity);
    } catch (error: any) {
      console.error(error);
    }
  };

  const ignoreActivity = async (activity: Activity) => {
    ignoreFromUserActivities(activity);
    setActivityToRemove(null);
    try {
      await apiClient.ignoreActivity(activity.id.toString(), token!);
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

  const handleUnmadeRemove = (activity: Activity) => {
    if (activity.isPrivate) return unmadeRemove(activity);
    setUnmadeActivity(activity);
  };

  const unmadeRemove = async (activity: Activity) => {
    const newActivity = { ...activity, deletedAt: undefined };
    const newActivities = userActivities.map((act) =>
      act.id === activity.id ? newActivity : act
    );
    setUserActivities(newActivities);
    setUnmadeActivity(null);

    try {
      await apiClient.updateActivity(activity.id, { deletedAt: null }, token!);
    } catch (error: any) {
      console.error(error);
    }
  };

  const toggleSubject = (subjectName: string) => {
    if (
      selectedSubjects.length === subjects.length &&
      selectedSubjects.includes(subjectName)
    ) {
      setSelectedSubjects([subjectName]);
    } else if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(
        selectedSubjects.filter((subject) => subject !== subjectName)
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.length === types.length && selectedTypes.includes(type)) {
      setSelectedTypes([type]);
    } else if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const selectAllSubjects = () => {
    if (selectedSubjects.length === subjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(subjects);
    }
  };

  const selectAllTypes = () => {
    if (selectedTypes.length === types.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(types);
    }
  };

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

      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Button
              text="Adicionar Atividade"
              onPress={handleNewActivityPress}
            />
          </View>
          <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ActivitySection
          title="ATIVIDADES ATRASADAS"
          activities={filteredActivities.filter(
            (activity) =>
              !activity.checked &&
              !activity.deletedAt &&
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
              !activity.deletedAt &&
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

        <ActivitySection
          title="DELETADAS"
          activities={filteredActivities.filter(
            (activity) => activity.deletedAt
          )}
          isOpen={showDeletedActivities}
          toggleOpen={() => setShowDeletedActivities(!showDeletedActivities)}
          onCheck={check}
          onUncheck={uncheck}
          onUpdate={onUpdateActivityPress}
          onRemove={onRemoveActivityPress}
          onUnmadeRemove={handleUnmadeRemove}
          colorOverride={theme.colors.gray.gray2}
        />
      </ScrollView>

      <FloatRight
        onPress={() => setIsCalendarOpen(!isCalendarOpen)}
        isCalendarOpen={isCalendarOpen}
      />
      <ButtonsNavigation />
      {isCalendarOpen && <CalendarModal onDayPress={onDayPress} />}

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        subjects={subjects}
        selectedSubjects={selectedSubjects}
        toggleSubject={toggleSubject}
        selectAllSubjects={selectAllSubjects}
        types={types}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
        selectAllTypes={selectAllTypes}
      />

      {unmadeActivity && (
        <UnmadeRemoveModal
          handleCancel={() => setUnmadeActivity(null)}
          handleYes={() => unmadeRemove(unmadeActivity)}
          onClose={() => setUnmadeActivity(null)}
        />
      )}

      {activityToRemove && (
        <RemoveActivityModal
          handleCancel={() => setActivityToRemove(null)}
          handleDeleteActivity={() => removeActivity(activityToRemove)}
          handleIgnoreActivity={() => ignoreActivity(activityToRemove)}
          onClose={() => setActivityToRemove(null)}
        />
      )}
      <ExplanationModal />
    </DefaultBackground>
  );
};

export default Activities;
