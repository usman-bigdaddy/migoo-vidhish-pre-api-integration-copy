import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Start quiz for a specific category
export const startQuizCategory = createAsyncThunk(
  "sentence/startQuizCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/quiz/start-category", { category });
      const { success, category: responseCategory, first_question, questions, session_id, total_questions } = response.data;
      if (!success) {
        throw new Error("Failed to start quiz");
      }
      return { category: responseCategory, first_question, questions, session_id, total_questions };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to start quiz. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit quiz answers
export const submitQuiz = createAsyncThunk(
  "sentence/submitQuiz",
  async ({ session_id, answer }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/quiz/submit", { session_id, answer });
      const { submissionResult, success } = response.data;
      if (!success) {
        throw new Error("Failed to submit quiz");
      }
      return submissionResult; // Assume submissionResult contains feedback or score
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit quiz. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Complete quiz
export const completeQuiz = createAsyncThunk(
  "sentence/completeQuiz",
  async ({ session_id }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/quiz/complete", { session_id });
      const { completionData, success } = response.data;
      if (!success) {
        throw new Error("Failed to complete quiz");
      }
      return completionData; // Assume completionData contains final score or status
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to complete quiz. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the quiz slice
const initialState = {
  quizData: null, // Stores quiz session data from start-category (category, first_question, questions, session_id, total_questions)
  submissionResult: null, // Stores result of quiz submission
  completionData: null, // Stores quiz completion data
  loading: false,
  error: null,
};

// Quiz slice
const sentenceSlice = createSlice({
  name: "sentence",
  initialState,
  reducers: {
    // Reset quiz state
    resetQuiz: (state) => {
      state.quizData = null;
      state.submissionResult = null;
      state.completionData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // startQuizCategory cases
      .addCase(startQuizCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startQuizCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.quizData = action.payload;
      })
      .addCase(startQuizCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // submitQuiz cases
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionResult = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // completeQuiz cases
      .addCase(completeQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.completionData = action.payload;
      })
      .addCase(completeQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetQuiz } = sentenceSlice.actions;

// Export reducer
export default sentenceSlice.reducer;