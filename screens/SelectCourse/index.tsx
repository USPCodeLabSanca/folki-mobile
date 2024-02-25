import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler, ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import apiClient from "../../clients/apiClient";
import Course from "../../types/Course";
import Toast from "react-native-toast-message";
import { useUser } from "../../contexts/UserContext";

const SelectCourse = ({ route }: any) => {
  const { campusId, instituteId } = route.params;
  const { token } = useUser();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCourseButton = async () => {
    setLoading(true);

    try {
      await apiClient.updateMe({ courseId: Number(courseId) }, token!);
      // @ts-ignore
      navigation.navigate("SelectPeriod", { courseId, campusId });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
        BackHandler.exitApp();
      }),
    [navigation]
  );

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await apiClient.getCourses(instituteId);
      setCourses(response);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }
  };

  return (
    <DefaultBackground>
      <Title>Seu Curso?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={courseId}
          onChangeValue={setCourseId}
          options={courses.map((course) => {
            return { value: course.id.toString(), name: course.name };
          })}
        />
      </ScrollView>
      <Button
        text={loading ? "..." : "Continuar"}
        width="100%"
        disabled={!courseId || loading}
        onPress={handleCourseButton}
      />
    </DefaultBackground>
  );
};

export default SelectCourse;
