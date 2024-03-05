import React from "react";
import { useNavigation } from "@react-navigation/native";
import DefaultBackground from "../../components/DefaultBackground";
import ButtonsNavigation from "../../components/ButtonsNavigation";
import { ScrollView } from "react-native";
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

const Activities = () => {
  const { userActivities, token, setUserActivities } = useUser();
  const navigation = useNavigation();

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

  const onRemoveActivityPress = async (activity: Activity) => {
    console.log("abcde");
    removeFromUserActivities(activity);
    try {
      await apiClient.removeActivity(activity.id.toString(), token!);
    } catch (error: any) {
      console.error(error);
    }
  };

  const remainingActivitiesNumber = getRemainingActivities().length;

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
        {userActivities.map((activity, index) => (
          <Card
            key={`activity-${activity.id}`}
            title={activity.name}
            color={
              verifyIfIsActivityFinished(activity.finishDate)
                ? theme.colors.gray.gray2
                : getActivityColorByType(activity.type)
            }
            topRightIcon="trash"
            topRightIconOnPress={() => onRemoveActivityPress(activity)}
            lines={[
              activity.userSubject?.subject.name!,
              `${getGradingPercentage(
                activity.value
              )}% da Nota - ${getActivityDate(activity.finishDate)}`,
            ]}
          />
        ))}
      </ScrollView>
      <ButtonsNavigation />
    </DefaultBackground>
  );
};

export default Activities;
