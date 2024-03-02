import { ScrollView, View } from "react-native";
import Button from "../Button";
import React from "react";

interface Option {
  name: string;
  value: string;
}

interface SelectorProps {
  options: Option[];
  value: string[];
  ellipsis?: boolean;
  onChangeValue: (value: string[]) => void;
}

const MultiSelector = ({
  value,
  options,
  ellipsis,
  onChangeValue,
}: SelectorProps) => {
  const handleChange = (valuePressed: string) => {
    if (value.includes(valuePressed)) {
      onChangeValue(value.filter((v) => v !== valuePressed));
    } else {
      onChangeValue([...value, valuePressed]);
    }
  };

  return (
    <ScrollView>
      {options.map((option) => (
        <View key={option.value} style={{ marginBottom: 12 }}>
          <Button
            text={option.name}
            disabledStyle={!value.includes(option.value)}
            onPress={() => handleChange(option.value)}
            numberOfLines={ellipsis === false ? undefined : 1}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default MultiSelector;
