import React, { useState, useEffect, useMemo } from "react";
import TestTitle from "../../components/testtitle/TestTitle";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
} from "@mui/material";
import MCQ from "../../components/mcq/MCQ";
import Chart from "react-apexcharts";
import TestResults from "../../components/modals/testresults/TestResults";
import ThanksForAttendingPopup from "../../components/modals/thanksforattending/ThanksForAttending";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../context/TimerContext";
import api from "../../redux/api/axiosInstance";

const Restatements = ({ showSubmitButton }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [questions_data, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { stopTest, testIsGoingOn, isTimerRunning } = useTimer();
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  // Memoize the display state to prevent unnecessary re-renders
  const shouldShowQuestions = useMemo(() => {
    return testIsGoingOn && isTimerRunning;
  }, [testIsGoingOn, isTimerRunning]);

  const shouldShowStartMessage = useMemo(() => {
    return !testIsGoingOn;
  }, [testIsGoingOn]);

  const shouldShowPauseMessage = useMemo(() => {
    return testIsGoingOn && !isTimerRunning;
  }, [testIsGoingOn, isTimerRunning]);

  // Transform API data to match the expected format
  const transformApiData = (apiData) => {
    return apiData.restatements.map((item) => ({
      question: item.question,
      options: [
        {
          text: item.option_1,
          isCorrect: item.correct === "1",
          ...(item.correct === "1" && {
            explanation: "This is an explanation of the answer in a tooltip.",
          }),
        },
        {
          text: item.option_2,
          isCorrect: item.correct === "2",
          ...(item.correct === "2" && {
            explanation: "This is an explanation of the answer in a tooltip.",
          }),
        },
        {
          text: item.option_3,
          isCorrect: item.correct === "3",
          ...(item.correct === "3" && {
            explanation: "This is an explanation of the answer in a tooltip.",
          }),
        },
        {
          text: item.option_4,
          isCorrect: item.correct === "4",
          ...(item.correct === "4" && {
            explanation: "This is an explanation of the answer in a tooltip.",
          }),
        },
      ],
    }));
  };

  // Fetch data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/restatements"); // Update this endpoint

        if (response.data.success) {
          const transformedData = transformApiData(response.data);
          setQuestionsData(transformedData);
          setAnswers(Array(transformedData.length).fill(null));
        } else {
          setError("Failed to fetch questions");
        }
      } catch (err) {
        setError("Error fetching questions: " + err.message);
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionIndex, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    setShowResult(true);
    setOpenResultModal(true);
    stopTest();
  };

  const handleCloseModal = () => {
    setOpenResultModal(false);
  };

  const correctCount = questions_data.reduce((acc, q, idx) => {
    const correctOption = q.options.find((o) => o.isCorrect);
    return acc + (correctOption.text === answers[idx] ? 1 : 0);
  }, 0);

  const incorrectCount = answers.filter(
    (ans, idx) =>
      ans && questions_data[idx].options.find((o) => o.isCorrect).text !== ans
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
        <Typography ml={2}>Loading questions...</Typography>
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
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TestTitle
        title={t("restatements.heading")}
        subtitle={t("restatements.subHeading")}
      />

      <Box dir="ltr">
        {shouldShowQuestions && (
          <>
            <Typography mt={4} mb={3} variant="body1">
              This part consists of several sentences, each followed by four
              possible ways of restating the main idea of that sentence in
              different words. For each question, choose the one restatement
              <Typography variant="h6" mt={1}>
                which best expresses the meaning of the original sentence.
              </Typography>
            </Typography>

            <Typography variant="h2" style={{ marginBottom: "30px" }}>
              Questions 1 to {questions_data.length}
            </Typography>

            {questions_data.map((item, index) => (
              <MCQ
                key={index}
                question={item.question}
                options={item.options}
                index={index}
                selectedOption={answers[index]}
                handleOptionChange={handleOptionChange}
                showResult={showResult}
              />
            ))}
            {showSubmitButton && (
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={calculateResults}
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
        testname="Restatements Test"
        openResultModal={openResultModal}
        handleCloseModal={handleCloseModal}
        donutChartOptions={donutChartOptions}
        donutChartSeries={donutChartSeries}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
      />
      <br />
    </>
  );
};

export default Restatements;
