import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import theme from '../../config/theme';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const Content = styled.View`
  background-color: ${theme.colors.gray.gray2};
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: Montserrat_700Bold;
  color: white;
  margin-bottom: 12px;
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16px;
  font-family: Montserrat_400Regular;
  color: ${theme.colors.gray.gray5};
  margin-bottom: 16px;
  text-align: center;
  line-height: 24px;
`;

const Steps = styled.Text`
  font-size: 15px;
  font-family: Montserrat_400Regular;
  color: ${theme.colors.gray.gray5};
  margin-bottom: 20px;
  line-height: 24px;
`;

const BoldText = styled.Text`
  font-family: Montserrat_700Bold;
  color: ${theme.colors.purple.primary};
`;

const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.purple.primary};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: Montserrat_700Bold;
`;

const videoStyle: React.CSSProperties={
  width: '100%',
  maxWidth: 320,
  borderRadius:12,
  border:'2px solid #ffffff',
  };

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    checkAndShowPrompt();
  }, []);

  const checkAndShowPrompt = async () => {
    if (Platform.OS !== 'web') return;

    const hasShown = await AsyncStorage.getItem('install-prompt-shown');
    if (hasShown) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isStandalone) {
      setTimeout(() => setShowPrompt(true), 3000);
    }
  };

  const handleClose = async () => {
    await AsyncStorage.setItem('install-prompt-shown', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt || Platform.OS !== 'web') return null;

  return (
    <Container>
      <Content>
        <video 
        src="/video/tutorial_ios.mp4" 
        playsInline 
        muted autoPlay 
        loop 
        preload='metadata'
        style={videoStyle}
        width="400"
        />
        <br />
        <Title>📱 Instale o App</Title>
        <Description>
          Para receber notificações, adicione o Folki à sua tela inicial:
        </Description>
        <Steps>
          1. Toque no ícone <BoldText>Compartilhar</BoldText> ⬆️{'\n'}
          2. Role e toque em <BoldText>"Adicionar à Tela de Início"</BoldText>
        </Steps>
        <Button onPress={handleClose}>
          <ButtonText>Entendi</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}
