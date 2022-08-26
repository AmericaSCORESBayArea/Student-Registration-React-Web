import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import RoleType from "./../components/RoleType";
import Registration from "./../components/Registration_Status";
import Form from "./../components/Form";
export default function HomeScreen(props) {
  const steps = [
    props.traslations.steps_1,
    props.traslations.steps_2,
    props.traslations.steps_3,
  ];
  //const history = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = (props) => {
    console.log(props);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    console.log(step);
    setActiveStep(step);
  };

  /*const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };*/

  const getScreen = () => {
    switch (activeStep) {
      case 0:
        return (
          <RoleType
            props={props.traslations.parent_coach_option}
            parentOption={props.traslations.parent_option}
            coachOption={props.traslations.coach_option}
            title={props.traslations.parent_coach_title}
            continueButton={props.traslations.button_continue}
            function={handleNext}
          />
        );
      case 1:
        return (
          <Registration
            props={props.traslations.new_returning_option}
            newOption={props.traslations.new_option}
            returningOption={props.traslations.returning_option}
            title={props.traslations.new_returning_title}
            continueButton={props.traslations.button_continue}
            backButton={props.traslations.button_back}
            function={handleNext}
            function_back={handleBack}
          />
        );
      case 2:
        return (
          <Form
            backButton={props.traslations.button_back}
            submitButton={props.traslations.button_submit}
            function_back={handleBack}
          />
        );
      default:
        return;
    }
  };
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <React.Fragment>
      <Box
        display="flex"
        width={"100%"}
        alignItems="center"
        justifyContent="center"
      >
        <Stepper
          style={{ width: width < 720 ? "90%" : "50%" }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        display="flex"
        width={"100%"}
        alignItems="center"
        justifyContent="center"
      >
        {getScreen()}
      </Box>
    </React.Fragment>
  );
}
