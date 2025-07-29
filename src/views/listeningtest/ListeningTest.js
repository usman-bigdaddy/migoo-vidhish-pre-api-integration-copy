import React, { useEffect, useState } from "react";
import TestTitle from "../../components/testtitle/TestTitle";
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
import MCQ from "../../components/mcq/MCQ";
import Speaker from "../../assets/images/general/speaker.svg";
import Chart from "react-apexcharts";
import TestResults from "../../components/modals/testresults/TestResults";
import ThanksForAttendingPopup from "../../components/modals/thanksforattending/ThanksForAttending";
import { useDispatch, useSelector } from "react-redux";
import { getGrammarAudio } from "../../redux/features/listeningSlice";
import { useTranslation } from "react-i18next";
import { useTimer } from "../../context/TimerContext";

const ListeningTest = ({ showSubmitButton, standalone = true }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();

  //const audioData = useSelector((state) => state.listening.audioData);
  const audioData =
    "https://file-examples.com/storage/fe1aa0c9d563ea1e4a1fd34/2017/11/file_example_MP3_700KB.mp3";

  useEffect(() => {
    dispatch(getGrammarAudio({ level: 1 }));
  }, [dispatch]);

  const questions_data = [
    {
      question:
        "A person who is deficient in a particular nutrient may crave certain foods.",
      options: [
        {
          text: "A strong desire for certain foods can be caused by the lack of a specific nutrient.",
          isCorrect: true,
          explanation: "This is an explanation of the answer in a tooltip.",
        },
        {
          text: "Consuming an adequate amount of nutrients can promote good health.",
          isCorrect: false,
        },
        {
          text: "Cravings can lead to the excessive consumption of food.",
          isCorrect: false,
        },
        {
          text: "People tend to consume foods that have little nutritional value.",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Which sentence is grammatically correct?",
      options: [
        { text: "She don't like ice cream.", isCorrect: false },
        { text: "She doesn't likes ice cream.", isCorrect: false },
        {
          text: "She doesn't like ice cream.",
          isCorrect: true,
          explanation: "This is an explanation of the answer in a tooltip.",
        },
        { text: "She not like ice cream.", isCorrect: false },
      ],
    },
    {
      question:
        "Choose the correct form of the verb: 'They ___ to the party last night.'",
      options: [
        { text: "go", isCorrect: false },
        { text: "gone", isCorrect: false },
        {
          text: "went",
          isCorrect: true,
          explanation: "This is an explanation of the answer in a tooltip.",
        },
        { text: "going", isCorrect: false },
      ],
    },
    {
      question: "Fill in the blank: 'If I ___ you, I would apologize.'",
      options: [
        { text: "was", isCorrect: false },
        { text: "am", isCorrect: false },
        {
          text: "were",
          isCorrect: true,
          explanation: "This is an explanation of the answer in a tooltip.",
        },
        { text: "be", isCorrect: false },
      ],
    },
    {
      question: "Choose the correct sentence:",
      options: [
        { text: "Its a beautiful day.", isCorrect: false },
        {
          text: "It’s a beautiful day.",
          isCorrect: true,
          explanation: "This is an explanation of the answer in a tooltip.",
        },
        { text: "Its’ a beautiful day.", isCorrect: false },
        { text: "Its’s a beautiful day.", isCorrect: false },
      ],
    },
  ];
  const { stopTest } = useTimer(); // ✅ Import stopTest from TimerContext

  const [answers, setAnswers] = useState(
    Array(questions_data.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

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

  return (
    <>
      {standalone && (
        <TestTitle
          standalone={standalone}
          title={t("listening.heading")}
          subtitle={t("listening.subHeading")}
        />
      )}
      <Box dir="ltr">
        <Grid container spacing={5} mt={1}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box style={{ border: "1px solid #2a8efe", borderRadius: "10px" }}>
              <Box
                m={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <img src={Speaker} alt="speaker" style={{ marginBottom: 16 }} />
                <audio controls>
                  <source
                    //src={audioData?.question?.audio_url}
                    src={audioData}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography mb={3} variant="body1">
              This part consists of two passages, each followed by several
              related questions. For each question,
              <Typography variant="h6" mt={1}>
                choose the most appropriate answer based on the audio.
              </Typography>
            </Typography>

            <Typography variant="h2" style={{ marginBottom: "30px" }}>
              Questions 1 to 5
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
          </Grid>
        </Grid>
      </Box>

      <TestResults
        testname="Listening Test"
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

export default ListeningTest;

// import React from 'react'
// import TestTitle from '../../components/testtitle/TestTitle'
// // import { Grid } from '@mui/system'
// import { Box, Grid, Typography, Button } from '@mui/material'
// import MCQ from '../../components/mcq/MCQ'
// import Speaker from "../../assets/images/general/speaker.svg"
// const ListeningTest = () => {
//   const questions_data = [
//     {
//       question: "A person who is deficient in a particular nutrient may crave certain foods.",
//       options: [
//         { text: "A strong desire for certain foods can be caused by the lack of a specific nutrient.", isCorrect: true },
//         { text: "Consuming an adequate amount of nutrients can promote good health.", isCorrect: false },
//         { text: "Cravings can lead to the excessive consumption of food.", isCorrect: false },
//         { text: "People tend to consume foods that have little nutritional value.", isCorrect: false }
//       ]
//     },
//     {
//       question: "Which sentence is grammatically correct?",
//       options: [
//         { text: "She don't like ice cream.", isCorrect: false },
//         { text: "She doesn't likes ice cream.", isCorrect: false },
//         { text: "She doesn't like ice cream.", isCorrect: true },
//         { text: "She not like ice cream.", isCorrect: false }
//       ]
//     },
//     {
//       question: "Choose the correct form of the verb: 'They ___ to the party last night.'",
//       options: [
//         { text: "go", isCorrect: false },
//         { text: "gone", isCorrect: false },
//         { text: "went", isCorrect: true },
//         { text: "going", isCorrect: false }
//       ]
//     },
//     {
//       question: "Fill in the blank: 'If I ___ you, I would apologize.'",
//       options: [
//         { text: "was", isCorrect: false },
//         { text: "am", isCorrect: false },
//         { text: "were", isCorrect: true },
//         { text: "be", isCorrect: false }
//       ]
//     },
//     {
//       question: "Choose the correct sentence:",
//       options: [
//         { text: "Its a beautiful day.", isCorrect: false },
//         { text: "It’s a beautiful day.", isCorrect: true },
//         { text: "Its’ a beautiful day.", isCorrect: false },
//         { text: "Its’s a beautiful day.", isCorrect: false }
//       ]
//     }
//   ];

//   return (
//     <>
//     <TestTitle
//     title="Listening test"
//     subtitle="Enhance Your Listening Skills Through Focused Practice."
//     />
//     <Grid container spacing={5} mt={1}>
//       <Grid item lg={6} md={6} sm={12} xs={12} justifyContent={"center"}>
//         <Box style={{border:"1px solid #2a8efe", borderRadius:"10px"}}>
//        <Box m={3}>
//         <img src={Speaker} />
//        {/* Sample deployed audio URL */}
//        <br />
//        <audio controls>
//           <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
//           Your browser does not support the audio element.
//         </audio>
//         </Box>
//         </Box>
//       </Grid>
//       <Grid item lg={6} md={6} sm={12} xs={12}>
//       <Typography mb={3} variant="body1">This part consists of two passages, each followed by several related questions. For each question,
//     <Typography variant="h6">choose the most appropriate answer based on the audio.</Typography>
//     </Typography>

//     <Typography variant="h2" style={{marginBottom:"30px"}}>Questions 1 to 5</Typography>
//     {questions_data.map((item, index)=>{
//         return (
//           <>
//         {console.log("index from outside : ", index)}

//             <MCQ
//             key={index}
//             question={item.question}
//             options={item.options}
//             index={index}
//             />
//             </>
//         )
//     })}
//    <Button variant="contained" colour="primary" sx={{m:1}}>Submit Test</Button>

//       </Grid>
//     </Grid>
//     </>
//   )
// }

// export default ListeningTest
