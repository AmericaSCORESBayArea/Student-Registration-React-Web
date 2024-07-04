import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
  MobileStepper,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Introduction from "../components/Steps/Introduction";
import ConnectYourStudent from "../components/Steps/ConnectYourStudent";
import SafetyConcern from "../components/Steps/SafetyConcern";
import ShareYourConcern from "../components/Steps/ShareYourConcern";
import AcceptWaiver from "../components/Steps/AcceptWaiver";
import AllDone from "../components/Steps/AllDone";
import OhNoSorry from "../components/Steps/OhNoSorry";

const AddStudents = () => {
  const steps = [
    "Introduction",
    "Help Us Connect Your Student",
    "Safety is Our Top Concern",
    "Share Your Concerns and Goals",
    "Accept the Waiver",
    "All Done! Thanks!",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    setCompleted({ ...completed, [activeStep]: true });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const stepContent = (index) => {
    switch (index) {
      case 0:
        return <Introduction />;
      case 1:
        return <ConnectYourStudent />;
      case 2:
        return <SafetyConcern />;
      case 3:
        return <ShareYourConcern />;
      case 4:
        return <AcceptWaiver />;
      case 5:
        return <AllDone />;
      default:
        return <OhNoSorry />;
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        {!isMobile ? (
          <>
            <Stepper
              nonLinear
              alternativeLabel
              activeStep={activeStep}
              sx={{
                maxWidth: "1200px",
                width: "100%",
                margin: "auto",
              }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 2,
              }}
            >
              <Box sx={{ height: "65vh", maxWidth: 1200, width: "100%", p: 2 }}>
                <Typography>{stepContent(activeStep)}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  {isLastStep() ? "Finish" : "Next"}
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ maxWidth: 400, display: "flex", flexDirection: "column" }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                pl: 2,
                bgcolor: "#f8f5f4",
              }}
            >
              <Typography>{steps[activeStep]}</Typography>
            </Paper>
            <Box sx={{ height: "60vh", maxWidth: 400, width: "100%", p: 2 }}>
              <Typography>{stepContent(activeStep)}</Typography>
            </Box>
            <MobileStepper
              variant="text"
              steps={totalSteps()}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === totalSteps() - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
              //   nextButton={
              //     <Button
              //       size="small"
              //       onClick={handleNext}
              //       disabled={isLastStep()}
              //     >
              //       Next
              //       <KeyboardArrowRight />
              //     </Button>
              //   }
              //   backButton={
              //     <Button
              //       size="small"
              //       onClick={handleBack}
              //       disabled={activeStep === 0}
              //     >
              //       <KeyboardArrowLeft />
              //       Back
              //     </Button>
              //   }
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AddStudents;
