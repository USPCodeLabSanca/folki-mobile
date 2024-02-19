import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Background = ({ children }: any) => (
  <ImageBackground
    source={require("../../../assets/starter/background.png")}
    style={{
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <SafeAreaView
      style={{
        padding: 24,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {children}
    </SafeAreaView>
  </ImageBackground>
);

export default Background;
