import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [testIsGoingOn, setTestIsGoingOn] = useState(false);

  // Countdown before test starts
  useEffect(() => {
    let countdownTimeout;
    if (countdown > 0 && testIsGoingOn && !isCountdownComplete) {
      countdownTimeout = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && testIsGoingOn && !isCountdownComplete) {
      setIsCountdownComplete(true);
      setIsTimerRunning(true);
      setTimeLeft(20 * 60); // 20 minutes
    }
    return () => clearTimeout(countdownTimeout);
  }, [countdown, testIsGoingOn, isCountdownComplete]);

  // Main timer
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            setTestIsGoingOn(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning, timeLeft]);

  const startNewTest = () => {
    setCountdown(3);
    setIsCountdownComplete(false);
    setTestIsGoingOn(true);
    setTimeLeft(0);
    setIsTimerRunning(false);
  };

  const stopTest = () => {
    // fully reset everything
    setIsTimerRunning(false);
    setTestIsGoingOn(false);
    setTimeLeft(0);
    setCountdown(3);
    setIsCountdownComplete(false);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    if (testIsGoingOn && isCountdownComplete && timeLeft > 0) {
      setIsTimerRunning(true);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        countdown,
        timeLeft,
        isTimerRunning,
        isCountdownComplete,
        testIsGoingOn,
        startNewTest,
        stopTest,
        pauseTimer,
        resumeTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};



// import React, { createContext, useContext, useState, useEffect } from 'react';

// const TimerContext = createContext();

// export const useTimer = () => useContext(TimerContext);

// export const TimerProvider = ({ children }) => {
//   const [countdown, setCountdown] = useState(3);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [isCountdownComplete, setIsCountdownComplete] = useState(false);
//   const [testIsGoingOn, setTestIsGoingOn] = useState(false);

//   // Countdown before test starts
//   useEffect(() => {
//     let countdownTimeout;
//     if (countdown > 0 && testIsGoingOn && !isCountdownComplete) {
//       countdownTimeout = setTimeout(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     } else if (countdown === 0 && testIsGoingOn && !isCountdownComplete) {
//       setIsCountdownComplete(true);
//       setIsTimerRunning(true);
//       setTimeLeft(20 * 60); // 20 minutes
//     }
//     return () => clearTimeout(countdownTimeout);
//   }, [countdown, testIsGoingOn, isCountdownComplete]);

//   // Main timer
//   useEffect(() => {
//     if (isTimerRunning && timeLeft > 0) {
//       const interval = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             setIsTimerRunning(false);
//             setTestIsGoingOn(false);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isTimerRunning, timeLeft]);

//   const startNewTest = () => {
//     setCountdown(3);
//     setIsCountdownComplete(false);
//     setTestIsGoingOn(true);
//     setTimeLeft(0);
//     setIsTimerRunning(false);
//   };

//   const stopTest = () => {
//     setIsTimerRunning(false);
//     setTestIsGoingOn(false);
//     setTimeLeft(0);
//     setCountdown(3);
//     setIsCountdownComplete(false);
//   };

//   return (
//     <TimerContext.Provider
//       value={{
//         countdown,
//         timeLeft,
//         isTimerRunning,
//         isCountdownComplete,
//         testIsGoingOn,
//         startNewTest,
//         stopTest,
//       }}
//     >
//       {children}
//     </TimerContext.Provider>
//   );
// };
