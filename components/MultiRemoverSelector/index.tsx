import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../config/theme";

export interface Option {
  name: string;
  value: string;
}

interface SelectorProps {
  value: Option[];
  onRemoveItem?: (value: Option) => void;
  onChangeValue?: (value: Option[]) => void;
}

const SelectorItem = styled.View`
  background-color: ${theme.colors.gray.gray2};
  padding: 18px 28px;
  border-radius: 100px;
  flex-direction: row;
  alignitems: center;
  justifycontent: center;
`;

const SelectorItemText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
  flex: 1;
`;

const MultiRemoverSelector = ({
  value,
  onRemoveItem,
  onChangeValue,
}: SelectorProps) => {
  const handleRemoveItem = (item: Option) => {
    const newValue = value.filter((v) => v.value !== item.value);
    if (onRemoveItem) onRemoveItem(item);
    if (onChangeValue) onChangeValue(newValue);
  };

  return (
    <ScrollView>
      {value.map((value) => (
        <View key={value.value} style={{ marginBottom: 12 }}>
          <SelectorItem>
            <SelectorItemText>{value.name}</SelectorItemText>
            <TouchableOpacity onPress={() => handleRemoveItem(value)}>
              <Ionicons name="close" size={18} color="white" />
            </TouchableOpacity>
          </SelectorItem>
        </View>
      ))}
    </ScrollView>
  );
};

export default MultiRemoverSelector;
