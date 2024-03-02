import { Picker } from "@react-native-picker/picker";
import React from "react";
import theme from "../../config/theme";
import styled from "styled-components/native";
import { Platform } from "react-native";

interface SelectInputProps {
  value: string;
  style?: any;
  placeholder?: string;
  onChangeValue: (value: string) => void;
  items: { label: string; value: string }[];
}

const SelectInputContainer = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 0;
  border-radius: 8px;
  margin-bottom: 16px;
  border-radius: 20px;
  width: 100%;
`;

const SelectInput = ({
  value,
  style,
  placeholder,
  onChangeValue,
  items,
}: SelectInputProps) => {
  return (
    <SelectInputContainer style={style}>
      <Picker
        style={{
          fontFamily: "Montserrat_400Regular",
          color: value === "" ? theme.colors.gray.gray5 : "white",
          backgroundColor: "transparent",
          borderWidth: 0,
          fontSize: 16,
          padding: Platform.OS === "web" ? 14 : 0,
        }}
        selectedValue={value}
        placeholder={placeholder}
        onValueChange={(itemValue) => onChangeValue(itemValue)}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item
            key={item.value}
            fontFamily="Montserrat_400Regular"
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </SelectInputContainer>
  );
};

export default SelectInput;
