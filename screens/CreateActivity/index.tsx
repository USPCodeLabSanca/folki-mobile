import React, { useState } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import { View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CreateActivity = () => {
  const [name, setName] = useState("");

  const handleCreateButton = () => {};

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Title>Nova Atividade</Title>
      <View style={{ width: "100%" }}>
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Nome da Atividade"
          autoComplete="off"
          value={name}
          onChangeText={setName}
        />
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Tipo de Atividade"
          autoComplete="off"
          value={name}
          onChangeText={setName}
        />
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Data da Atividade"
          autoComplete="off"
          value={name}
          onChangeText={setName}
        />
        <Input
          style={{ marginBottom: 8 }}
          placeholder="Disciplina da Atividade"
          autoComplete="off"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button
        text="Criar"
        width="100%"
        disabled={!name}
        onPress={handleCreateButton}
      />
    </DefaultBackground>
  );
};

export default CreateActivity;
