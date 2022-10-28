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
    props.translations.steps_1,
    props.translations.steps_2,
    props.translations.steps_3,
  ];
  //const history = useNavigate();
  const [student, setStudent] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [roleType, setRoleType] = React.useState();
  const [regStatus, setRegStatus] = React.useState();
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

  const setStudentProps = (props) => {
    setStudent(props);
  };

  const handleNext = (step, selected) => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    if (step === "role_type") {
      setRoleType(selected);
    } else if (step === "registration_status") {
      setRegStatus(selected);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(1);
    setCompleted({});
    setRegStatus("");
    setStudent("");
  };

  const getScreen = () => {
    switch (activeStep) {
      case 0:
        return (
          <RoleType
            props={props.translations.parent_coach_option}
            parentOption={props.translations.parent_option}
            coachOption={props.translations.coach_option}
            title={props.translations.parent_coach_title}
            continueButton={props.translations.button_continue}
            function={handleNext}
            roleType={roleType}
          />
        );
      case 1:
        return (
          <Registration
            roleType={roleType}
            props={props.translations.new_returning_option}
            newOption={props.translations.new_option}
            returningOption={props.translations.returning_option}
            title={props.translations.new_returning_title}
            sub_title={props.translations.new_returning_sub_heading}
            continueButton={props.translations.button_continue}
            backButton={props.translations.button_back}
            students={props.translations.searchStudent}
            error_students={props.translations.error_students}
            function={handleNext}
            function_back={handleBack}
            registration_status={regStatus}
            empty={props.translations.resultOption}
            studentProps={setStudentProps}
          />
        );
      case 2:
        return (
          <Form
            roleType={roleType}
            backButton={props.translations.button_back}
            submitButton={props.translations.button_submit}
            function_back={handleBack}
            modalTranslations={props.translations.register_modal_success}
            modalErrorTranslations={props.translations.error_modal}
            modalEditTranslations={props.translations.edit_modal_success}
            handleReset={handleReset}
            formTranslations={props.translations.form}
            studentProps={student}
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
