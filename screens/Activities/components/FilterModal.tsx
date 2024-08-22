import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import Button from "../../../components/Button";
import theme from "../../../config/theme";

const TYPES = [
    { label: "Prova", value: "EXAM" },
    { label: "Trabalho", value: "HOMEWORK" },
    { label: "Atividade", value: "ACTIVITY" },
    { label: "Lista", value: "LIST" },
];

const getTypeLabel = (value) => {
    const type = TYPES.find((item) => item.value === value);
    return type ? type.label : value;
};

const FilterModal = ({
  isVisible,
  onClose,
  subjects,
  selectedSubjects,
  toggleSubject,
  selectAllSubjects,
  types,
  selectedTypes,
  toggleType,
  selectAllTypes,
}) => (
  <Modal visible={isVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <ScrollView>
        <Text style={styles.modalTitle}>Filtrar por Disciplinas</Text>
        <View style={styles.filterSection}>
          <Button
            text="Tudo"
            onPress={selectAllSubjects}
            style={selectedSubjects.length === subjects.length ? styles.activeButton : styles.inactiveButton}
            styleText={{ color: "white" }}
          />
          {subjects.map((subject, index) => (
            <Button
              key={index}
              text={subject}
              onPress={() => toggleSubject(subject)}
              style={selectedSubjects.includes(subject) ? styles.activeButton : styles.inactiveButton}
              styleText={{ color: "white" }}
            />
          ))}
        </View>

        <Text style={styles.modalTitle}>Filtrar por Tipos</Text>
        <View style={styles.filterSection}>
          <Button
            text="Tudo"
            onPress={selectAllTypes}
            style={selectedTypes.length === types.length ? styles.activeButton : styles.inactiveButton}
            styleText={{ color: "white" }}
          />
          {types.map((type, index) => (
            <Button
              key={index}
              text={getTypeLabel(type)}
              onPress={() => toggleType(type)}
              style={selectedTypes.includes(type) ? styles.activeButton : styles.inactiveButton}
              styleText={{ color: "white" }}
            />
          ))}
        </View>

        </ScrollView>

        <Button text="Fechar" onPress={onClose} style={styles.closeButton} styleText={{ color: "white" }} />
      </View>
    </View>
  </Modal>
);

const { height } = Dimensions.get("window"); // Get the screen height

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.gray.gray1,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: height * 0.8, // Set maxHeight to 80% of screen height
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: theme.colors.purple.primary,
    marginVertical: 5,
  },
  inactiveButton: {
    backgroundColor: theme.colors.gray.gray3,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: theme.colors.red.red1,
    marginTop: 10,
  },
});

export default FilterModal;
