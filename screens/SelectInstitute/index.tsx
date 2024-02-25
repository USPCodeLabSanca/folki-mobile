import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler, ScrollView, View } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import Institute from "../../types/Institute";
import apiClient from "../../clients/apiClient";
import Toast from "react-native-toast-message";
import { useUser } from "../../contexts/UserContext";

const SelectInstitute = ({ route }: any) => {
  const { campusId } = route.params;
  const { token } = useUser();

  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [instituteId, setInstituteId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleInstituteButton = async () => {
    setLoading(true);

    try {
      await apiClient.updateMe({ instituteId: Number(instituteId) }, token!);
      // @ts-ignore
      navigation.navigate("SelectCourse", { campusId, instituteId });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
      });
      console.error(error);
    }

    setLoading(false);
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
    getInstitutes();
  }, []);

  const getInstitutes = async () => {
    try {
      const response = await apiClient.getInstitutes(campusId);
      setInstitutes(response);
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
      <Title>De onde cê é?</Title>
      <ScrollView style={{ flex: 1, marginVertical: 12 }}>
        <Selector
          value={instituteId}
          onChangeValue={setInstituteId}
          options={institutes.map((institute) => {
            return { value: institute.id.toString(), name: institute.name };
          })}
        />
      </ScrollView>
      <Button
        text={loading ? "..." : "Continuar"}
        width="100%"
        disabled={!instituteId || loading}
        onPress={handleInstituteButton}
      />
    </DefaultBackground>
  );
};

export default SelectInstitute;
