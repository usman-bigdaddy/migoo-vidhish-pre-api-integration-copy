"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography } from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import { useTranslation } from "react-i18next";
import api from "../../../redux/api/axiosInstance";

const YourProficiencyLevel = ({ visual }) => {
  // chart color
  const theme = useTheme();
  const { t } = useTranslation();
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get("/api/student/level");
        setLevel(response.data.level || "Not Set");
      } catch (error) {
        console.error(
          "Failed to fetch student level:",
          error?.response?.data || error.message
        );
        setLevel("Unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, []);
  return (
    <DashboardCard title={t("proficiency.title")}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Typography variant="body2" fontWeight="700">
            {t('proficiency.description')}
          </Typography> */}
          <Stack direction="row" spacing={1} mt={4} mb={4} alignItems="center">
            <Typography m={5} color="primary" variant="h1">
              {loading ? t("loading") : level}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YourProficiencyLevel;
