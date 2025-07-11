import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import TestScore from './TestScore';
import { useTranslation } from 'react-i18next';

const LastTestScores = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DashboardCard title={t('lastTestScores.title')}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Typography variant="body2" fontWeight="700">
            {t('lastTestScores.description')}
          </Typography> */}
          <Stack direction="column" spacing={2} mt={3} mb={3} alignItems="center">
            <TestScore 
              title={t('lastTestScores.scores.reading')}
              sp={150}
              progress={54}
            />
            <TestScore 
              title={t('lastTestScores.scores.sentenceCompletion')}
              sp={150}
              progress={87}
            />
            <TestScore 
              title={t('lastTestScores.scores.resentencing')}
              sp={150}
              progress={85}
            />
            <TestScore 
              title={t('lastTestScores.scores.hearingComprehension')}
              sp={150}
              progress={62}
            />
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default LastTestScores;
