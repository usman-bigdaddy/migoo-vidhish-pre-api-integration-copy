import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Container,
  Stack,
  Card,
  CardContent,
  Tooltip,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import { Grid2 } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  changePlan,
  getSubscription,
  subscribe,
} from "../../redux/features/settingSlice";

/* ---------------- Styled components ---------------- */
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  transform: isActive ? "scale(1.02)" : "scale(1)",
  border: isActive ? "2px solid #2196f3" : "none",
  boxShadow: isActive
    ? "0 8px 16px rgba(33, 150, 243, 0.2)"
    : "0 4px 8px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const PricingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  width: "100%",
  marginTop: 16,
  backgroundColor: isActive ? "#2196f3" : "#e0e0e0",
  color: isActive ? "#fff" : "#424242",
  "&:hover": {
    backgroundColor: isActive ? "#1976d2" : "#bdbdbd",
  },
}));

const FeatureItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  gap: "8px",
});

const steps = ["Choose Plan", "Confirm Billing", "Success"];
const planList = [
  {
    id: "basic_01j1cz4j172mk9x0t21kem4c8k",
    name: "Basic Plan",
    monthlyPrice: 29,
    features: [
      "7-Day Free Trial",
      "Reading Comprehension Training",
      "Personalized Learning Journey",
      "Progress Tracking",
    ],
    tooltip: "Perfect for small teams and startups",
  },
  {
    id: "pro_01j1czd1pxc775djq6ahw8cshh",
    name: "Expert Plan",
    monthlyPrice: 99,
    features: [
      "7-Day Free Trial",
      "Premium Reading Comprehension Mastery",
      "Advanced Vocabulary Modules",
      "Personalized Learning Journey",
      "Progress Tracking",
      "Priority Customer Assistance",
    ],
    tooltip: "Best for growing businesses",
  },
];

/* ---------------- Component ---------------- */
const UpgradeFlow = ({ onClose }) => {
  const { isDarkMode } = useThemeContext();
  const dispatch = useDispatch();
  const {
    planName,
    planId,
    subscriptionStatus,
    nextBillDate,
    checkoutUrl,
    loading,
    error,
  } = useSelector((state) => state.setting);

  const { user } = useSelector((state) => state.auth);
  console.log(planId);
  const { t } = useTranslation();

  const steps = t("upgrade.steps", { returnObjects: true });

  const plans = [
    {
      id: "pri_01j1czabpekb901eyke626x76b",
      ...t("upgrade.basicPlan", { returnObjects: true }),
    },
    {
      id: "pri_01j1czex0say0yzwhjzqam62eg",
      ...t("upgrade.premiumPlan", { returnObjects: true }),
    },
  ];

  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isSubscribed = subscriptionStatus === "active";

  useEffect(() => {
    if (checkoutUrl && activeStep === 1) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl, activeStep]);

  useEffect(() => {
    const myEmail = user.profile?.email;
    if (activeStep === 1 && selectedPlan) {
      window.location.href = `https://pay.paddle.io/hsc_01jzn46ny95cpy3z3ebf7qd2g7_ndw5g7w8f9eqm7ycsw27bam98zv5p7k1?price_id=${selectedPlan.id}&user_email=${myEmail}`;
    }
  }, [activeStep, selectedPlan]);

  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
    }
  }, [error]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    handleNext();
  };

  const handleUpgrade = () => {
    alert(selectedPlan.id);
    return;
    if (selectedPlan) {
      if (isSubscribed) {
        dispatch(changePlan(planId)).then((result) => {
          if (result.payload) {
            showSnackbar("Plan changed successfully!", "success");
            handleNext();
          }
        });
      } else {
        dispatch(subscribe(planId)).then((result) => {
          if (result.payload?.checkoutUrl) {
            // Redirect handled by useEffect
          }
        });
      }
    }
  };

  return (
    <Box p={3}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 0: Choose Plan */}
      {activeStep === 0 && (
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" gutterBottom>
            {t("upgrade.choosePlanTitle")}
          </Typography>

          <Grid2 container spacing={4} justifyContent="center" mt={2}>
            {plans.map((plan) => {
              const isActive = selectedPlan?.id === plan.id;
              return (
                <Grid2 key={plan.id} xs={12} sm={6} md={5}>
                  <Tooltip title={plan.tooltip} arrow>
                    <StyledCard
                      isActive={isActive}
                      onClick={
                        plan.id !== planId
                          ? () => handlePlanSelect(plan)
                          : undefined
                      }
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" fontWeight="bold">
                              {plan.name}
                            </Typography>
                            <InfoIcon fontSize="small" color="action" />
                          </Box>

                          <Typography variant="h5">
                            {plan.monthlyPrice}
                          </Typography>

                          <Divider />

                          {plan.features.map((f, idx) => (
                            <FeatureItem key={idx}>
                              <CheckIcon fontSize="small" color="primary" />
                              <Typography variant="body2">{f}</Typography>
                            </FeatureItem>
                          ))}

                          {plan.id !== planId && (
                            <PricingButton isActive={isActive}>
                              {t("upgrade.selectPlan")}
                            </PricingButton>
                          )}
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Tooltip>
                </Grid2>
              );
            })}
          </Grid2>
        </Container>
      )}

      {/* {activeStep === 11 && selectedPlan && (
        <Box>
          <Typography variant="h5" gutterBottom>
            {t("upgrade.upgradeTitle", { planName: selectedPlan.name })}
          </Typography>

          <Box my={2}>
            <Typography>
              <strong>{t("upgrade.planLabel")}:</strong> {selectedPlan.name}
            </Typography>
            <Typography>
              <strong>{t("upgrade.billingLabel")}:</strong>{" "}
              {selectedPlan.monthlyPrice}
            </Typography>
            <Typography>
              <strong>{t("upgrade.startLabel")}:</strong>{" "}
              {t("upgrade.startLabel")}
            </Typography>
            <Typography>
              <strong>{t("upgrade.renewalLabel")}:</strong>{" "}
              {t("upgrade.renewalLabel")}
            </Typography>
          </Box>

          <Box mt={3}>
            <Button variant="contained" onClick={handleUpgrade}>
              {t("upgrade.confirmUpgrade")}
            </Button>
            <Button onClick={handleBack} sx={{ ml: 2 }}>
              {t("upgrade.goBack")}
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 1 && selectedPlan && (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            {t("upgrade.successTitle")}
          </Typography>
          <Typography>
            {t("upgrade.successMessage", { planName: selectedPlan.name })}
          </Typography>
          <Typography>
            {t("upgrade.successBilling", { date: "01/06/2025" })}{" "}
          </Typography>

          <Box mt={3}>
            <Button variant="contained" onClick={onClose}>
              {t("upgrade.startLearning")}
            </Button>
          </Box>
        </Box>
      )} */}

      {activeStep === 1 && selectedPlan && (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-30"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <p className="text-xl font-semibold text-blue-700 animate-pulse">
            Please wait while we redirect you...
          </p>
        </div>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpgradeFlow;
