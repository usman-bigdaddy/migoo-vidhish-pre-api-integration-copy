import React from 'react';
import { Box, Card } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import PieChartComponent from './PieChartComponent';
import { useTranslation } from 'react-i18next';

const Challenges = () => {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t('titles.challenges')}>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Card sx={{ boxShadow: "5px 5px -5px 5px grey", color: "#76777a" }}>
          <PieChartComponent progress_percentage={100} />
        </Card>
      </Box>
    </DashboardCard>
  );
};

export default Challenges;
