import React from 'react';
import { Link } from 'react-router-dom';          // correct Link import
import { Grid, Box, Card, Typography } from '@mui/material';

import PageContainer       from 'src/components/container/PageContainer';
import AuthForgotPassword  from './auth/AuthForgotPassword';
import { useTranslation }  from 'react-i18next';
import blurbg from "../../assets/images/backgrounds/blurbg.png"


const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('forgot.title')} description="Forgot password page">
       <Box
  sx={{
    position: 'relative',
    height: '100vh',
    backgroundImage: `url(${blurbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '&:before': {
      content: '""',
      background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: 0.3,
      top: 0,
      left: 0,
      zIndex: 0,
    },
  }}
>
      {/* <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: 0.3,
          },
        }}
      > */}
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: 500 }}>
              <AuthForgotPassword
                title={t('forgot.title')}
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    {t('forgot.instructions')}
                  </Typography>
                }
                subtitle={
                  <Typography mt={2} textAlign="center">
                    {t('forgot.back')}{' '}
                    <Link to="/auth/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                      {t('forgot.loginLink')}
                    </Link>
                  </Typography>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ForgotPassword;
