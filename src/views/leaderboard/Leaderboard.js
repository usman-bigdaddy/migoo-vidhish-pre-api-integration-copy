import React, { useEffect, useState } from "react";
import TopRank from "./components/TopRank";
import TopThree from "./components/TopThree";
import BestPerQuiz from "./components/BestPerQuiz";
import { Typography, Alert, Box } from "@mui/material";
import RankCard from "./components/RankCard";
import YourRank from "./components/YourRank";
import { useDispatch, useSelector } from "react-redux";
import {
  getBestPerQuiz,
  getLeaderboard,
  getTopicLeaderboard,
  getAllTopicsSummary,
} from "../../redux/features/leaderboardSlice";
import { getXp } from "../../redux/features/dashboardSlice";
import { useTranslation } from "react-i18next";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    leaderboard,
    totalStudents,
    topicLeaderboard,
    topic,
    totalTopicParticipants,
    topicsSummary,
    bestPerQuiz,
    loading,
    error,
  } = useSelector((state) => state.leaderboard);
  const { xp, userProfile } = useSelector((state) => state.dashboard);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getLeaderboard());
    dispatch(getBestPerQuiz());
    dispatch(getAllTopicsSummary({ limit: 5 }));
    dispatch(getXp());
    if (selectedCategory && selectedCategory !== "best_per_quiz") {
      dispatch(getTopicLeaderboard({ topicName: selectedCategory, limit: 10 }));
    }
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Use topicLeaderboard if a topic is selected, otherwise use overall leaderboard
  const currentLeaderboard =
    selectedCategory && selectedCategory !== "best_per_quiz"
      ? topicLeaderboard
      : leaderboard;

  // Format the leaderboard data to include a name field for better display
  const formattedLeaderboard =
    currentLeaderboard?.map((student, index) => {
      // Generate initials for avatar fallback from student ID
      const initials = student.student_id
        ? student.student_id.slice(-2).toUpperCase()
        : "ST";

      return {
        ...student,
        // Generate a display name from student_id if name is missing
        name: student.name || `Student ${student.student_id.slice(-4)}`,
        // Add profile picture or null if not available
        profilePicture: student.profilePicture || null,
        initials: initials,
        // Ensure xp_points exists (from API it might be total_xp)
        xp_points: student.xp_points || student.total_xp || 0,
      };
    }) || [];

  const topThree = formattedLeaderboard.slice(0, 3);
  const restOfLeaderboard = formattedLeaderboard.slice(3);

  const calculateUserRank = (leaderboard, userPoints) => {
    if (!leaderboard || !userPoints) return null;

    const sortedLeaderboard = [...leaderboard].sort(
      (a, b) =>
        (b.xp_points || b.total_xp || 0) - (a.xp_points || a.total_xp || 0)
    );

    let rank = 1;
    let previousPoints = null;
    for (let i = 0; i < sortedLeaderboard.length; i++) {
      const currentPoints =
        sortedLeaderboard[i].xp_points || sortedLeaderboard[i].total_xp || 0;
      if (currentPoints !== previousPoints) {
        rank = i + 1;
        previousPoints = currentPoints;
      }
      if (currentPoints === userPoints) {
        return rank;
      }
      if (currentPoints < userPoints) {
        return rank;
      }
    }
    return sortedLeaderboard.length + 1;
  };

  const userRank = calculateUserRank(currentLeaderboard, xp?.points);
  const totalParticipants =
    selectedCategory && selectedCategory !== "best_per_quiz"
      ? totalTopicParticipants
      : totalStudents;

  // Check if Best Per Quiz view is selected
  const isBestPerQuizView = selectedCategory === "best_per_quiz";

  return (
    <>
      <TopRank onCategoryChange={handleCategoryChange} />
      <hr style={{ border: "1px solid #DEDEDF" }} />

      {loading ? (
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          {t("common.loading")}
        </Typography>
      ) : error ? (
        <Typography variant="h6" align="center" color="error" sx={{ my: 4 }}>
          {t("common.errorLoading")}: {error}
        </Typography>
      ) : (
        <>
          {/* Conditional Content Based on Selection */}
          {isBestPerQuizView ? (
            /* Show only Best Per Quiz when selected */
            <BestPerQuiz bestPerQuiz={bestPerQuiz} />
          ) : (
            /* Show normal leaderboard content */
            <>
              {formattedLeaderboard.length > 0 ? (
                <>
                  <TopThree topThree={topThree} />

                  <YourRank text={t("leaderboard.yourRank")} />
                  <RankCard
                    points={xp?.points || 0}
                    rank={userRank || "NA"}
                    name={t("You")}
                    // name={t("leaderboard.you")}
                    profilePicture={userProfile?.profilePicture}
                    initials={userProfile?.name?.charAt(0) || "U"}
                  />

                  <YourRank text={t("leaderboard.topCompetitors")} />

                  {restOfLeaderboard?.map((student, index) => (
                    <RankCard
                      key={student.student_id}
                      points={student.xp_points || student.total_xp || 0}
                      rank={index + 4} // Ranks start from 4 for the rest of the leaderboard
                      name={student.name}
                      profilePicture={student.profilePicture}
                      initials={student.initials}
                    />
                  ))}

                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: "text.secondary" }}
                  >
                    {t("leaderboard.totalParticipants", {
                      count: totalParticipants || 0,
                    })}
                  </Typography>
                </>
              ) : (
                <Typography variant="h6" align="center" sx={{ my: 4 }}>
                  {selectedCategory
                    ? t("leaderboard.noDataForTopic", {
                        topic: selectedCategory,
                      })
                    : t("leaderboard.noData")}
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Leaderboard;
