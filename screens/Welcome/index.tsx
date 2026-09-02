import React, { useState } from "react";
import DefaultBackground from "../../components/DefaultBackground";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import { View } from "react-native";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const welcomeList = [
  {
    title: "Bem-vindo ao Folki!",
    icon: "👋",
    description:
      "O Folki é um aplicativo que te ajuda a organizar sua vida acadêmica. Ele é uma iniciativa Livre do Codelab Sanca. Com ele você pode ver suas atividades, feriados, notas e muito mais!",
  },

  {
    title: "Atividades",
    icon: "📚",
    description:
      "Aqui você pode ver as atividades que você tem para fazer, e também as que você já fez. Quando qualquer estudante da sua turma adiciona uma atividade, ela aparece aqui!",
  },

  {
    title: "Notas",
    icon: "📊",
    description:
      "Nessa seção você pode ver as notas das atividades que você já fez. Assim você pode saber como está indo na disciplina!",
  },

  {
    title: "Aulas",
    icon: "📅",
    description:
      "Aqui você pode ver as aulas que você tem hoje, e também as aulas que você tem durante a semana. Assim você pode se organizar melhor!",
  },

  {
    title: "Faltas",
    icon: "🚫",
    description:
      "Nessa seção você pode ver quantas faltas você tem em cada disciplina. Assim você pode se programar para não faltar nas aulas!",
  },

  {
    title: "Calendário",
    icon: "🗓️",
    description:
      "No calendário você pode ver as datas importantes da sua turma, como provas, trabalhos e feriados. Assim você pode se programar melhor!",
  },

  {
    title: "Compartilhe!",
    icon: "📲",
    description:
      "Compartilhe o Folki com seus amigos e ajude eles a se organizarem melhor também!",
  },
];

interface ButtonsInterface {
  onNext: () => void;
  onUse: () => void;
  showNext: boolean;
}

const ButtonsNavigation = ({ onNext, onUse, showNext }: ButtonsInterface) => {
  return (
    <View style={{gap: 8}}>
      {showNext ? (
        <>
          <Button text="Próximo" onPress={onNext} />
          <Button text="Pular" onPress={onUse} />
        </>
      ) : (
        <Button text="Ir para Login!" onPress={onUse}/>
      )
    }
    </View>
  );
};

const Welcome = () => {
  const [currentWelcome, setCurrentWelcome] = useState(0);
  const navigation = useNavigation();

  const onNext = () => {
    setCurrentWelcome(currentWelcome + 1);
  };

  const onUse = async () => {
    await AsyncStorage.setItem("welcome", "true");
    
    navigation.reset({
      index:0,
      routes:[{name: "Login" as never}],
    });
  };

  return (
    <DefaultBackground
      style={{ alignItems: "center", justifyContent: "center", gap: 12 }}
    >
      <Title>{welcomeList[currentWelcome].title}</Title>
      <Paragraph style={{ fontSize: 80 }}>
        {welcomeList[currentWelcome].icon}
      </Paragraph>
      <Paragraph style={{ textAlign: "center", lineHeight: 26 }}>
        {welcomeList[currentWelcome].description}
      </Paragraph>
      <ButtonsNavigation
        onNext={onNext}
        onUse={onUse}
        showNext={currentWelcome !== welcomeList.length - 1}
      />
    </DefaultBackground>
  );
};

export default Welcome;
