import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import theme from "../../../config/theme";

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
              text={type}
              onPress={() => toggleType(type)}
              style={selectedTypes.includes(type) ? styles.activeButton : styles.inactiveButton}
              styleText={{ color: "white" }}
            />
          ))}
        </View>

        <Button text="Fechar" onPress={onClose} style={styles.closeButton} styleText={{ color: "white" }} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: theme.colors.red.primary,
    marginTop: 10,
  },
});

export default FilterModal;
