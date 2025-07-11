import React, { useState, useEffect} from 'react';
// import TestTitle from '../../components/testtitle/TestTitle';
import HeadingTitle from '../../components/headingtitle/HeadingTitle';
import VocabularyWordGameTable from '../../components/tables/VocabularyWordGameTable';
import WordGame from '../../components/wordgame/WordGame';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Grid2 } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconDeviceGamepad2 } from '@tabler/icons-react';
// const [gameStarted, setGameStarted] = useState(false);
//   const handleStartGame = () => {
//     console.log("gameStarted : ", gameStarted)
//     setGameStarted(prev => !prev);
//   };



const Wordbank = () => {
 const {t} = useTranslation()
  const [gameStarted, setGameStarted] = useState(false);
  const handleStartGame = () => {
    console.log("gameStarted : ", gameStarted)
    setGameStarted(prev => !prev);
  };
  const TestTitle = ({ title, subtitle}) => {
    const [openModal, setOpenModal] = useState(false); // Controls modal visibility
    const [countdown, setCountdown] = useState(3); // Countdown before timer starts
    const [timeLeft, setTimeLeft] = useState(0); // Time left for the 20-minute countdown
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Controls if timer is running
    const [isCountdownComplete, setIsCountdownComplete] = useState(false); // Tracks if countdown is finished
    const [testIsGoingOn, setTestIsGoingOn] = useState(false); // Tracks if the test is ongoing
    const [openStopModal, setOpenStopModal] = useState(false); // Controls stop test confirmation modal visibility
  
    // Countdown logic (3, 2, 1)
    useEffect(() => {
      if (countdown > 0 && openModal) {
        const countdownTimeout = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
  
        return () => clearTimeout(countdownTimeout); // Cleanup on countdown change
      }
  
      // When countdown finishes, start the timer
      if (countdown === 0 && !isCountdownComplete) {
        setIsCountdownComplete(true); // Mark countdown as complete
        setIsTimerRunning(true);
        setTimeLeft(20 * 60); // 20 minutes in seconds
        setTestIsGoingOn(true); // Test starts, so set this to true
      }
    }, [openModal, countdown, isCountdownComplete]);
  
    // Timer logic for 20 minutes
    useEffect(() => {
      if (isTimerRunning && timeLeft > 0) {
        const timerInterval = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timerInterval); // Clear interval when time is up
              setIsTimerRunning(false);
              setTestIsGoingOn(false); // Test ends, so set this to false
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
  
        return () => clearInterval(timerInterval); // Cleanup on timer update
      }
    }, [isTimerRunning, timeLeft]);
  
    const handleNewTestButtonClick = () => {
      if (testIsGoingOn) {
        // Open the confirmation modal when "Stop Test" is clicked
        setOpenStopModal(true);
      } else {
        // Start the countdown for a new test
        setOpenModal(true); // Open the modal when the "New Test" button is clicked
        setCountdown(3); // Start countdown from 3
        setIsCountdownComplete(false); // Reset countdown state
        setTimeLeft(0); // Reset the time left
        setTestIsGoingOn(false); // Ensure test is not ongoing initially
      }
    };
  
    const handleStartTestButtonClick = () => {
      setOpenModal(false); // Close the modal when countdown is complete
      setIsTimerRunning(true); // Start the timer immediately
      setCountdown(0); // Reset countdown to start the timer
      setTimeLeft(20 * 60); // Start 20-minute countdown (in seconds)
      setTestIsGoingOn(true); // Mark test as ongoing
    };
  
    const handleCloseModal = () => {
      setOpenModal(false); // Close modal without starting the test
    };
  
    const handleStopTest = () => {
      // Stop the test when the user confirms
      setIsTimerRunning(false);
      setTestIsGoingOn(false);
      setTimeLeft(0); // Optional: Reset time left
      setOpenStopModal(false); // Close confirmation modal
    };
  
    const handleCancelStopTest = () => {
      // Close the confirmation modal without stopping the test
      setOpenStopModal(false);
    };
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  
  
  
    return (
      <>
        <Grid2 container spacing={2} mt={5} justifyContent={"space-between"}>
          <div>
            <Typography variant='h4'>{title}  <IconDeviceGamepad2 size={32} style={{position:'relative', top:"5px"}} /></Typography>
            <Typography variant='h6' mt={2}>{subtitle}</Typography>
          </div>
          <div>
              <Button
                         variant="contained"
                         onClick={handleStartGame}
                       >
                         {gameStarted ? t("wordBank.goBack") : t("wordBank.wordGame")}
                       </Button>
          </div>
        </Grid2>
  
        <hr style={{ border: '1px solid #DEDEDF' }} />
  
        {/* Timer Modal */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          {/* <DialogTitle>Starting your test</DialogTitle> */}
          <DialogContent>
    <Typography variant="h5" pl={3} pr={3}>Your test will start in</Typography>
    
    <Box sx={{ color: "#157DF8", backgroundColor: "#157DF840", textAlign: 'center', borderRadius: '999px', m: 5 }}>
      <Typography style={{ padding: '20px' }} variant="h2">{countdown}</Typography>
    </Box>
  
    <Box sx={{ textAlign: 'center' }}>
      <Button color="primary" variant="contained">Go Back</Button>
    </Box>
  </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleCloseModal} color="primary">Okay</Button> */}
            {/* <Button onClick={handleStartTestButtonClick} color="primary">Start Test</Button> */}
          </DialogActions>
        </Dialog>
  
        {/* Stop Test Confirmation Modal */}
        <Dialog open={openStopModal} onClose={handleCancelStopTest}>
          <DialogTitle>Are you sure you want to stop the test?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCancelStopTest} color="primary">Resume Test</Button>
            <Button onClick={handleStopTest} color="error">Stop Test</Button>
          </DialogActions>
        </Dialog>
  
        {/* Timer Display */}
        {testIsGoingOn && (
          <Typography variant="h6" color="primary" mt={2}>
            Time Left: {formatTime(timeLeft)}
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      <TestTitle
        title={t("wordBank.wordGame")}
        subtitle={t("wordBank.wordGameSubtitle")}
      />


      <Grid2 container spacing={2} mt={5} justifyContent="space-between">
        <Grid2 item xs={12} sm={6}>
          <Typography variant="h4">{t("wordBank.wordBank")}</Typography>
          <Typography variant="h6" mt={2}>
           {t("wordBank.wordBankSubtitle")}
          </Typography>
        </Grid2>
      </Grid2>

      {gameStarted ? <WordGame /> : (
        <VocabularyWordGameTable />
      )}
    </>
  );
};

export default Wordbank;
