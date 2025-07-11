import React, {useState} from 'react'
import TestTitle from './TestTitle'
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material'
import MCQ from "../../../components/mcq/MCQ"
import TestHeader from './TestHeader'


import Chart from 'react-apexcharts';
import TestResults from '../../../components/modals/testresults/TestResults';

import { useTranslation } from 'react-i18next';

const Restatements = ({showSubmitButton}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const questions_data = [
    {
      question: "A person who is deficient in a particular nutrient may crave certain foods.",
      options: [
        { text: "A strong desire for certain foods can be caused by the lack of a specific nutrient.", isCorrect: true, explanation:"This is an explanation of the answer in a tooltip." },
        { text: "Consuming an adequate amount of nutrients can promote good health.", isCorrect: false },
        { text: "Cravings can lead to the excessive consumption of food.", isCorrect: false },
        { text: "People tend to consume foods that have little nutritional value.", isCorrect: false }
      ]
    },
    {
      question: "Which sentence is grammatically correct?",
      options: [
        { text: "She don't like ice cream.", isCorrect: false },
        { text: "She doesn't likes ice cream.", isCorrect: false },
        { text: "She doesn't like ice cream.", isCorrect: true, explanation:"This is an explanation of the answer in a tooltip." },
        { text: "She not like ice cream.", isCorrect: false }
      ]
    },
    {
      question: "Choose the correct form of the verb: 'They ___ to the party last night.'",
      options: [
        { text: "go", isCorrect: false },
        { text: "gone", isCorrect: false },
        { text: "went", isCorrect: true, explanation:"This is an explanation of the answer in a tooltip." },
        { text: "going", isCorrect: false }
      ]
    },
    {
      question: "Fill in the blank: 'If I ___ you, I would apologize.'",
      options: [
        { text: "was", isCorrect: false },
        { text: "am", isCorrect: false },
        { text: "were", isCorrect: true, explanation:"This is an explanation of the answer in a tooltip." },
        { text: "be", isCorrect: false }
      ]
    },
    {
      question: "Choose the correct sentence:",
      options: [
        { text: "Its a beautiful day.", isCorrect: false },
        { text: "It’s a beautiful day.", isCorrect: true, explanation:"This is an explanation of the answer in a tooltip." },
        { text: "Its’ a beautiful day.", isCorrect: false },
        { text: "Its’s a beautiful day.", isCorrect: false }
      ]
    }
  ];

  const [answers, setAnswers] = useState(Array(questions_data.length).fill(null));
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
  };

  const handleCloseModal = () => {
    setOpenResultModal(false);
  };

  const correctCount = questions_data.reduce((acc, q, idx) => {
    const correctOption = q.options.find((o) => o.isCorrect);
    return acc + (correctOption.text === answers[idx] ? 1 : 0);
  }, 0);

  const incorrectCount = answers.filter((ans, idx) => ans && questions_data[idx].options.find(o => o.isCorrect).text !== ans).length;

  const donutChartOptions = {
    chart: { type: 'donut' },
    labels: ['Correct', 'Incorrect'],
    colors: ['#4caf50', '#f44336'],
    legend: { position: 'bottom' }
  };

  const donutChartSeries = [correctCount, incorrectCount];

  const {t} = useTranslation()
  
  return (
    <>
    <TestHeader
    title={t('restatements.heading')}
    subtitle={t('restatements.subHeading')}
    />
   
<Box dir="ltr">
    <Typography mt={4} mb={3} variant="body1">This part consists of several sentences, each followed by four possible ways of restating the
main idea of that sentence in different words. For each question, choose the one restatement
        <Typography variant="h6" mt={1}>which best expresses the meaning of the original sentence.</Typography>
        </Typography>
    
    <Typography variant="h2" style={{marginBottom:"30px"}}>Questions 1 to 5</Typography> 
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
          {showSubmitButton && 
        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={calculateResults}>
            Submit Test
          </Button>
        }
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
  )
}

export default Restatements