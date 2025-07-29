import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../context/TimerContext";

const TestTitle = ({ title, subtitle, standalone = true }) => {
  const { t } = useTranslation();
  const {
    countdown,
    timeLeft,
    isTimerRunning,
    isCountdownComplete,
    testIsGoingOn,
    startNewTest,
    stopTest,
    pauseTimer,
    resumeTimer,
  } = useTimer();

  const [openModal, setOpenModal] = useState(false);
  const [openStopModal, setOpenStopModal] = useState(false);

  useEffect(() => {
    if (testIsGoingOn && countdown === 0 && isCountdownComplete) {
      const closeModal = setTimeout(() => setOpenModal(false), 1000);
      return () => clearTimeout(closeModal);
    }
  }, [countdown, isCountdownComplete, testIsGoingOn]);

  const handleNewTestButtonClick = () => {
    if (testIsGoingOn) {
      pauseTimer(); // Pause timer when opening stop modal
      setOpenStopModal(true);
    } else {
      setOpenModal(true);
      startNewTest();
    }
  };

  const handleStopTest = () => {
    stopTest();
    setOpenStopModal(false);
  };

  const handleCancelStopTest = () => {
    setOpenStopModal(false);
    resumeTimer(); // Resume timer if stop modal is canceled
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Show "Timer" if test not started or stopped, otherwise show formatted time
  const getTimerDisplay = () => {
    if (!testIsGoingOn) {
      return t("testtitle.timer"); // Show "Timer" text (localized)
    }
    return formatTime(timeLeft);
  };

  return (
    <>
      <Grid2 container spacing={2} mt={5} justifyContent="space-between">
        <div>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h6" mt={2}>
            {subtitle}
          </Typography>
        </div>
        {standalone && (
          <div>
            <Button variant="outlined" sx={{ m: 2 }}>
              {getTimerDisplay()}
            </Button>
            <Button
              variant="contained"
              color={testIsGoingOn ? "error" : "primary"}
              onClick={handleNewTestButtonClick}
            >
              {testIsGoingOn ? t("testtitle.stopTest") : t("testtitle.newTest")}
            </Button>
          </div>
        )}
      </Grid2>

      <hr style={{ border: "1px solid #DEDEDF" }} />

      <Dialog open={openModal}>
        <DialogContent>
          <Typography variant="h5" pl={3} pr={3}>
            {t("testtitle.yourTestWillStartIn")}
          </Typography>
          <Box
            sx={{
              color: "#157DF8",
              backgroundColor: "#157DF840",
              textAlign: "center",
              borderRadius: "999px",
              m: 5,
            }}
          >
            <Typography style={{ padding: "20px" }} variant="h2">
              {countdown}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openStopModal} onClose={handleCancelStopTest}>
        <DialogTitle>{t("testtitle.areYouSure")}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelStopTest} color="primary">
            {t("testtitle.resumeTest")}
          </Button>
          <Button onClick={handleStopTest} color="error">
            {t("testtitle.stopTest")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TestTitle;
