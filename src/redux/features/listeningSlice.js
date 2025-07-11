import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Fetch grammar audio async thunk
export const getGrammarAudio = createAsyncThunk(
  "listening/getGrammarAudio",
  async ({ level = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/grammar/audio?level=${level}`);
      const { is_mock, question, success } = response.data; // Adjust based on actual response structure
      if (!success) {
        throw new Error("Failed to fetch grammar audio data");
      }
      return { is_mock, question, success };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch grammar audio. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the grammar audio slice
const initialState = {
  audioData: [], // Store audio data (e.g., array of audio objects)
  loading: false,
  error: null,
};

// Grammar audio slice
const listeningSlice = createSlice({
  name: "listening",
  initialState,
  reducers: {
    // Optional: Reset state
    resetGrammarAudio: (state) => {
      state.audioData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGrammarAudio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGrammarAudio.fulfilled, (state, action) => {
        state.loading = false;
        state.audioData = action.payload;
      })
      .addCase(getGrammarAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetGrammarAudio } = listeningSlice.actions;

// Export reducer
export default listeningSlice.reducer;