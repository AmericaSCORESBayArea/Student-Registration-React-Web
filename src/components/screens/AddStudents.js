import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Introduction from "../components/Steps/Step1/Introduction";
import ConnectYourStudent from "../components/Steps/Step2/ConnectYourStudent";
import SafetyConcern from "../components/Steps/Step3/SafetyConcern";
import ShareYourConcern from "../components/Steps/step4/ShareYourConcern";
import AcceptWaiver from "../components/Steps/Step5/AcceptWaiver";
import AllDone from "../components/Steps/Step6/AllDone";
import OhNoSorry from "../components/Steps/Step7/OhNoSorry";
import logo from "../../assets/SCORESLogo.png";
import { Container } from "react-bootstrap";

const steps = [
  { label: "Introduction", url: "introduction" },
  { label: "Help Us Connect Your Student", url: "connect-your-student" },
  { label: "Safety is Our Top Concern", url: "safety-is-our-top-concern" },
  { label: "Share Your Concerns and Goals", url: "share-your-concerns-and-goals" },
  { label: "Accept the Waiver", url: "accept-the-waiver" },
  { label: "All Done! Thanks!", url: "all-done-thanks" },
];

const AddStudents = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const standardizedStep = step ? step.toLowerCase() : "";
  const stepIndex = steps.findIndex(e_step => e_step.url === standardizedStep);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [contactId, setContactId] = useState("");
  const [region, setRegion] = useState("");
  const [waiverId, setWaiverId] = useState("");

  useEffect(() => {
    if (!steps || steps.length === 0) {
      setActiveStep(0);
    } else{

    if (stepIndex !== -1 && stepIndex !== undefined && steps[stepIndex].url !== step) {
      setActiveStep(stepIndex);
    }

    if ((step === -1 || location.pathname === "/AddStudents") && steps.length > 0) {
      navigate(`AddStudents//${steps[0].url}`);
    }
  }
  }, [location.pathname, stepIndex, navigate, step]);
  
  useEffect(() => {
    const stepFromUrl = steps.findIndex(step => `/AddStudents/${step.url}` === location.pathname);
    if (stepFromUrl !== -1 && stepFromUrl !== activeStep) {
      setActiveStep(stepFromUrl);
    }
  }, [location.pathname, activeStep]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:991px)");
  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    let newActiveStep;
    newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    if (newActiveStep >= steps.length) {
      newActiveStep = steps.length - 1;
    }
    setActiveStep(newActiveStep);
    setCompleted({ ...completed, [activeStep]: true });
    handleStep(newActiveStep)();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const newActiveStep = prevActiveStep - 1;
        if (newActiveStep >= 0 && newActiveStep < steps.length) {
          handleStep(newActiveStep)();
        }
        return newActiveStep;
    });
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    navigate(`/AddStudents/${steps[step].url}`);
  };
  const handleContact = (val) => {
    val ? setContactId(val) : setContactId("");
  };
  const handleRegion = (val) => {
    val ? setRegion(val) : setRegion("");
  };
  const handleWaiver = (val) => {
    val ? setWaiverId(val) : setWaiverId("");
  };

  const stepContent = (index) => {
    switch (index) {
      case 0:
        return <Introduction handleNext={handleNext} handleBack={handleBack} />;
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
              {steps[activeStep].label}
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
                {steps.map(({label}, index) => (
                  <Step key={`${label}-${index}`} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
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
                {steps.map(({label}, index) => (
                  <Step key={`${label}-${index}`} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Box sx={{ height: "65vh", width: "100%", p: 2 }}>
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
            <Typography>{steps[activeStep].label}</Typography>
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
                  ></StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ minHeight: "65vh", height: "100%", width: "100%", p: 2 }}>
            {stepContent(activeStep)}
          </Box>

          {/* <MobileStepper
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
          /> */}
        </Box>
      )}
    </Container>
  );
};

export default AddStudents;
