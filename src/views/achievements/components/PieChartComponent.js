import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid2, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompletedTick from "../../../assets/images/general/completed-tick.svg";
import { useThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const WeeklyChallengeWithProgress = ({ progress_percentage }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: false },
      height: 150,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { width: 100, height: 100 },
        },
      },
    ],
  };

  const seriescolumnchart = [progress_percentage, 100 - progress_percentage, 0];

  return (
    <Grid2 container spacing={3} justifyContent="space-between" alignItems="center">
      <Grid2 item xs={12} sm={6}>
        <Typography variant="h5" mb={1}>{t('weeklyChallenge.title')}</Typography>
        <Typography color="text.secondary">
          {t('weeklyChallenge.subtitle')}{" "}
          <Typography component="span" fontWeight={600} color="red">
            {t('weeklyChallenge.reward')}
          </Typography>
        </Typography>

        <Box mt={2}>
          <Box display="flex" alignItems="center" mb={0.5}>
            <CheckCircleOutlineIcon sx={{ mr: 1, color: isDarkMode ? "#1cff27" : '#5d015b' }} />
            <Typography variant="body1">{t('weeklyChallenge.tasks.readingTest')}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <CheckCircleOutlineIcon sx={{ mr: 1, color: isDarkMode ? "#1cff27" : '#5d015b' }} />
            <Typography variant="body1">{t('weeklyChallenge.tasks.wordTest')}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckCircleOutlineIcon sx={{ mr: 1, color: isDarkMode ? "#1cff27" : '#5d015b' }} />
            <Typography variant="body1">{t('weeklyChallenge.tasks.listeningTest')}</Typography>
          </Box>
        </Box>
      </Grid2>

      <Grid2 item xs={12} sm={6} display="flex" justifyContent="center">
        {progress_percentage === 100 ? (
          <Box>
            <img src={CompletedTick} alt="complete-tick" style={{ maxWidth: '80%', height: 'auto' }} />
          </Box>
        ) : (
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        )}
      </Grid2>
    </Grid2>
  );
};

export default WeeklyChallengeWithProgress;
