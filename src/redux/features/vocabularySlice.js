import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Fetch random vocabulary word
export const getRandomWord = createAsyncThunk(
  "vocabulary/getRandomWord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/vocabulary/random");
      const { success, data, message } = response.data;
      if (!success || !data?.word || !data?.translation) {
        throw new Error(message || "Failed to fetch random word");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch random word. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Check vocabulary word
export const checkVocabularyWord = createAsyncThunk(
  "vocabulary/checkVocabularyWord",
  async (wordData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vocabulary/check", wordData);
      const { success, data, message } = response.data;
      if (!success) {
        throw new Error(message || "Failed to check vocabulary word");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to check vocabulary word. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Add new vocabulary word
export const addVocabularyWord = createAsyncThunk(
  "vocabulary/addVocabularyWord",
  async (wordData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vocabulary/add", wordData);
      const { success, data, message } = response.data;
      if (!success) {
        throw new Error(message || "Failed to add vocabulary word");
      }
      return data || wordData; // Return API data if available, else input data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add vocabulary word. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch vocabulary game data
export const getVocabularyGame = createAsyncThunk(
  "vocabulary/getVocabularyGame",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/vocabulary/game");
      const { success, pairs, english, hebrew } = response.data;
      if (!success) {
        throw new Error(message || "Failed to fetch game data");
      }
      return {english, hebrew, pairs};
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch game data. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Check vocabulary game answers
export const checkVocabularyGame = createAsyncThunk(
  "vocabulary/checkVocabularyGame",
  async (answers, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vocabulary/game/check", answers);
      const { success, data, message } = response.data;
      if (!success) {
        throw new Error(message || "Failed to check game answers");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to check game answers. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  randomWord: null,
  addedWords: [],
  gameData: null,
  checkResult: null,
  gameCheckResult: null,
  loading: false,
  error: null,
};

const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getRandomWord
      .addCase(getRandomWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomWord.fulfilled, (state, action) => {
        state.loading = false;
        state.randomWord = action.payload;
      })
      .addCase(getRandomWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle checkVocabularyWord
      .addCase(checkVocabularyWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVocabularyWord.fulfilled, (state, action) => {
        state.loading = false;
        state.checkResult = action.payload;
      })
      .addCase(checkVocabularyWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addVocabularyWord
      .addCase(addVocabularyWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVocabularyWord.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.addedWords.some(
          (w) => w.word === action.payload.word
        );
        if (!exists) {
          state.addedWords.push(action.payload);
        }
      })
      .addCase(addVocabularyWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getVocabularyGame
      .addCase(getVocabularyGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVocabularyGame.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
      })
      .addCase(getVocabularyGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle checkVocabularyGame
      .addCase(checkVocabularyGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVocabularyGame.fulfilled, (state, action) => {
        state.loading = false;
        state.gameCheckResult = action.payload;
      })
      .addCase(checkVocabularyGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearError } = vocabularySlice.actions;
export default vocabularySlice.reducer;