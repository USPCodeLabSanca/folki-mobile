import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackHandler, ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import Toast from "react-native-toast-message";
import apiClient from "../../clients/apiClient";
import Campus from "../../types/Campus";

const SelectCampus = () => {
  const [campusId, setCampusId] = useState("");
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const navigation = useNavigation();

  const handleCampusButton = () => {
    // @ts-ignore
    navigation.navigate("SelectInstitute", { campusId });
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
    getCampuses();
  }, []);

  const getCampuses = async () => {
    try {
      const response = await apiClient.getCampuses();
      setCampuses(response);
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
          value={campusId}
          onChangeValue={setCampusId}
          options={campuses.map((campus) => {
            return { value: campus.id.toString(), name: campus.name };
          })}
        />
      </ScrollView>
      <Button
        text="Continuar"
        width="100%"
        disabled={!campusId}
        onPress={handleCampusButton}
      />
    </DefaultBackground>
  );
};

export default SelectCampus;
