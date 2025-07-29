import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MCQ from "../../components/mcq/MCQ";
import TestTitle from "../../components/testtitle/TestTitle";
import Chart from "react-apexcharts";
import TestResults from "../../components/modals/testresults/TestResults";
import ThanksForAttendingPopup from "../../components/modals/thanksforattending/ThanksForAttending";
import { useDispatch, useSelector } from "react-redux";
import {
  startQuizCategory,
  submitQuiz,
  completeQuiz,
} from "../../redux/features/sentenceSlice";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../context/TimerContext";

const SentenceCompletion = ({ showSubmitButton, standalone = true }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const { stopTest, testIsGoingOn, isTimerRunning, isCountdownComplete } =
    useTimer();

  const dispatch = useDispatch();
  const { quizData, submissionResult, loading, error } = useSelector(
    (state) => state.sentence
  );

  // Memoize the display state to prevent unnecessary re-renders
  const shouldShowQuestions = useMemo(() => {
    // Always show questions if not standalone
    if (!standalone) return true;
    // For standalone, follow timer rules
    return testIsGoingOn && isTimerRunning && isCountdownComplete;
  }, [standalone, testIsGoingOn, isTimerRunning, isCountdownComplete]);

  const shouldShowStartMessage = useMemo(() => {
    // Never show start message if not standalone
    if (!standalone) return false;
    return !testIsGoingOn;
  }, [standalone, testIsGoingOn]);

  const shouldShowPauseMessage = useMemo(() => {
    // Never show pause message if not standalone
    if (!standalone) return false;
    return testIsGoingOn && !isTimerRunning;
  }, [standalone, testIsGoingOn, isTimerRunning]);

  const shouldShowCountdownMessage = useMemo(() => {
    // Never show countdown message if not standalone
    if (!standalone) return false;
    return testIsGoingOn && !isCountdownComplete;
  }, [standalone, testIsGoingOn, isCountdownComplete]);

  // Initialize answers array when quizData is loaded
  useEffect(() => {
    dispatch(startQuizCategory({ category: "Sentence structure" }));
  }, [dispatch]);

  useEffect(() => {
    if (quizData?.questions) {
      setAnswers(Array(quizData.questions.length).fill(null));
    }
  }, [quizData]);

  // Transform quizData.questions to MCQ format
  const transformedQuestions =
    quizData?.questions?.map((q) => ({
      question: q.question,
      options: q.options.map((opt) => ({
        text: opt,
        isCorrect: opt === q.answer,
        explanation:
          q.answer === opt
            ? "This is the correct answer based on the quiz data."
            : undefined,
      })),
    })) || [];

  const handleOptionChange = (questionIndex, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const calculateResults = async () => {
    if (!quizData?.session_id) return;

    // Only stop test if standalone
    if (standalone) {
      stopTest();
    }

    // Submit each answer
    for (let i = 0; i < answers.length; i++) {
      if (answers[i]) {
        await dispatch(
          submitQuiz({ session_id: quizData.session_id, answer: answers[i] })
        );
      }
    }

    // Complete the quiz
    await dispatch(completeQuiz({ session_id: quizData.session_id }));

    setShowResult(true);
    setOpenResultModal(true);
  };

  const handleCloseModal = () => {
    setOpenResultModal(false);
  };

  // Calculate correct/incorrect counts locally for immediate feedback
  const correctCount = transformedQuestions.reduce((acc, q, idx) => {
    const correctOption = q.options.find((o) => o.isCorrect);
    return acc + (correctOption?.text === answers[idx] ? 1 : 0);
  }, 0);

  const incorrectCount = answers.filter(
    (ans, idx) =>
      ans &&
      transformedQuestions[idx]?.options.find((o) => o.isCorrect)?.text !== ans
  ).length;

  const donutChartOptions = {
    chart: { type: "donut" },
    labels: ["Correct", "Incorrect"],
    colors: ["#4caf50", "#f44336"],
    legend: { position: "bottom" },
  };

  const donutChartSeries = [correctCount, incorrectCount];

  const { t } = useTranslation();

  // Loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
        <Typography ml={2}>Loading quiz...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TestTitle
        standalone={standalone}
        title={t("sentenceCompletion.heading")}
        subtitle={t("sentenceCompletion.subHeading")}
      />

      <Box dir="ltr">
        {shouldShowQuestions && (
          <>
            {standalone && (
              <Typography mt={4} mb={3} variant="body1">
                This part consists of sentences with a word or words missing in
                each. For each question, choose the answer
                <Typography variant="h6" mt={1}>
                  which best completes the sentence.
                </Typography>
              </Typography>
            )}

            {standalone && quizData && (
              <Typography variant="h2" style={{ marginBottom: "30px" }}>
                Questions 1 to {quizData.total_questions}
              </Typography>
            )}

            {transformedQuestions.map((item, index) => (
              <MCQ
                key={item.id || index}
                question={item.question}
                options={item.options}
                index={index}
                selectedOption={answers[index]}
                handleOptionChange={handleOptionChange}
                showResult={showResult}
              />
            ))}

            {showSubmitButton && quizData && (
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={calculateResults}
                disabled={loading || answers.every((ans) => !ans)}
              >
                Submit Test
              </Button>
            )}
          </>
        )}

        {shouldShowStartMessage && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
          >
            <Typography variant="h5" color="text.secondary">
              Click "New Test" to start the test
            </Typography>
          </Box>
        )}

        {shouldShowCountdownMessage && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
          >
            <Typography variant="h5" color="text.secondary">
              Get ready! Test will begin shortly...
            </Typography>
          </Box>
        )}

        {shouldShowPauseMessage && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="300px"
          >
            <Typography variant="h5" color="text.secondary">
              Test is paused. Click "Resume Test" to continue
            </Typography>
          </Box>
        )}
      </Box>

      <TestResults
        testname="Sentence Test"
        openResultModal={openResultModal}
        handleCloseModal={handleCloseModal}
        donutChartOptions={donutChartOptions}
        donutChartSeries={donutChartSeries}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
      />
      <br />
      <Button onClick={() => setOpenPopup(true)}>Thanks for attending</Button>
      {openPopup && <ThanksForAttendingPopup />}
    </>
  );
};

export default SentenceCompletion;
