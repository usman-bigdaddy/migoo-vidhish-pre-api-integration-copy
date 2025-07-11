import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ThanksForAttendingPopup = ({ fluencyLevel = 'Intermediate' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  /* handlers */
  const close = () => setOpen(false);

  const handleGoToHome = () => {
    close();
    navigate('/dashboard');
  };

  const handleRetakeTest = () => {
    close();
    navigate('/english-test');          // adjust route as needed
  };

  /* UI */
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="thanks-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0px 4px 24px rgba(0,0,0,0.16)',
          width: 400,
          maxWidth: '90vw',
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {t('thanks.title')}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.5}>
          {t('thanks.fluencyText')}
        </Typography>

        <Typography variant="h4" fontWeight={700} color="primary.main" mb={3}>
          {/* {fluencyLevel} */}
          {t('thanks.intermediate')}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={handleGoToHome}
          variant="contained"
          sx={{
            borderRadius: 1,
            px: 3,
            boxShadow: '0px 2px 4px rgba(0,0,0,0.12)',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          {t('thanks.goHome')}
        </Button>

        <Button
          onClick={handleRetakeTest}
          variant="outlined"
          sx={{
            ml: 2,
            borderRadius: 1,
            px: 3,
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(25,118,210,0.08)' },
          }}
        >
          {t('thanks.retake')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThanksForAttendingPopup;
