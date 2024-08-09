import {
  Box,
  Step,
  StepButton,
  Stepper,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreatedStudents from "../components/Steps/Step0/CreatedStudents";
import Introduction from "../components/Steps/Step1/Introduction";
import ConnectYourStudent from "../components/Steps/Step2/ConnectYourStudent";
import SafetyConcern from "../components/Steps/Step3/SafetyConcern";
import ShareYourConcern from "../components/Steps/step4/ShareYourConcern";
import AcceptWaiver from "../components/Steps/Step5/AcceptWaiver";
import AllDone from "../components/Steps/Step6/AllDone";
import OhNoSorry from "../components/Steps/Step7/OhNoSorry";
import logo from "../../assets/SCORESLogo.png";
import { Container } from "react-bootstrap";
import { getStudentsByPhoneNumber } from "../controller/api";

const AddStudents = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [contactId, setContactId] = useState("");
  const [region, setRegion] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [showParentStudents, setShowParentStudents] = useState(false);
  const [waiverId, setWaiverId] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:991px)");
  const totalSteps = () => steps.length;

  const steps = showParentStudents
    ? [
        "Created Students",
        "Introduction",
        "Help Us Connect Your Student",
        "Safety is Our Top Concern",
        "Share Your Concerns and Goals",
        "Accept the Waiver",
        "All Done! Thanks!",
      ]
    : [
        "Introduction",
        "Help Us Connect Your Student",
        "Safety is Our Top Concern",
        "Share Your Concerns and Goals",
        "Accept the Waiver",
        "All Done! Thanks!",
      ];

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const getAllStudentsByPhoneNumber = useCallback(async () => {
    let phoneNumber = localStorage.getItem("phoneNumber");
    try {
      await getStudentsByPhoneNumber(phoneNumber).then((result) => {
        if (result.length !== 0) {
          setShowParentStudents(true);
          setStudentsList(result);
        }
        console.log("result", result);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getAllStudentsByPhoneNumber();
  }, [getAllStudentsByPhoneNumber]);

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
    setCompleted({ ...completed, [activeStep]: true });
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if ((showParentStudents && step > 2) || (!showParentStudents && step > 1)) {
      if (!contactId) return;
    }
    setActiveStep(step);
  };

  const handleContact = (val) => setContactId(val || "");
  const handleRegion = (val) => setRegion(val || "");
  const handleWaiver = (val) => setWaiverId(val || "");
  const stepContent = (index) => {
    if (showParentStudents) {
      switch (index) {
        case 0:
          return <CreatedStudents studentsList={studentsList} />;
        case 1:
          return (
            <Introduction handleNext={handleNext} handleBack={handleBack} />
          );
        case 2:
          return (
            <ConnectYourStudent
              handleNext={handleNext}
              handleBack={handleBack}
              handleContact={handleContact}
              handleRegion={handleRegion}
            />
          );
        case 3:
          return (
            <SafetyConcern
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
            />
          );
        case 4:
          return (
            <ShareYourConcern
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
            />
          );
        case 5:
          return (
            <AcceptWaiver
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
              region={region}
              handleWaiver={handleWaiver}
            />
          );
        case 6:
          return (
            <AllDone
              handleBack={handleBack}
              handleNext={handleNext}
              contactId={contactId}
              waiverId={waiverId}
            />
          );
        default:
          return <OhNoSorry />;
      }
    } else {
      switch (index) {
        case 0:
          return (
            <Introduction handleNext={handleNext} handleBack={handleBack} />
          );
        case 1:
          return (
            <ConnectYourStudent
              handleNext={handleNext}
              handleBack={handleBack}
              handleContact={handleContact}
              handleRegion={handleRegion}
            />
          );
        case 2:
          return (
            <SafetyConcern
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
            />
          );
        case 3:
          return (
            <ShareYourConcern
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
            />
          );
        case 4:
          return (
            <AcceptWaiver
              handleNext={handleNext}
              handleBack={handleBack}
              contactId={contactId}
              region={region}
              handleWaiver={handleWaiver}
            />
          );
        case 5:
          return (
            <AllDone
              handleBack={handleBack}
              handleNext={handleNext}
              contactId={contactId}
              waiverId={waiverId}
            />
          );
        default:
          return <OhNoSorry />;
      }
    }
  };

  return (
    <Container
      style={{
        backgroundColor: isMobile ? "#FFFFFF" : "#FFFADF",
      }}
    >
      {!isMobile && !isTablet ? (
        <Box
          sx={{
            marginBottom: "30px",
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: " 0 20px",
            }}
          >
            <Box
              sx={{
                width: "15%",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {steps[activeStep]}
            </Box>
            <Box>
              <Stepper
                nonLinear
                alternativeLabel
                activeStep={activeStep}
                style={{
                  marginTop: "40px",
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      disabled={index > 2 && !contactId}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box>
              <img src={logo} alt="logo" width={250} height={95} />
            </Box>
          </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "75vh",
                maxWidth: 1200,
                width: "100%",
                p: 2,
              }}
            >
              <Typography>{stepContent(activeStep)}</Typography>
            </Box>
          </Box>
        </Box>
      ) : isTablet ? (
        <>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 20px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "0 20px",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h6">Help Us Connect Your Student</Typography>
              <img src={logo} alt="logo" width={250} height={95} />
            </Box>
            <Box style={{ width: "100%" }}>
              <Stepper
                nonLinear
                alternativeLabel
                activeStep={activeStep}
                style={{
                  marginTop: "40px",
                  width: "100%",
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      disabled={index > 1 && !contactId}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Container>

          <Box sx={{ height: "100%", width: "100%", p: 2 }}>
            <Typography>{stepContent(activeStep)}</Typography>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
          <Box>
            <Stepper
              nonLinear
              alternativeLabel
              activeStep={activeStep}
              style={{
                marginTop: "40px",
                marginInline: "10px",
              }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    color="inherit"
                    onClick={handleStep(index)}
                    disabled={index > 1 && !contactId}
                  />
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ minHeight: "65vh", height: "100%", width: "100%", p: 2 }}>
            {stepContent(activeStep)}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default AddStudents;
