import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup from "./components/YearlyBreakup";
import RecentTransactions from "./components/LinearProgressComponent";
import ProductPerformance from "./components/ProductPerformance";
import Blog from "./components/Blog";
import MonthlyEarnings from "./components/MonthlyEarnings";
import Ready from "./components/Ready";
import StudentPoints from "./components/StudentPoints";
import YourProficiencyLevel from "./components/YourProficiencyLevel";
import LastTestScores from "./components/LastTestScores";
// import TestsTable from './components/TestsTable';
import ScoresGraph from "./components/ScoresGraph";
import Activity from "./components/Activity";
import TestsTable from "../../components/tables/TestsTable";
import Welcome from "../../components/modals/welcome/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { getVisualization, getXp } from "../../redux/features/dashboardSlice";
import { getProfile } from "../../redux/features/authSlice";
import {useTranslation} from "react-i18next"

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation()

  const { visualization, xp } = useSelector(
    (state) => state.dashboard
  );

  console.log(visualization, 'visualization')
  console.log(xp, 'xp')

  useEffect(() => {
    const isFirstTime = localStorage.getItem("firstTime");
    if (isFirstTime === "true") {
      setShowWelcome(true);
      localStorage.removeItem("firstTime"); //remove local storage
    }
  }, []);

  useEffect(() => {
    dispatch(getVisualization());
    dispatch(getXp());
    dispatch(getProfile())
  }, [dispatch]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {showWelcome && <Welcome />}
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {/* <Typography variant="h3">Dashboard</Typography> */}
            <Grid item xs={12}>
            <Typography variant="h3">{t("titles.dashboard")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Ready />
            </Grid>

            <Grid item xs={12}>
              {/* <SalesOverview /> */}
              <StudentPoints xp={xp} />
            </Grid>
            <Grid item xs={12}>
              {/* <SalesOverview /> */}
              {/* <StudentPoints /> */}
              <Activity />
            </Grid>
            <Grid item xs={12}>
              {/* <SalesOverview /> */}
              {/* <StudentPoints /> */}
              <ScoresGraph />
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <YearlyBreakup /> */}
                <YourProficiencyLevel visual={visualization} />
              </Grid>
              <Grid item xs={12}>
                <LastTestScores />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={8}>
            <TestsTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
