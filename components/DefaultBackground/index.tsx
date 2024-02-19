import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import theme from "../../config/theme";

interface DefaultBackgroundProps {
  children: React.ReactNode;
  style?: {};
}

const DefaultBackgroundView = styled.View`
  background-color: ${theme.colors.gray.gray1};
  flex: 1;
  width: 100%;
  height: 100%;
`;

const DefaultBackground = ({ children, style }: DefaultBackgroundProps) => {
  return (
    <DefaultBackgroundView>
      <SafeAreaView
        style={{
          padding: 18,
          flex: 1,
          width: "100%",
          ...style,
        }}
      >
        {children}
      </SafeAreaView>
    </DefaultBackgroundView>
  );
};

export default DefaultBackground;
