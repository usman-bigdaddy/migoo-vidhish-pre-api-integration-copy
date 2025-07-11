import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MCQ from "../../../components/mcq/MCQ";
import TestTitle from "../../../components/testtitle/TestTitle";
import Chart from "react-apexcharts";
import TestResults from "../../../components/modals/testresults/TestResults";
import ThanksForAttendingPopup from "../../../components/modals/thanksforattending/ThanksForAttending";
import { useDispatch, useSelector } from "react-redux";
import {
  startQuizCategory,
  submitQuiz,
  completeQuiz,
} from "../../../redux/features/sentenceSlice";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../../context/TimerContext";

const SentenceCompletion = ({ showSubmitButton }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const { stopTest, testIsGoingOn, isTimerRunning, isCountdownComplete } =
    useTimer();
  const areQuestionsEnabled =
    testIsGoingOn && isCountdownComplete && isTimerRunning;
  const dispatch = useDispatch();
  const { quizData, submissionResult, loading, error } = useSelector(
    (state) => state.sentence
  );

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
    stopTest();
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

  return (
    <>
      <Typography mt={4} mb={3} variant="body1">
        This part consists of sentences with a word or words missing in each.
        For each question, choose the answer
        <Typography variant="h6" mt={1}>
          which best completes the sentence.
        </Typography>
      </Typography>

      {loading && <Typography>Loading quiz...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {quizData && (
        <Typography variant="h2" style={{ marginBottom: "30px" }}>
          Questions 1 to {quizData.total_questions}
        </Typography>
      )}

      {!areQuestionsEnabled ? (
        <>
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
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            border: "1px dashed #ccc",
            borderRadius: "8px",
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            {showResult
              ? "Test completed. Click 'New Test' to try again."
              : "Click 'New Test' to begin the reading test."}
          </Typography>
        </Box>
      )}

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
