import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import theme from "../../config/theme";
import React, { useState } from "react";
import getActivityDate from "../../utils/getActivityDate";
import { DatePickerModal } from "react-native-paper-dates";
import { Platform } from "react-native";

const DateInputContainer = styled.TouchableOpacity`
  background-color: ${theme.colors.gray.gray2};
  padding: 16px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-radius: 20px;
  width: 100%;
`;

const DateInputText = styled.Text`
  color: ${theme.colors.gray.gray5};
  font-family: Montserrat_400Regular;
  font-size: 16px;
  color: #fff;
`;
interface DateInputProps {
  value?: Date;
  style?: any;
  placeholder?: string;
  onChangeValue: (date: Date) => void;
}

const DateInput = ({
  value,
  style,
  placeholder,
  onChangeValue,
}: DateInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onConfirm = (result: any) => {
    onChangeValue(result.date);
    hideDatePicker();
  };

  return (
    <>
      <DateInputContainer style={style} onPress={showDatePicker}>
        <DateInputText
          style={{ color: value ? "white" : theme.colors.gray.gray5 }}
        >
          {value
            ? getActivityDate(value.toDateString())
            : "Data" || placeholder}
        </DateInputText>
      </DateInputContainer>

      {Platform.OS === "web" ? (
        <DatePickerModal
          locale="pt"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={hideDatePicker}
          date={value || new Date()}
          onConfirm={onConfirm}
        />
      ) : (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={onChangeValue}
          onCancel={hideDatePicker}
        />
      )}
    </>
  );
};

export default DateInput;
