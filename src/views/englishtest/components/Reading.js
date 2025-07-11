import React, { useEffect, useState } from "react";
import TestTitle from "../../../components/testtitle/TestTitle";
import ThanksForAttendingPopup from "../../../components/modals/thanksforattending/ThanksForAttending";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MCQ from "../../../components/mcq/MCQ";
import Chart from "react-apexcharts";
import TestResults from "../../../components/modals/testresults/TestResults";
import { useDispatch, useSelector } from "react-redux";
import {
  getNextText,
  submitText,
  resetSubmission,
} from "../../../redux/features/readingSlice";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../../context/TimerContext";

const Reading = ({ showSubmitButton }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { t } = useTranslation();
  const { stopTest, testIsGoingOn, isTimerRunning, isCountdownComplete } =
    useTimer(); // Added timer state properties
  const dispatch = useDispatch();
  const {
    currentText,
    loadingNextText,
    errorNextText,
    submission,
    loadingSubmitText,
    errorSubmitText,
  } = useSelector((state) => state.text);

  // Initialize answers state based on the number of questions
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState(null); // Track submission to avoid re-triggering modal

  // Check if questions should be enabled based on timer state
  const areQuestionsEnabled =
    testIsGoingOn && isCountdownComplete && isTimerRunning;

  // Reset submission state and fetch text on mount
  useEffect(() => {
    dispatch(resetSubmission()); // Clear any previous submission
    dispatch(getNextText());
  }, [dispatch]);

  // Update answers array when questions change
  useEffect(() => {
    if (currentText?.questions) {
      setAnswers(Array(currentText.questions.length).fill(null));
    }
  }, [currentText]);

  // Open results modal on successful submission, only for new submissions
  useEffect(() => {
    if (submission.success && submission.message !== lastSubmissionId) {
      setShowResult(true);
      setOpenResultModal(true);
      setLastSubmissionId(submission.message); // Mark this submission as handled
    }
  }, [submission, lastSubmissionId]);

  // Handle option selection (store the option letter, e.g., "D")
  const handleOptionChange = (questionIndex, selectedOption) => {
    // Only allow changing answers if the test is active
    if (!areQuestionsEnabled) return;

    const optionLetter = selectedOption.split(".")[0];
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionLetter;
    setAnswers(newAnswers);
  };

  // Submit answers to the API
  const handleSubmit = () => {
    if (!currentText || !currentText.text_id || !currentText.questions) {
      return;
    }

    const answersPayload = currentText.questions.reduce(
      (acc, question, index) => {
        if (answers[index]) {
          acc[question.question_id] = answers[index];
        }
        return acc;
      },
      {}
    );

    dispatch(
      submitText({
        text_id: currentText.text_id,
        answers: answersPayload,
        time_spent: 120,
      })
    );
    stopTest(); // Stop the timer when submitting
  };

  // Close results modal without resetting state
  const handleCloseModal = () => {
    setOpenResultModal(false);
    setShowResult(true); // Keep showResult true to allow reviewing answers
  };

  // Start a new test (reset state and fetch new text)
  const handleStartNewTest = () => {
    dispatch(resetSubmission());
    dispatch(getNextText());
    setAnswers([]);
    setShowResult(false);
    setOpenResultModal(false);
    setLastSubmissionId(null);
  };

  // Calculate correct and incorrect counts
  const correctCount = currentText?.questions
    ? currentText.questions.reduce((acc, question, idx) => {
        return acc + (answers[idx] === question.answer ? 1 : 0);
      }, 0)
    : 0;

  const incorrectCount = currentText?.questions
    ? answers.reduce((acc, answer, idx) => {
        return (
          acc + (answer && answer !== currentText.questions[idx].answer ? 1 : 0)
        );
      }, 0)
    : 0;

  const donutChartOptions = {
    chart: { type: "donut" },
    labels: ["Correct", "Incorrect"],
    colors: ["#4caf50", "#f44336"],
    legend: { position: "bottom" },
  };

  const donutChartSeries = [correctCount, incorrectCount];

  return (
    <>
      <Grid container spacing={5} mt={1}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box style={{ border: "1px solid #2a8efe", borderRadius: "10px" }}>
            <Typography p={1}>{currentText?.passage}</Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography mb={3} variant="body1">
            This part consists of two passages, each followed by several related
            questions. For each question,
            <Typography variant="h6" mt={1}>
              choose the most appropriate answer based on the passage.
            </Typography>
          </Typography>

          <Typography variant="h2" style={{ marginBottom: "30px" }}>
            Questions 1 to {currentText?.questions?.length}
          </Typography>

          {/* Conditionally render questions or a start message */}
          {!areQuestionsEnabled ? (
            currentText?.questions?.map((item, index) => {
              const transformedOptions = item.options.map((option) => ({
                text: option,
                isCorrect: option.startsWith(item.answer + "."),
                explanation: option.startsWith(item.answer + ".")
                  ? "This is the correct answer based on the passage."
                  : undefined,
              }));

              return (
                <MCQ
                  key={item.question_id}
                  question={item.question}
                  options={transformedOptions}
                  index={index}
                  selectedOption={
                    answers[index]
                      ? item.options.find((opt) =>
                          opt.startsWith(answers[index] + ".")
                        )
                      : null
                  }
                  handleOptionChange={handleOptionChange}
                  showResult={showResult}
                  disabled={!areQuestionsEnabled}
                />
              );
            })
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

          {/* Submit & New Test Buttons */}
          {showSubmitButton && (
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {areQuestionsEnabled && !showResult && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                  onClick={handleSubmit}
                  disabled={
                    loadingSubmitText ||
                    answers.every((ans) => !ans) ||
                    showResult
                  }
                >
                  {loadingSubmitText ? "Submitting..." : "Submit Test"}
                </Button>
              )}
              {showResult && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ m: 1 }}
                  onClick={handleStartNewTest}
                >
                  Start New Test
                </Button>
              )}
            </Box>
          )}
          {errorSubmitText && (
            <Typography color="error">Error: {errorSubmitText}</Typography>
          )}
        </Grid>
      </Grid>
      <TestResults
        testname="Reading Test"
        openResultModal={openResultModal}
        handleCloseModal={handleCloseModal}
        donutChartOptions={donutChartOptions}
        donutChartSeries={donutChartSeries}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
      />
    </>
  );
};

export default Reading;
