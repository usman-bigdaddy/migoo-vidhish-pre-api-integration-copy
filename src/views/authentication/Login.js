import React from 'react';
import { Link } from 'react-router-dom';               // Correct Link import
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import Logo          from 'src/layouts/full/shared/logo/Logo';
import AuthLogin     from './auth/AuthLogin';

import { useTranslation } from 'react-i18next';
import blurbg from "../../assets/images/backgrounds/blurbg.png"

const Login2 = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
    title={t('login.pageTitle')} description="Login page">
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
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}

              {/* AuthLogin receives a translated subtitle */}
              <AuthLogin
              title= {t('login.welcomeBack')}
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight={500}>
                      {t('login.newTo')}
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight={500}
                      sx={{ textDecoration: 'none', color: 'primary.main' }}
                    >
                      {t('login.createAccount')}
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
