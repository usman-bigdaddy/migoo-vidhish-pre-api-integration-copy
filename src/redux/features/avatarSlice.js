import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Async thunk to upload a student avatar (POST /api/student/avatar)
export const uploadAvatar = createAsyncThunk(
  "avatar/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      // Expecting formData to contain the avatar file
      const response = await api.post("/api/student/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { success, avatar_url } = response.data;

      if (!success || !avatar_url) {
        throw new Error("Failed to upload avatar");
      }

      return avatar_url;
    } catch (error) {
      console.error("Avatar upload error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to upload avatar. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to fetch the current user's avatar (GET /api/student/avatar)
export const getAvatar = createAsyncThunk(
  "avatar/getAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/student/avatar");
      const { success, avatar_url } = response.data;

      if (!success) {
        throw new Error("Failed to fetch avatar");
      }

      return avatar_url || null; // Return null if no avatar exists
    } catch (error) {
      console.error("Avatar fetch error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch avatar. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to delete the current user's avatar (DELETE /api/student/avatar)
export const deleteAvatar = createAsyncThunk(
  "avatar/deleteAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/student/avatar");
      const { success, message } = response.data;

      if (!success) {
        throw new Error("Failed to delete avatar");
      }

      return message;
    } catch (error) {
      console.error("Avatar delete error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete avatar. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the avatar slice
const initialState = {
  avatarUrl: null, // Stores the avatar URL or null if no avatar
  loading: false, // Tracks loading state for async actions
  error: null, // Stores error messages
};

// Avatar slice
const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Upload Avatar
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatarUrl = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Avatar
    builder
      .addCase(getAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatarUrl = action.payload;
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Avatar
    builder
      .addCase(deleteAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        state.loading = false;
        state.avatarUrl = null; // Reset avatar URL on deletion
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default avatarSlice.reducer;
