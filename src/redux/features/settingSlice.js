import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

export const getSubscription = createAsyncThunk(
  "setting/getSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/subscription");
      const { success, plan_id, plan_name, is_paying, subscription_id } = response.data;

      if (!success) {
        throw new Error("Failed to retrieve subscription info");
      }

      return { planId: plan_id, planName: plan_name, subscriptionId: subscription_id };
    } catch (error) {
      console.error("Get subscription error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieve subscription info. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getSubscriptionStatus = createAsyncThunk(
  "setting/getSubscriptionStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/subscription/status");
      const { success, plan_id, plan_name, subscription_id, subscription_status, next_bill_date } = response.data;

      if (!success) {
        throw new Error("Failed to retrieve subscription status");
      }

      return {
        planId: plan_id,
        planName: plan_name,
        subscriptionId: subscription_id,
        subscriptionStatus: subscription_status,
        nextBillDate: next_bill_date,
      };
    } catch (error) {
      console.error("Get subscription status error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieve subscription status. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const subscribe = createAsyncThunk(
  "setting/subscribe",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/subscription/checkout", { plan_id: planId });
      const { success, checkout_url } = response.data;

      if (!success || !checkout_url) {
        throw new Error("Failed to initiate subscription");
      }

      return { checkoutUrl: checkout_url, planId };
    } catch (error) {
      console.error("Subscription error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to initiate subscription. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const changePlan = createAsyncThunk(
  "setting/changePlan",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/subscription/change_plan", { plan_id: planId });
      const { success } = response.data;

      if (!success) {
        throw new Error("Failed to change plan");
      }

      return { planId };
    } catch (error) {
      console.error("Change plan error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change plan. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const unsubscribe = createAsyncThunk(
  "setting/unsubscribe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/subscription/cancel");
      const { success, message } = response.data;

      if (!success) {
        throw new Error("Failed to cancel subscription");
      }

      return message;
    } catch (error) {
      console.error("Unsubscribe error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to cancel subscription. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getBillingPortal = createAsyncThunk(
  "setting/getBillingPortal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/subscription/portal");
      const { success, portal_url } = response.data;

      if (!success || !portal_url) {
        throw new Error("Failed to retrieve billing portal");
      }

      return portal_url;
    } catch (error) {
      console.error("Billing portal error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieve billing portal. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "setting/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
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

export const getAvatar = createAsyncThunk(
  "setting/getAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/student/avatar");
      const { success, avatar_url } = response.data;

      if (!success) {
        throw new Error("Failed to retrieve avatar");
      }

      return avatar_url;
    } catch (error) {
      console.error("Avatar retrieval error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to retrieve avatar. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "setting/deleteAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/student/avatar");
      const { success, message } = response.data;

      if (!success) {
        throw new Error("Failed to delete avatar");
      }

      return message;
    } catch (error) {
      console.error("Avatar deletion error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete avatar. Please try again.";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  checkoutUrl: null, // Stores the Paddle checkout URL
  subscriptionId: null, // Stores the subscription ID
  isSubscribed: false, // Tracks subscription status
  planId: null, // Stores the current plan ID
  planName: null, // Stores the current plan name
  subscriptionStatus: null, // Stores subscription status (e.g., active)
  nextBillDate: null, // Stores next billing date
  portalUrl: null, // Stores billing portal URL
  avatarUrl: null, // Stores the user's avatar URL
  loading: false, // Tracks loading state for async actions
  error: null, // Stores error messages
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.checkoutUrl = null;
      state.subscriptionId = null;
      state.isSubscribed = false;
      state.planId = null;
      state.planName = null;
      state.subscriptionStatus = null;
      state.nextBillDate = null;
      state.portalUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Subscription
    builder
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.planId = action.payload.planId;
        state.planName = action.payload.planName;
        state.subscriptionId = action.payload.subscriptionId;
        state.isSubscribed = !!action.payload.subscriptionId;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Subscription Status
    builder
      .addCase(getSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.planId = action.payload.planId;
        state.planName = action.payload.planName;
        state.subscriptionId = action.payload.subscriptionId;
        state.subscriptionStatus = action.payload.subscriptionStatus;
        state.nextBillDate = action.payload.nextBillDate;
        state.isSubscribed = action.payload.subscriptionStatus === "active";
      })
      .addCase(getSubscriptionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Subscribe
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload.checkoutUrl;
        state.planId = action.payload.planId;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change Plan
    builder
      .addCase(changePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.planId = action.payload.planId;
      })
      .addCase(changePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Unsubscribe
    builder
      .addCase(unsubscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.loading = false;
        state.checkoutUrl = null;
        state.subscriptionId = null;
        state.isSubscribed = false;
        state.planId = null;
        state.planName = null;
        state.subscriptionStatus = null;
        state.nextBillDate = null;
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Billing Portal
    builder
      .addCase(getBillingPortal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillingPortal.fulfilled, (state, action) => {
        state.loading = false;
        state.portalUrl = action.payload;
      })
      .addCase(getBillingPortal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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
        state.avatarUrl = null;
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubscriptionState } = settingSlice.actions;
export default settingSlice.reducer;