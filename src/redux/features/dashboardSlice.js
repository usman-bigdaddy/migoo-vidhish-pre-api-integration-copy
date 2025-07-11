import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Fetch visualization data async thunk
export const getVisualization = createAsyncThunk(
  "dashboard/getVisualization",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/student/visualization");
      const { visualization, success } = response.data;
      if (!success) {
        throw new Error("Failed to fetch visualization data");
      }
      return visualization;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch visualization data. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch XP data async thunk
export const getXp = createAsyncThunk(
  "dashboard/getXp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/student/xp");
      console.log("XP API response:", response.data); // Debug log
      const { xp, success } = response.data;
      if (!success) {
        throw new Error("Failed to fetch XP data");
      }
      return xp;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch XP data. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the dashboard slice
const initialState = {
  visualization: null, // Stores { ability_scale, accuracy, confidence_interval, level_name, level_progress, strongest_topics, text, theta, weakest_topics }
  xp: null, // Stores { points, student_id, student_name }
  loading: false, // Tracks loading state for both thunks
  error: null, // Stores error messages
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVisualization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisualization.fulfilled, (state, action) => {
        state.loading = false;
        state.visualization = action.payload; // Store visualization data
      })
      .addCase(getVisualization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get XP
    builder
      .addCase(getXp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getXp.fulfilled, (state, action) => {
        state.loading = false;
        state.xp = action.payload; // Store XP data
      })
      .addCase(getXp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Export reducer
export default dashboardSlice.reducer;