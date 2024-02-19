import React from "react";
import { Image } from "react-native";

interface LogoProps {
  size?: number;
}

const Logo = ({ size }: LogoProps) => (
  <Image
    source={require("../../assets/logo.png")}
    style={{ width: size || 100, height: size || 100 }}
  />
);

export default Logo;
