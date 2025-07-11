import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useTranslation } from 'react-i18next';

const YourProficiencyLevel = ({visual}) => {
  // chart color
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DashboardCard title={t('proficiency.title')}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Typography variant="body2" fontWeight="700">
            {t('proficiency.description')}
          </Typography> */}
          <Stack direction="row" spacing={1} mt={4} mb={4} alignItems="center">
           <Typography 
            m={5} color='primary' variant="h1">{visual?.level_name}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YourProficiencyLevel;
