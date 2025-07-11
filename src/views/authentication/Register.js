import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';
import blurbg from "../../assets/images/backgrounds/blurbg.png"


const Register2 = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('register.pageTitle')} description={t('register.pageDescription')}>
   <Box
  sx={{
    position: 'relative',
    minHeight: '100vh',        // allow to grow beyond viewport height
    backgroundImage: `url(${blurbg})`,
    backgroundSize: 'auto',    // don't stretch image, keep natural size for repeating
    backgroundPosition: 'center top', // repeat from top center
    backgroundRepeat: 'repeat-y',      // repeat vertically
    // backgroundAttachment: 'fixed',   // optional parallax effect
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
> */}
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
            opacity: '0.3',
          },
        }}
      > */}
        <Grid container spacing={0} justifyContent="center">
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
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', mt: 5, mb: 5 }}>
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}
              <AuthRegister
                title={t('register.title')}
                subtitle={
                  <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight={400}>
                      {t('register.alreadyHaveAccount')}
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/login"
                      fontWeight={500}
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      {t('register.signIn')}
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

export default Register2;
