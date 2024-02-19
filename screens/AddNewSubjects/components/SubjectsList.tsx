import React from "react";
import { ScrollView } from "react-native";
import Button from "../../../components/Button";
import Subject from "../../../types/Subject";

interface SubjectsListProps {
  subjects: Subject[];
  onSubjectPress: (subject: Subject) => void;
}

const SubjectsList = ({ subjects, onSubjectPress }: SubjectsListProps) => {
  return (
    <ScrollView style={{ flex: 1, marginVertical: 12 }}>
      {subjects.map((subject: Subject) => (
        <Button
          key={subject.id}
          text={subject.name}
          onPress={() => onSubjectPress(subject)}
          disabledStyle
        />
      ))}
    </ScrollView>
  );
};

export default SubjectsList;
