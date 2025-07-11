import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material';
import { Grid2 } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TestHeader from './TestHeader';
import TestTimerControls from './TestTimerControls';

const TestTitle = ({ title, subtitle, onCountdownComplete, onStopTest }) => {
  const [openModal, setOpenModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [testIsGoingOn, setTestIsGoingOn] = useState(false);
  const [openStopModal, setOpenStopModal] = useState(false);
  const { t } = useTranslation();

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    setOpenModal(true);
    setCountdown(3);
    setIsCountdownComplete(false);
    setTimeLeft(0);
    setTestIsGoingOn(false);
  }, []);

  useEffect(() => {
    let countdownTimeout;
    if (openModal && countdown > 0) {
      countdownTimeout = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    if (openModal && countdown === 0 && !isCountdownComplete) {
      setIsCountdownComplete(true);
      setIsTimerRunning(true);
      setTimeLeft(20 * 60); // 20 minutes
      setTestIsGoingOn(true);
      onCountdownComplete?.(); // Notify parent (EnglishTest)
    }
    return () => clearTimeout(countdownTimeout);
  }, [openModal, countdown, isCountdownComplete]);

  useEffect(() => {
    if (isCountdownComplete) {
      const closeModalTimeout = setTimeout(() => handleCloseModal(), 1000);
      return () => clearTimeout(closeModalTimeout);
    }
  }, [isCountdownComplete]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setIsTimerRunning(false);
            setTestIsGoingOn(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isTimerRunning, timeLeft]);

  const handleStopTest = () => {
    setIsTimerRunning(false);
    setTestIsGoingOn(false);
    setTimeLeft(0);
    setOpenStopModal(false);
    onStopTest?.(); // Notify parent (EnglishTest)
  };

  const handleCancelStopTest = () => setOpenStopModal(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <Grid2 container spacing={2} mt={5} justifyContent="space-between">
        <TestHeader title={title} subtitle={subtitle} />
        <TestTimerControls
          timeLeft={timeLeft}
          isTimerRunning={isTimerRunning}
          testIsGoingOn={testIsGoingOn}
          onStopTestClick={() => setOpenStopModal(true)}
        />
      </Grid2>

      <hr style={{ border: '1px solid #DEDEDF' }} />

      {/* Countdown Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography variant="h5" pl={3} pr={3}>
            {t('testtitle.yourTestWillStartIn')}
          </Typography>
          <Box
            sx={{
              color: '#157DF8',
              backgroundColor: '#157DF840',
              textAlign: 'center',
              borderRadius: '999px',
              m: 5
            }}
          >
            <Typography style={{ padding: '20px' }} variant="h2">
              {countdown}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Stop Test Confirmation Modal */}
      <Dialog open={openStopModal} onClose={handleCancelStopTest}>
        <DialogTitle>{t('testtitle.areYouSure')}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelStopTest} color="primary">
            {t('testtitle.resumeTest')}
          </Button>
          <Button onClick={handleStopTest} color="error">
            {t('testtitle.stopTest')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Time Left Display */}
      {/* {testIsGoingOn && (
        <Typography variant="h6" color="primary" mt={2}>
          {t('testtitle.timeLeft')}: {formatTime(timeLeft)}
        </Typography>
      )} */}
    </>
  );
};

export default TestTitle;
