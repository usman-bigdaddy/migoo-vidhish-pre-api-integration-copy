import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import ActivityComponent from './ActivityComponent';
import Complete from "../../../assets/images/general/complete.svg";
import Incomplete from "../../../assets/images/general/incomplete.svg";
import ThisWeek from "../../../assets/images/general/this-week.svg";
import TotalTest from "../../../assets/images/general/total-test.svg";
import { useTranslation } from 'react-i18next';

const Activity = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DashboardCard title={t('activity.title')}>
      <>
        <Grid container spacing={3} justifyContent={"space-around"}>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <ActivityComponent 
              image={TotalTest}
              title={t('activity.totalTest')}
              count={30}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <ActivityComponent
              image={Complete}
              title={t('activity.complete')}
              count={30}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <ActivityComponent
              image={Incomplete}
              title={t('activity.incomplete')}
              count={4}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <ActivityComponent
              image={ThisWeek}
              title={t('activity.thisWeek')}
              count={12}
            />
          </Grid>
        </Grid>
      </>
    </DashboardCard>
  );
};

export default Activity;
