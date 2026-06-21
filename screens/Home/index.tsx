import { ScrollView } from "react-native";
import DefaultBackground from "../../components/DefaultBackground";
import Paragraph from "../../components/Paragraph";
import { useEffect } from "react";
import HomeCard from "./components/HomeCard";
import { useUser } from "../../contexts/UserContext";
import formatReal from "../../utils/formatReal";
import { initializeOneSignal, getPlayerId } from "../../services/oneSignal";
import apiClient from "../../clients/apiClient";
import InstallPrompt from "../../components/InstallPrompt";
import { useScreenTracking } from "../../hooks/useScreenTracking";
import HomeHeader from "./components/HomeHeader";
import HomeProgress from "./components/HomeProgress";
import HomeTodayCourses from "./components/HomeTodayCourses";
import BiWeeklyActivities from "./components/BiWeeklyActivities";
import HomeBoard from "./components/HomeBoard";
import HomeQuickAccess from "./components/HomeQuickAccess";

const Home = () => {
  useScreenTracking("Home");
  const { user, ufscarData, userSubjects, userActivities, token } = useUser();

  useEffect(() => {
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    await initializeOneSignal();
    const playerId = await getPlayerId();
    if (playerId && user && token) {
      await apiClient.updateMe({ notificationId: playerId }, token);
    }
  };

  return (
    <>
      <DefaultBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeHeader
            userName={user!.name!}
            universitySlug={user!.university!.slug}
          />
          <HomeProgress universitySlug={user!.university!.slug} />
          <HomeTodayCourses
            userSubjects={userSubjects}
            universitySlug={user!.university!.slug}
          />

          {ufscarData?.balance ? (
            ufscarData.balance !== 1 ? (
              <HomeCard title="Saldo no RU">
                <Paragraph>
                  {formatReal(ufscarData.balance)} (
                  {parseInt((ufscarData.balance / 4.2).toString())} Refeições)
                </Paragraph>
              </HomeCard>
            ) : null
          ) : null}

          <BiWeeklyActivities activities={userActivities} />

          <HomeBoard />

          <HomeQuickAccess />
        </ScrollView>
        <InstallPrompt />
      </DefaultBackground>
    </>
  );
};

export default Home;
