import styled from "styled-components/native";
import HomeCard from "./HomeCard";
import Paragraph from "../../../components/Paragraph";

const HomeBoard = () => {
  return (
    <HomeCard
      title="Mural"
      icon="people-outline"
      iconColor="#C084FC"
      iconContainerColor="#2A2235"
      navigationTarget="Board"
      badge={{
        text: "3 posts novos",
        backgroundColor: "#2A2235",
        textColor: "#C084FC",
      }}
    />
  );
};

export default HomeBoard;
