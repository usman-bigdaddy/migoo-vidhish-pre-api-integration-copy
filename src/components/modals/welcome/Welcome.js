import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();              // i18n hook
  const [open, setOpen] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');

  /* ---------- handlers ---------- */
  const closeAll = () => {
    localStorage.removeItem('firstTime');
    setOpen(false);
  };

  const handleTakeTest = () => closeAll();
  const handleGoToHome = () => closeAll();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    console.log(`Selected level: ${level}`);
  };

  /* ---------- UI ---------- */
  return (
    <Dialog
      open={open}
      onClose={closeAll}
      aria-labelledby="welcome-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0px 4px 24px rgba(0,0,0,0.16)',
          width: 400,
          maxWidth: '90vw',
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', p: 3 }}>
        {/* Title */}
        <Typography variant="h5" fontWeight={600} mb={2}>
          {t('welcome.title')}
        </Typography>

        {/* Info paragraphs */}
        <Typography variant="body1" color="text.secondary" mb={2} lineHeight={1.5}>
          {t('welcome.testInfo1')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.5}>
          {t('welcome.testInfo2')}
        </Typography>

        {/* Take test */}
        <Button
          variant="contained"
          onClick={handleTakeTest}
          component={NavLink}
          to="/english-test"
          sx={{
            color: '#fff',
            mb: 3,
            px: 3,
            borderRadius: 1,
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          {t('welcome.takeTest')}
        </Button>

        {/* Divider */}
        <Box sx={{ width: '80%', m: '0 auto 24px', borderTop: '1px solid #d3d3d3' }} />

        {/* Level chips */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
            p: 1,
            border: '1px solid #e0e0de',
            borderRadius: 2,
          }}
        >
          {['beginner', 'intermediate', 'advanced'].map((lvl) => (
            <Button
              key={lvl}
              variant={selectedLevel === lvl ? 'contained' : 'outlined'}
              onClick={() => handleLevelSelect(lvl)}
              sx={{
                border: 'none',
                px: 2,
                borderRadius: 1,
                color: selectedLevel === lvl ? '#fff' : 'primary.main',
                backgroundColor: selectedLevel === lvl ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor:
                    selectedLevel === lvl ? '#1565c0' : 'rgba(30,136,229,0.08)',
                },
              }}
            >
              {t(`welcome.${lvl}`)}
            </Button>
          ))}
        </Box>

        {/* Go home */}
        <Button
          variant="outlined"
          onClick={handleGoToHome}
          sx={{
            px: 3,
            borderRadius: 1,
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(30,136,229,0.08)' },
          }}
        >
          {t('welcome.goHome')}
        </Button>
      </DialogContent>
      {/* No extra actions row, keep DialogActions placeholder for future if needed */}
      <DialogActions />
    </Dialog>
  );
};

export default Welcome;
