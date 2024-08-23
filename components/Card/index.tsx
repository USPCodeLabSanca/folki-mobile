import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import Button from "../Button";

interface CardProps {
  title: string;
  color: string;
  onPress?: () => void;
  lines?: (string | undefined)[];
  buttonsTexts?: string[];
  buttonsOnPress?: (() => void)[];
  buttonsColors?: string[];
  topRightIcons?: string[];
  topRightIconsOnPress?: (() => void)[];
  middleLeftIcons?: string[]; // New prop for middle left icons
  middleLeftIconsOnPress?: (() => void)[]; // New prop for middle left icons on press
}

const CardContainer = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled.Text<{ hasMiddleLeftIcons: boolean }>`
  font-size: 16px;
  font-family: Montserrat_700Bold;
  color: white;
  margin-left: ${({ hasMiddleLeftIcons }) => (hasMiddleLeftIcons ? "32px" : "0px")};
`;

const CardLine = styled.Text<{ hasMiddleLeftIcons: boolean }>`
  font-size: 12px;
  font-family: Montserrat_400Regular;
  color: #d6d6d6;
  margin-left: ${({ hasMiddleLeftIcons }) => (hasMiddleLeftIcons ? "32px" : "0px")};
`;

const TopRight = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  gap: 8px;
  flex-direction: row;
`;

const MiddleLeft = styled.View`
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  justify-content: center;
  z-index: 1;
  gap: 8px;
  flex-direction: column;
`;

const Card = ({
  title,
  color,
  lines,
  onPress,
  buttonsTexts,
  buttonsOnPress,
  buttonsColors,
  topRightIcons,
  topRightIconsOnPress,
  middleLeftIcons,
  middleLeftIconsOnPress,
}: CardProps) => {
  const hasMiddleLeftIcons = middleLeftIcons && middleLeftIcons.length > 0;

  return (
    <CardContainer style={{ backgroundColor: color }} onPress={onPress}>
      {topRightIcons ? (
        <TopRight>
          {topRightIcons.map((topRightIcon: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={topRightIconsOnPress![index]}
            >
              <Ionicons name={topRightIcon} size={16} color="white" />
            </TouchableOpacity>
          ))}
        </TopRight>
      ) : null}

      {hasMiddleLeftIcons ? (
        <MiddleLeft>
          {middleLeftIcons!.map((middleLeftIcon: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={middleLeftIconsOnPress![index]}
            >
              <Ionicons name={middleLeftIcon} size={25} color="white" />
            </TouchableOpacity>
          ))}
        </MiddleLeft>
      ) : null}

      <CardTitle hasMiddleLeftIcons={hasMiddleLeftIcons}>{title}</CardTitle>
      {(lines || []).map((line, index) =>
        line ? (
          <CardLine key={index} hasMiddleLeftIcons={hasMiddleLeftIcons}>
            {line}
          </CardLine>
        ) : null
      )}
      {buttonsTexts ? (
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            gap: 6,
            marginLeft: hasMiddleLeftIcons ? 32 : 0,
          }}
        >
          {buttonsTexts.map((buttonText, index) => (
            <Button
              key={buttonText}
              text={buttonText}
              width="100%"
              onPress={buttonsOnPress![index]}
              style={{
                backgroundColor: buttonsColors![index],
                padding: "0px 0px",
                width: "fit-content",
              }}
              styleText={{ fontSize: 10 }}
            />
          ))}
        </View>
      ) : null}
    </CardContainer>
  );
};

export default Card;
