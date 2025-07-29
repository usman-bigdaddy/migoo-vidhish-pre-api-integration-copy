import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Reading from "./components/Reading";
// import SentenceCompletion from "./components/SentenceCompletion";
// import Restatements from "./components/Restatements";
// import ListeningTest from "./components/ListeningTest";

import Reading from "../../views/reading/Reading";
import SentenceCompletion from "../../views/sentencecompletion/SentenceCompletion";
import Restatements from "../../views/restatements/Restatements";
import ListeningTest from "../../views/listeningtest/ListeningTest";

import AverageScore from "../../components/modals/averagescore/AverageScore";
import TestTitle from "./components/TestTitle";

export default function EnglishTest() {
  const steps = ["Reading", "Sentence", "Listening", "Restatements"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false); // Final modal

  // Timer-related state from TestTitle
  const [isCountdownComplete, setIsCountdownComplete] = React.useState(false);
  const [testIsGoingOn, setTestIsGoingOn] = React.useState(true);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // const handleComplete = () => {
  //   const newCompleted = {
  //     ...completed,
  //     [activeStep]: true,
  //   };
  //   setCompleted(newCompleted);

  //   if (completedSteps() === totalSteps() - 1 && isLastStep()) {
  //     setOpenModal(true);
  //   } else {
  //     handleNext();
  //   }
  // };

  const handleComplete = () => {
    const newCompleted = {
      ...completed,
      [activeStep]: true,
    };
    setCompleted(newCompleted);
    stopTest();

    if (completedSteps() === totalSteps() - 1 && isLastStep()) {
      // setTestIsGoingOn(false); // Stop timer on final submit
      // () => setTestIsGoingOn(false);
      setOpenModal(true);
    } else {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setOpenModal(false);
    setIsCountdownComplete(false);
    setTestIsGoingOn(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TestTitle
        title="English Test"
        subtitle="Please complete all 4 sections"
        onCountdownComplete={() => setIsCountdownComplete(true)}
        onStopTest={() => {
          setTestIsGoingOn(false);
        }}
      />
      <br />
      <br />

      {isCountdownComplete && testIsGoingOn && (
        <>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div>
            {allStepsCompleted() ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you're finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
                <AverageScore
                  open={openModal}
                  handleClose={() => setOpenModal(false)}
                />
              </>
            ) : (
              <>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {activeStep === 0 && (
                    <Reading standalone={false} showSubmitButton={false} />
                  )}
                  {activeStep === 1 && (
                    <SentenceCompletion
                      standalone={false}
                      showSubmitButton={false}
                    />
                  )}
                  {activeStep === 2 && (
                    <ListeningTest
                      standalone={false}
                      showSubmitButton={false}
                    />
                  )}
                  {activeStep === 3 && (
                    <Restatements standalone={false} showSubmitButton={false} />
                  )}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Submit"
                      : "Next Test"}
                  </Button>
                </Box>
              </>
            )}
          </div>
        </>
      )}
    </Box>
  );
}
