import { TouchableOpacity, View, Text } from "react-native";
import Activity from "../../../types/Activity";
import React from "react";
import Card from "../../../components/Card";
import getActivityColorByType from "../../../utils/getActivityColorByType";
import getGradingPercentage from "../../../utils/getGradingPercentage";
import getActivityDate from "../../../utils/getActivityDate";

interface ActivitySectionProps {
  title: string;
  activities: Activity[];
  isOpen: boolean;
  toggleOpen: () => void;
  onCheck: (activity: Activity) => void;
  onUncheck: (activity: Activity) => void;
  onUpdate: (activity: Activity) => void;
  onRemove: (activity: Activity) => void;
  onUnmadeRemove?: (activity: Activity) => void;
  colorOverride?: string;
}

const ActivitySection = ({
  title,
  activities,
  isOpen,
  toggleOpen,
  onCheck,
  onUncheck,
  onUpdate,
  onRemove,
  onUnmadeRemove,
  colorOverride,
}: ActivitySectionProps) =>
  activities.length > 0 && (
    <View>
      <TouchableOpacity onPress={toggleOpen}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Montserrat_700Bold",
            color: "white",
            padding: 12,
          }}
        >
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
                activity.checked
                  ? () => onUncheck(activity)
                  : () => onCheck(activity),
              ]}
              topRightIcons={[
                "pencil",
                activity.deletedAt ? "reload" : "trash",
              ]}
              topRightIconsOnPress={[
                () => onUpdate(activity),
                activity.deletedAt
                  ? () => onUnmadeRemove?.(activity)
                  : () => onRemove(activity),
              ]}
              lines={[
                `${activity.subjectClass!.subject.name!}${
                  activity.isPrivate ? " (Privada)" : ""
                }`,
                `${activity.value ? getGradingPercentage(
                  activity.value
                ) + "% da Nota - " : ""}${getActivityDate(activity.finishDate)}`,
              ]}
            />
          </View>
        ))}
    </View>
  );

export default ActivitySection;
