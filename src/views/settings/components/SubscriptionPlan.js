import React, { useEffect } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelPlanModal from "../../../components/modals/cancelplan/CancelPlan";
import UpgradeButton from "../../../components/upgradebutton/UpgradeButton";
import { useThemeContext } from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  getBillingPortal,
  getSubscription,
  getSubscriptionStatus,
} from "../../../redux/features/settingSlice";
import { useTranslation } from "react-i18next";

const SubscriptionPlan = () => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { planName, subscriptionStatus, nextBillDate, loading, error } =
    useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(getSubscription());
    dispatch(getSubscriptionStatus());
  }, [dispatch]);

  const handleUpdatePayment = () => {
    dispatch(getBillingPortal()).then((result) => {
      if (result.payload) {
        window.location.href = result.payload;
      }
    });
  };

  const isExpertPlan =
    planName?.toLowerCase().includes("expert") ||
    planName?.toLowerCase().includes("premium");
  const isSubscribed = subscriptionStatus === "active";

  return (
    <>
      <Stack maxWidth="500px" width="100%" spacing={2}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color={isDarkMode ? "#1cff27" : "#5d015b"}>
            {t("settings.subscriptionPlan.basic")}{" "}
          </Typography>
          <div>
            {!isSubscribed || !isExpertPlan ? (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                sx={{ borderRadius: "999px", mr: 1 }}
                disabled
              >
                {t("settings.subscriptionPlan.currentPlan")}
              </Button>
            ) : null}
          </div>
        </Paper>

        <Paper elevation={1} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" color={isDarkMode ? "#1cff27" : "#5d015b"}>
              {t("settings.subscriptionPlan.expert")}{" "}
              {isSubscribed && isExpertPlan
                ? `(${t(
                    `settings.subscriptionPlan.status.${subscriptionStatus}`
                  )})`
                : ""}
            </Typography>
            {isSubscribed && isExpertPlan ? (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                sx={{ borderRadius: "999px" }}
                disabled
              >
                {t("settings.subscriptionPlan.currentPlan")}
              </Button>
            ) : (
              <UpgradeButton />
            )}
          </Box>
          <hr style={{ borderColor: "grey" }} />
          <Box mt={1}>
            {[
              "Unlimited Reading",
              "Advanced Vocabulary",
              "Priority Support",
              "Personalized Insights",
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
              >
                <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {isSubscribed && (
          <Box>
            {/* <Typography>
              {t("settings.subscriptionPlan.nextBilling")}:{" "}
              {nextBillDate
                ? format(new Date(nextBillDate), "MMMM d, yyyy")
                : t("settings.subscriptionPlan.na")}
            </Typography> */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpdatePayment}
              sx={{ mt: 2, mr: 2 }}
            >
              Update Payment
            </Button>
            <CancelPlanModal />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default SubscriptionPlan;
