import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface SendEmailAgainProps {
  onPress: () => void;
}

const SendEmailAgainText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  margin-bottom: 12px;
`;

const DEFAULT_WAIT_TIME_IN_SECONDS = 120;

const SendEmailAgain = ({ onPress }: SendEmailAgainProps) => {
  const [waitSeconds, setWaitSeconds] = React.useState(
    DEFAULT_WAIT_TIME_IN_SECONDS
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setWaitSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [waitSeconds]);

  const sendEmailAgain = () => {
    onPress();
    setWaitSeconds(DEFAULT_WAIT_TIME_IN_SECONDS);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity disabled={waitSeconds !== 0} onPress={sendEmailAgain}>
      <SendEmailAgainText style={{ opacity: waitSeconds ? 0.5 : 1 }}>
        Reenviar código {waitSeconds ? formatTime(waitSeconds) : ""}
      </SendEmailAgainText>
    </TouchableOpacity>
  );
};

export default SendEmailAgain;
