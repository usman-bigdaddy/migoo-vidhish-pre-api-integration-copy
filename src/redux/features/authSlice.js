import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// Securely clear all auth-related storage
const clearAuthStorage = () => {
  try {
    localStorage.removeItem("token");
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing auth storage:", error);
    return false;
  }
};

// Register async thunk
export const register = createAsyncThunk(
  "auth/register",
  async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", {
        first_name,
        last_name,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Login async thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successful:", response.data);
      return { user, token };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send password reset email. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Change Password async thunk
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ current_password, new_password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/change-password", {
        current_password,
        new_password,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Update Profile async thunk
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ first_name, last_name, email }, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/student/profile", {
        first_name,
        last_name,
        email,
      });
      const { profile } = response.data;
      return { profile };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/student/profile");
      const { profile } = response.data;
      return { profile };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch profile. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/login/google/authorized", {
        withCredentials: true,
      });
      const { success, token, student_id } = response.data;

      if (!success) {
        throw new Error("Google login failed");
      }

      localStorage.setItem("token", token);

      return { token, student_id };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Google login failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout async thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const cleared = clearAuthStorage();
      if (!cleared) {
        throw new Error("Failed to clear authentication storage");
      }
      return {};
    } catch (error) {
      const errorMessage = error.message || "Logout failed. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for the auth slice
const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Google Login
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.student_id = action.payload.student_id;
        state.isAuthenticated = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer
export default authSlice.reducer;
