import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from '@mui/material';
import Chart from 'react-apexcharts';
import DashboardCard from '../../shared/DashboardCard';
import { useThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const TestResults = ({
  testname,
  openResultModal,
  handleCloseModal,
  donutChartOptions,
  donutChartSeries,
  correctCount,
  incorrectCount,
}) => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Dialog open={openResultModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>{testname}</DialogTitle>

      <DialogContent>
        <Typography variant="h6" mb={2}>
          {t('testResults.performance')}
        </Typography>

        <Chart options={donutChartOptions} series={donutChartSeries} type="donut" height={300} />

        <Typography mt={2}>
          {t('testResults.correct')}: {correctCount}
        </Typography>
        <Typography>
          {t('testResults.incorrect')}: {incorrectCount}
        </Typography>

        <DashboardCard title="">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" m={1}>
              {t('testResults.pointsGained')}:{' '}
              <span style={{ color: isDarkMode ? '#1cff27' : '#5d015b' }}>420</span>
            </Typography>
          </Box>
        </DashboardCard>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal} color="primary" variant="contained">
          {t('testResults.review')}
        </Button>
        <Button onClick={handleCloseModal} color="primary" variant="contained">
          {t('testResults.startNew')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestResults;
