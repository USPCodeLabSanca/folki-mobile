import { ScrollView, View } from "react-native";
import Button from "../Button";
import React from "react";

interface Option {
  name: string;
  value: string;
}

interface SelectorProps {
  options: Option[];
  value: string;
  onChangeValue: (value: string) => void;
}

const Selector = ({ value, options, onChangeValue }: SelectorProps) => {
  return (
    <ScrollView>
      {options.map((option) => (
        <View key={option.value} style={{ marginBottom: 12 }}>
          <Button
            text={option.name}
            disabledStyle={value !== option.value}
            onPress={() => onChangeValue(option.value)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Selector;
