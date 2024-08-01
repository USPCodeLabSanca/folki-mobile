import AsyncStorage from "@react-native-async-storage/async-storage";
import Activity from "../types/Activity";
import * as Notifications from "expo-notifications";

const setActivityNotification = async (activity: Activity) => {
  const date = new Date(activity.finishDate!);

  date.setHours(8);
  date.setMinutes(0);

  console.log(date);

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Folki - ${activity.name} é pra hoje!`,
      body: `Vim aqui pra te lembrar dessa tarefa. Clica aqui pra ver mais ;)`,
    },
    trigger: {
      date: date,
    },
  });

  await AsyncStorage.setItem(
    `activity-notification-${activity.id}`,
    identifier
  );
};

export default setActivityNotification;
