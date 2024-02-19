import React from "react";
import Background from "./components/Background";
import Logo from "../../components/Logo";
import WelcomeText from "./components/WelcomeText";
import ButtonView from "./components/ButtonView";

const Starter = () => {
  return (
    <Background>
      <Logo size={70} />
      <WelcomeText>{`Bora\nse formar?`}</WelcomeText>
      <ButtonView />
    </Background>
  );
};

export default Starter;
