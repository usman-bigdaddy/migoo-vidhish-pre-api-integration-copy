import { Box, Button, Typography, Grid2 } from '@mui/material';
import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Ready = () => {
  const { t } = useTranslation();

  return (
    <DashboardCard>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 
          container 
          spacing={2} 
          alignItems="center" 
          justifyContent={{ xs: 'center', md: 'space-between' }} 
        >
          <Grid2 item xs={12} md={8}>
            <Typography textAlign={{ xs: 'center', md: 'left' }}>
              {t('ready.message')}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
            <Button 
              component={Link} 
              to="/english-test" 
              variant="contained"
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              {t('ready.button')}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </DashboardCard>
  );
};

export default Ready;
