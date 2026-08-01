import React from "react";
import HomeCard from "./HomeCard";
import { useUser } from "../../../contexts/UserContext";

const HomeBoard = () => {
  const { newPosts } = useUser();

  const formatBadgeText = (count: number) => {
    return `${count} ${count === 1 ? "post novo" : "posts novos"}`;
  };

  return (
    <HomeCard
      title="Mural"
      icon="people-outline"
      iconColor="#C084FC"
      iconContainerColor="#2A2235"
      navigationTarget="Board"
      badge={
        newPosts && newPosts > 0
          ? {
              text: formatBadgeText(newPosts),
              backgroundColor: "#2A2235",
              textColor: "#C084FC",
            }
          : undefined
      }
    />
  );
};

export default HomeBoard;
