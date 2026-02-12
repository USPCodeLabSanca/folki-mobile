import React from "react";
import { Modal, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import theme from "../../config/theme";

interface PickerModalProps {
  visible: boolean;
  placeholder?: string;
  items: { label: string; value: any }[];
  onSelect: (value: any) => void;
  onClose: () => void;
}

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: ${theme.colors.gray.gray2};
  border-radius: 20px;
  padding: 20px;
  width: 80%;
  max-height: 400px;
`;

const ModalTitle = styled.Text`
  color: white;
  font-family: Montserrat_600SemiBold;
  font-size: 18px;
  margin-bottom: 16px;
`;

const ModalItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray.gray3};
`;

const ModalItemText = styled.Text`
  color: white;
  font-family: Montserrat_400Regular;
  font-size: 16px;
`;

const PickerModal = ({
  visible,
  placeholder,
  items,
  onSelect,
  onClose,
}: PickerModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={{ flex: 1 }} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <ModalContainer>
          <TouchableOpacity activeOpacity={1}>
            <ModalContent>
              <ModalTitle>{placeholder}</ModalTitle>
              <ScrollView>
                {items.map((item) => (
                  <ModalItem
                    key={item.value}
                    onPress={() => {
                      onSelect(item.value);
                      onClose();
                    }}
                  >
                    <ModalItemText>{item.label}</ModalItemText>
                  </ModalItem>
                ))}
              </ScrollView>
            </ModalContent>
          </TouchableOpacity>
        </ModalContainer>
      </TouchableOpacity>
    </Modal>
  );
};

export default PickerModal;
