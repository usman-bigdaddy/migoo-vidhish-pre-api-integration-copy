import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Card,
  Stack,
  Typography
} from '@mui/material';
import {Grid2} from '@mui/material';
import { Logo } from 'react-mui-sidebar';
import { NavLink, Link } from 'react-router-dom';

import AuthLogin from '../../../views/authentication/auth/AuthLogin';
import logoicn   from '../../../assets/images/logos/logo-migoo.svg';

import { useTranslation } from 'react-i18next';

const SigninModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button that opens the modal */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        {t('auth.loginButton')}
      </Button>

      {/* Modal dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth scroll="body">
        <DialogTitle textAlign="center">{t('auth.welcomeBack')}</DialogTitle>

        <DialogContent>
          <Grid2 container justifyContent="center">
            <Grid2
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: 500 }}>
                {/* Logo */}
                <Box display="flex" justifyContent="center" mb={2}>
                  <Logo img={logoicn} component={NavLink} to="/" />
                </Box>

                {/* Auth Login form */}
                <AuthLogin
                  subtitle={
                    <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                      <Typography color="textSecondary" variant="h6" fontWeight={500}>
                        {t('auth.noAccount')}
                      </Typography>
                      <Typography
                        component={Link}
                        to="/auth/register"
                        fontWeight={500}
                        sx={{ textDecoration: 'none', color: 'primary.main' }}
                      >
                        {t('auth.signup')}
                      </Typography>
                    </Stack>
                  }
                />
              </Card>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SigninModal;
