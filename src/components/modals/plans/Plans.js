import React, { useState } from "react";
import { Box, Container, Grid2, Typography, Button, Card, CardContent, Stack, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import InfoIcon from '@mui/icons-material/Info';

const StyledCard = styled(Card)(({ theme, isActive }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  transform: isActive ? "scale(1.02)" : "scale(1)",
  border: isActive ? "2px solid #2196f3" : "none",
  boxShadow: isActive
    ? "0 8px 16px rgba(33, 150, 243, 0.2)"
    : "0 4px 8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)"
  }
}));

const PricingButton = styled(Button)(({ isActive }) => ({
  width: "100%",
  marginTop: "16px",
  backgroundColor: isActive ? "#2196f3" : "#e0e0e0",
  color: isActive ? "#ffffff" : "#424242",
  "&:hover": {
    backgroundColor: isActive ? "#1976d2" : "#bdbdbd"
  }
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  gap: "8px"
}));

const Plans = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "7-Day Free Trial",
        "Reading Comprehension Training",
        "Personalized Learning Journey",
        "Progress Tracking"
      ],
      tooltip: "Perfect for small teams and startups"
    },
    {
      id: "premium",
      name: "Premium Plan",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "7-Day Free Trial",
        "Premium Reading Comprehension Mastery",
        "Advanced Vocabulary Modules",
        "Personalized Learning Journey",
        "Progress Tracking",
        "Priority Customer assistance"
      ],
      tooltip: "Best for growing businesses"
    }
  ];

  const handlePlanSelect = (planId) => {
    setActivePlan(planId === activePlan ? null : planId);
  };

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
      
        <Button
          variant="outlined"
          onClick={toggleBillingCycle}
          sx={{ mb: 4 }}
          aria-label="Toggle billing cycle"
        >
          {billingCycle === "monthly" ? "Switch to Annual" : "Switch to Monthly"}
        </Button>
      </Box>

      <Grid2 container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid2 item xs={12} sm={6} md={5} key={plan.id}>
            <StyledCard
              isActive={activePlan === plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              aria-selected={activePlan === plan.id}
              tabIndex={0}
              role="button"
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="h2">
                      {plan.name}
                    </Typography>
                    <Tooltip title={plan.tooltip} arrow>
                      <IconButton size="small">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography variant="h4" component="p" color="primary">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    <Typography variant="subtitle1" component="span" color="text.secondary">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </Typography>
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    {plan.features.map((feature, index) => (
                      <FeatureItem key={index}>
                        <CheckIcon 
                        // color="#2A8EFE" 
                        color="primary" 
                        size={16} />
                        <Typography>{feature}</Typography>
                      </FeatureItem>
                    ))}
                  </Box>

                  <PricingButton
                    variant="contained"
                    isActive={activePlan === plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    aria-label={`Select ${plan.name}`}
                  >
                    {activePlan === plan.id ? "Selected" : "Get Started"}
                  </PricingButton>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Plans;