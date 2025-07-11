// components/TestTimerControls.js
import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TestTimerControls = ({
  timeLeft,
  isTimerRunning,
  testIsGoingOn,
  onStopTestClick,
}) => {
  const { t } = useTranslation();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <Button variant="outlined" sx={{ m: 2 }}>
        {isTimerRunning ? formatTime(timeLeft) : t('testtitle.timer')}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={onStopTestClick}
        disabled={!testIsGoingOn}
      >
        {t('testtitle.stopTest')}
      </Button>
    </div>
  );
};

export default TestTimerControls;
