import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import leaderboardReducer from "../features/leaderboardSlice";
import dashboardReducer from "../features/dashboardSlice";
import vocabularyReducer from "../features/vocabularySlice";
import textReducer from "../features/readingSlice";
import sentenceReducer from "../features/sentenceSlice";
import listeningReducer from "../features/listeningSlice";
import settingReducer from "../features/settingSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    text: textReducer,
    sentence: sentenceReducer,
    listening: listeningReducer,
    vocabulary: vocabularyReducer,
    leaderboard: leaderboardReducer,
    setting: settingReducer
  },
});
