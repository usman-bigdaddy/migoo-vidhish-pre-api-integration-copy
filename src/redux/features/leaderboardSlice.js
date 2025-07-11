import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Fetch overall leaderboard async thunk
export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/leaderboard");
      const { leaderboard, success, total_students } = response.data;
      if (!success) {
        throw new Error("Failed to fetch leaderboard data");
      }
      return { leaderboard, total_students };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch leaderboard. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch topic-specific leaderboard async thunk
export const getTopicLeaderboard = createAsyncThunk(
  "leaderboard/getTopicLeaderboard",
  async ({ topicName, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/leaderboard/topic/${topicName}?limit=${limit}`);
      const { leaderboard, success, topic, total_participants } = response.data;
      if (!success) {
        throw new Error("Failed to fetch topic leaderboard data");
      }
      return { topic, leaderboard, total_participants };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch topic leaderboard. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch all topics summary async thunk
export const getAllTopicsSummary = createAsyncThunk(
  "leaderboard/getAllTopicsSummary",
  async ({ limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/leaderboard/topics?limit=${limit}`);
      const { topics_leaderboard, success } = response.data;
      if (!success) {
        throw new Error("Failed to fetch all topics summary data");
      }
      return topics_leaderboard;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch all topics summary. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch best per quiz async thunk
export const getBestPerQuiz = createAsyncThunk(
  "leaderboard/getBestPerQuiz",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/leaderboard/best_per_quiz");
      const { best_per_quiz, success } = response.data;
      if (!success) {
        throw new Error("Failed to fetch best per quiz data");
      }
      return best_per_quiz;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch best per quiz. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the leaderboard slice
const initialState = {
  leaderboard: [],
  totalStudents: 0,
  topicLeaderboard: [], // State for topic-specific leaderboard
  topic: null, // Current topic name
  totalTopicParticipants: 0, // Total participants for topic leaderboard
  topicsSummary: {}, // State for all topics summary
  bestPerQuiz: [], // State for best per quiz data
  loading: false,
  error: null,
};

// Leaderboard slice
const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {}, // Can be omitted if no synchronous reducers are needed
  extraReducers: (builder) => {
    builder
      // getLeaderboard cases
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.leaderboard;
        state.totalStudents = action.payload.total_students;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getTopicLeaderboard cases
      .addCase(getTopicLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopicLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.topic = action.payload.topic;
        state.topicLeaderboard = action.payload.leaderboard;
        state.totalTopicParticipants = action.payload.total_participants;
      })
      .addCase(getTopicLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getAllTopicsSummary cases
      .addCase(getAllTopicsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTopicsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.topicsSummary = action.payload;
      })
      .addCase(getAllTopicsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getBestPerQuiz cases
      .addCase(getBestPerQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestPerQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.bestPerQuiz = action.payload;
      })
      .addCase(getBestPerQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer
export default leaderboardSlice.reducer;