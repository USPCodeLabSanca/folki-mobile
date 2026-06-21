import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import Button from "../Button";
import theme from "../../config/theme";

interface CardProps {
  title: string;
  color: string;
  onPress?: () => void;
  lines?: (string | undefined)[];
  linesIcons?: string[];
  rightItem?: React.ReactNode;
  buttonsTexts?: string[];
  buttonsOnPress?: (() => void)[];
  buttonsColors?: string[];
  topRightIcons?: string[];
  topRightIconsOnPress?: (() => void)[];
  middleLeftIcons?: string[];
  middleLeftIconsOnPress?: (() => void)[];
  borderColor?: string;
  badgeText?: string;
  badgeIcon?: string;
}

const CardContainer = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 16px;
`;

const FirstPart = styled.View`
  display: flex;
  flex-direction: row;
`;

const FirstPartLeft = styled.View<{ hasTopRightIcons: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: ${({ hasTopRightIcons }) =>
    hasTopRightIcons ? "48px" : "6px"};
`;

const CardTitle = styled.Text<{ hasMiddleLeftIcons: boolean }>`
  font-size: 16px;
  font-family: Montserrat_500Medium;
  color: white;
  margin-left: ${({ hasMiddleLeftIcons }) =>
    hasMiddleLeftIcons ? "36px" : "0px"};
  flex-wrap: nowrap;
`;

const CardLine = styled.Text<{ hasMiddleLeftIcons: boolean }>`
  font-size: 12px;
  font-family: Montserrat_400Regular;
  color: #d6d6d6;
`;

const CardLineContainer = styled.View<{ hasMiddleLeftIcons: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-left: ${({ hasMiddleLeftIcons }) =>
    hasMiddleLeftIcons ? "36px" : "0px"};
`;

const TopRight = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  gap: 8px;
  flex-direction: row;
`;

const MiddleLeft = styled.View`
  position: absolute;
  left: 0px;
  top: 0;
  bottom: 0;
  justify-content: center;
  z-index: 1;
  gap: 8px;
  flex-direction: column;
`;

const RightItem = styled.View`
  height: 100%;
`;

const Card = ({
  title,
  color,
  lines,
  linesIcons,
  rightItem,
  onPress,
  buttonsTexts,
  buttonsOnPress,
  buttonsColors,
  topRightIcons,
  topRightIconsOnPress,
  middleLeftIcons,
  middleLeftIconsOnPress,
  borderColor,
  badgeText,
  badgeIcon,
}: CardProps) => {
  const hasMiddleLeftIcons = middleLeftIcons && middleLeftIcons.length > 0;
  const hasTopRightIcons = !!(topRightIcons && topRightIcons.length > 0);

  return (
    <CardContainer
      style={{
        backgroundColor: color,
        borderWidth: borderColor ? 1.5 : 0,
        borderColor: borderColor || "transparent",
      }}
      onPress={onPress}
    >
      <FirstPart>
        <FirstPartLeft hasTopRightIcons={hasTopRightIcons}>
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

          {badgeText ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: borderColor || theme.colors.purple.primary,
                paddingVertical: 3,
                paddingHorizontal: 8,
                borderRadius: 6,
                alignSelf: "flex-start",
                gap: 4,
                marginBottom: 6,
                marginLeft: hasMiddleLeftIcons ? 36 : 0,
              }}
            >
              {badgeIcon ? (
                <Ionicons name={badgeIcon as any} size={11} color="white" />
              ) : null}
              <Text
                style={{
                  color: "white",
                  fontSize: 9,
                  fontFamily: "Montserrat_700Bold",
                  textTransform: "uppercase",
                }}
              >
                {badgeText}
              </Text>
            </View>
          ) : null}

          <CardTitle hasMiddleLeftIcons={hasMiddleLeftIcons} numberOfLines={1}>
            {title}
          </CardTitle>
          {(lines || []).map((line, index) =>
            line ? (
              <CardLineContainer
                key={index}
                hasMiddleLeftIcons={hasMiddleLeftIcons}
              >
                {linesIcons?.[index] && (
                  <Ionicons
                    name={linesIcons[index]}
                    size={12}
                    color="#d6d6d6"
                  />
                )}
                <CardLine hasMiddleLeftIcons={false}>{line}</CardLine>
              </CardLineContainer>
            ) : null,
          )}
        </FirstPartLeft>
        {rightItem ? rightItem : null}
      </FirstPart>
      {buttonsTexts ? (
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            gap: 6,
            marginLeft: hasMiddleLeftIcons ? 36 : 0,
          }}
        >
          {buttonsTexts.map((buttonText, index) => (
            <Button
              key={buttonText}
              text={buttonText}
              width="100%"
              onPress={buttonsOnPress![index]}
              padding="7px 24px"
              style={{
                backgroundColor: buttonsColors![index],
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
