import { Picker } from "@react-native-picker/picker";
import React from "react";
import theme from "../../config/theme";
import styled from "styled-components/native";
import { Platform } from "react-native";

interface SelectInputProps {
  value: any;
  style?: any;
  placeholder?: string;
  onChangeValue: (value: any) => void;
  items: { label: string; value: any }[];
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
            backgroundColor: Platform.OS === "web" ? `${theme.colors.gray.gray2}`: 'transparent',
            borderRadius: Platform.OS === "web" ? 32 : 0,
            marginRight: Platform.OS === "web" ? 5 : 0,
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
