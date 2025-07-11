import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Fetch next text async thunk
export const getNextText = createAsyncThunk(
  "text/getNextText",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/texts/next");
      const { text, success } = response.data;
      if (!success) {
        throw new Error("Failed to fetch next text");
      }
      return text;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch next text. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit text async thunk
export const submitText = createAsyncThunk(
  "text/submitText",
  async ({ text_id, answers, time_spent }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/texts/submit", { text_id, answers, time_spent });
      const { success, message } = response.data;
      if (!success) {
        throw new Error(message || "Failed to submit text");
      }
      return { message: message || "Text submitted successfully" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit text. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the text slice
const initialState = {
  currentText: null,
  submission: {
    message: null,
    success: false,
  },
  loadingNextText: false,
  loadingSubmitText: false,
  errorNextText: null,
  errorSubmitText: null,
};

// Text slice
const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    resetSubmission: (state) => {
      state.submission = { message: null, success: false };
      state.errorSubmitText = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getNextText cases
      .addCase(getNextText.pending, (state) => {
        state.loadingNextText = true;
        state.errorNextText = null;
      })
      .addCase(getNextText.fulfilled, (state, action) => {
        state.loadingNextText = false;
        state.currentText = action.payload;
      })
      .addCase(getNextText.rejected, (state, action) => {
        state.loadingNextText = false;
        state.errorNextText = action.payload;
      })
      // submitText cases
      .addCase(submitText.pending, (state) => {
        state.loadingSubmitText = true;
        state.errorSubmitText = null;
        state.submission = { message: null, success: false };
      })
      .addCase(submitText.fulfilled, (state, action) => {
        state.loadingSubmitText = false;
        state.submission = { message: action.payload.message, success: true };
      })
      .addCase(submitText.rejected, (state, action) => {
        state.loadingSubmitText = false;
        state.errorSubmitText = action.payload;
        state.submission = { message: null, success: false };
      });
  },
});

// Export actions and reducer
export const { resetSubmission } = textSlice.actions;
export default textSlice.reducer;