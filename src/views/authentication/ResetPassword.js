import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import AuthResetPassword from './auth/AuthResetPassword';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import blurbg from "../../assets/images/backgrounds/blurbg.png";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer title="Reset Password" description="this is reset password page">
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
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
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
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', position: 'relative' }}
            >
              {/* Back Button */}
              <IconButton
                onClick={() => navigate('/settings')}
                sx={{ position: 'absolute', top: 16, left: 16 }}
                aria-label="back"
              >
                <ArrowBackIcon />
              </IconButton>

              {/* Reset Password Form */}
              <AuthResetPassword
                title={t("resetPassword.title")}
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      {t("resetPassword.dontHaveAnAccount")}
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      {t('resetPassword.signup')}
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

export default ResetPassword;
