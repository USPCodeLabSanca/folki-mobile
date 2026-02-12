import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import theme from "../../config/theme";
import styled from "styled-components/native";
import { Platform } from "react-native";
import PickerModal from "./PickerModal";

interface SelectInputProps {
  value: any;
  style?: any;
  placeholder?: string;
  onChangeValue: (value: any) => void;
  items: { label: string; value: any }[];
}

const SelectInputContainer = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray2};
  padding: ${Platform.OS === "web" ? "0" : "16px 14px"};
  border-radius: 20px;
  margin-bottom: 16px;
  width: 100%;
`;

const SelectInputText = styled.Text`
  color: ${(props: any) => props.hasValue ? "white" : theme.colors.gray.gray5};
  font-family: Montserrat_400Regular;
  font-size: 16px;
`;

const SelectInput = ({
  value,
  style,
  placeholder,
  onChangeValue,
  items,
}: SelectInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = items.find((item) => item.value === value)?.label || placeholder;

  if (Platform.OS === "web") {
    return (
      <SelectInputContainer as={require("react-native").View} style={style}>
        <Picker
          style={{
            fontFamily: "Montserrat_400Regular",
            color: value === "" ? theme.colors.gray.gray5 : "white",
            backgroundColor: theme.colors.gray.gray2,
            borderRadius: 32,
            marginRight: 5,
            borderWidth: 0,
            fontSize: 16,
            padding: 13,
          }}
          selectedValue={value}
          placeholder={placeholder}
          onValueChange={(itemValue) => onChangeValue(itemValue)}
        >
          <Picker.Item label={placeholder} value="" />
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </SelectInputContainer>
    );
  }

  return (
    <>
      <SelectInputContainer style={style} onPress={() => setModalVisible(true)}>
        <SelectInputText hasValue={value !== ""}>{selectedLabel}</SelectInputText>
      </SelectInputContainer>

      <PickerModal
        visible={modalVisible}
        placeholder={placeholder}
        items={items}
        onSelect={onChangeValue}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default SelectInput;
