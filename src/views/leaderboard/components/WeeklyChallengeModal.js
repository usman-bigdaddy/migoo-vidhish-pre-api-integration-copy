import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import "./style.css";
import { Link } from "react-router";

const WeeklyChallengeModal = ({ title, subtitle, subtext }) => {
  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1} textAlign="center">
          {title}
        </Typography>
      )}

      {subtext && (
        <Typography variant="body1" mb={2} textAlign="center">
          {subtext}
        </Typography>
      )}

      {subtitle && (
        <Typography variant="h6" mb={3} textAlign="center">
          {subtitle}
        </Typography>
      )}

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to="/reading"
        >
          Start Challenge
        </Button>
      </Box>
    </>
  );
};

export default WeeklyChallengeModal;
