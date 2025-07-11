import React from 'react';
import { Link, useLocation } from 'react-router';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthConfirmEmail from './auth/AuthConfirmEmail';
import blurbg from "../../assets/images/backgrounds/blurbg.png"


const ConfirmEmail = () => {
  const { t } = useTranslation();
    const location = useLocation();
  const email = location.state?.email || 'exampleemail@gmail.com';

  return (
    <PageContainer
      title={t('confirmEmail.pageTitle')}
      description={t('confirmEmail.pageDescription')}
    >
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
            opacity: 0.3
          }
        }}
      > */}
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: 500 }}>
              {/* Uncomment if you want a logo on this screen */}
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}

              <AuthConfirmEmail
                title={t('confirmEmail.title')}
                subtext={
                  <>
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      color="textSecondary"
                      mb={1}
                    >
                      {t('confirmEmail.instructions')}
                    </Typography>

                    {/* Example email; replace with dynamic value */}
                    <Typography variant="subtitle1" textAlign="center" color="primary" mb={1}>
                      {email}
                    </Typography>
                  </>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight={500}
                      sx={{ textDecoration: 'none', color: 'primary.main' }}
                    >
                      {t('confirmEmail.resend')}
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

export default ConfirmEmail;
