import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import { ScrollView } from "react-native";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { useUser } from "../../contexts/UserContext";
import Card from "../../components/Card";
import Button from "../../components/Button";
import verifyIfIsActivityFinished from "../../utils/verifyIfIsActivityFinished";
import getActivityColorByType from "../../utils/getActivityColorByType";
import theme from "../../config/theme";
import getGradingPercentage from "../../utils/getGradingPercentage";
import getActivityDate from "../../utils/getActivityDate";
import Activity from "../../types/Activity";
import { ImportantDate } from "../../types/ImportantDate";
import getImportantColorByType from "../../utils/getImportantColorByType";
import parseUTCDate from "../../utils/parseUTCDate";
import apiClient from "../../clients/apiClient";
import RemoveActivityModal from "../Activities/components/RemoveActivityModal";

const ActivitiesDate = ({ route }: any) => {
  const { activityDate } = route.params;
  const { userActivities, importantDates, token, setUserActivities } = useUser();
  const navHook = useNavigation();
  const [activityToRemove, setActivityToRemove] = useState<Activity | null>(null);

  const handleNewActivityPress = () => {
    // @ts-ignore
    navHook.navigate("CreateActivity", {
      initialDate: activityDate.dateString,
    });
  };

  const handleUpdateActivity = (activity: Activity) => {
    // @ts-ignore
    navHook.navigate("CreateActivity", { activity });
  };

  const removeFromUserActivities = (activity: Activity) => {
    setUserActivities(
      userActivities.map((act) =>
        act.id === activity.id
          ? { ...act, deletedAt: new Date().toString() }
          : act,
      ),
    );
  };

  const removeActivity = async (activity: Activity) => {
    removeFromUserActivities(activity);
    setActivityToRemove(null);

    try {
      await apiClient.removeActivity(activity.id.toString(), token!);
    } catch (error) {
      console.error(error);
    }
  };

  const ignoreActivity = async (activity: Activity) => {
    setUserActivities(userActivities.filter((act) => act.id !== activity.id));
    setActivityToRemove(null);

    try {
      await apiClient.ignoreActivity(activity.id.toString(), token!);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveActivity = (activity: Activity) => {
    if (activity.isPrivate) {
      removeActivity(activity);
      return;
    }

    setActivityToRemove(activity);
  };

  const activitiesFromThisDate: Activity[] = [];
  const importantDatesFromThisDate: ImportantDate[] = [];

  const activeActivities = userActivities.filter(
    (activity) => !activity.deletedAt
  );

  activeActivities.forEach((activity) => {
    const activityDateObj = parseUTCDate(activity.finishDate);
    if (
      activityDateObj.getDate() === activityDate.day &&
      activityDateObj.getMonth() === activityDate.month - 1 &&
      activityDateObj.getFullYear() === activityDate.year
    ) {
      activitiesFromThisDate.push(activity);
    }
  });

  importantDates.forEach((importantDate) => {
    const importantDateObj = parseUTCDate(importantDate.date);
    if (
      importantDateObj.getDate() === activityDate.day &&
      importantDateObj.getMonth() === activityDate.month - 1 &&
      importantDateObj.getFullYear() === activityDate.year
    ) {
      importantDatesFromThisDate.push(importantDate);
    }
  });

  return (
    <DefaultBackground>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          marginBottom: 12,
          height: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navHook.goBack()}
          style={{ marginTop: -3 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Title>Atividades</Title>
      </View>
      <Paragraph>
        Atividades do dia{" "}
        {getActivityDate(`${activityDate.dateString}T03:00:00`)}
      </Paragraph>
      <Button text="Adicionar Atividade" onPress={handleNewActivityPress} />
      <ScrollView contentContainerStyle={{ gap: 8, marginTop: 8 }}>
        {activitiesFromThisDate.map((activity, index) => (
          <Card
            key={`activity-${activity.id}`}
            title={activity.name}
            color={
              verifyIfIsActivityFinished(activity.finishDate)
                ? theme.colors.gray.gray2
                : getActivityColorByType(activity.type)
            }
            topRightIcons={["pencil", "trash"]}
            topRightIconsOnPress={[
              () => handleUpdateActivity(activity),
              () => handleRemoveActivity(activity),
            ]}
            lines={[
              activity.subjectClass!.subject.name!,
              `${getGradingPercentage(
                activity.value,
              )}% da Nota - ${getActivityDate(activity.finishDate)}`,
            ]}
          />
        ))}

        {importantDatesFromThisDate.map((importantDate, index) => (
          <Card
            key={`important-date-${importantDate.id}`}
            title={importantDate.name}
            color={getImportantColorByType(importantDate.type)}
            lines={[`${getActivityDate(importantDate.date)}`]}
          />
        ))}
      </ScrollView>

      {activityToRemove && (
        <RemoveActivityModal
          handleCancel={() => setActivityToRemove(null)}
          handleDeleteActivity={() => removeActivity(activityToRemove)}
          handleIgnoreActivity={() => ignoreActivity(activityToRemove)}
          onClose={() => setActivityToRemove(null)}
        />
      )}
    </DefaultBackground>
  );
};

export default ActivitiesDate;
