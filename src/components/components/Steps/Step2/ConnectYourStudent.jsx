import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import ConnectYourStudentRight from "./ConnectYourStudentRight";
import {
  genderArray,
  gradesArray,
  regionsArray,
  schoolsName,
  TeamArray,
} from "../../multiplesArray";
import { CustomTextField } from "../../RegisterUI";
import { styled } from "@mui/system";

const FormControls = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  marginTop: 5,
  height: "57vh",
  overflowY: "scroll",
});

const Typographys = styled(Typography)({
  textAlign: "left",
  paddingBottom: "5px",
  width: "100%",
});

const CustomTextFields = styled(CustomTextField)({
  backgroundColor: "white",
  paddingInline: "1%",
  borderRadius: 10,
});

const ProgramSiteContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  marginTop: "5px",
  width: "100%",
  backgroundColor: "lightskyblue",
  padding: "10px 10px",
  borderRadius: "10px",
});

const CustomButton = styled(Button)({
  marginLeft: "5px",
});
const FabButton = styled(Fab)(({ selected }) => ({
  paddingInline: "10px",
  backgroundColor: selected ? "grey" : "#03467F",
  color: "white",
  height: "100px",
  width: "100px",
}));
const GradeButtonContainer = styled(ButtonGroup)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const GradeButton = styled(Button)(({ selected }) => ({
  marginInline: "5px",
  backgroundColor: selected ? "grey" : "#03467F",
  color: "white",
}));
const TypographyGender = styled(Typography)({
  fontSize: "18px",
  color: "white",
});
const BoxContainer = styled("div")({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  backgroundColor: "#DFEDF9",
  padding: "10px",
  borderRadius: "20px",
});

const ConnectYourStudent = ({ handleNext, handleBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const genderArray_mob = ["Boy", "Non-Declared", "Girl"];
  const gradeArray_mob = ["3", "4", "5", "6", "7", "8"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    region: "",
    schoolFacility: "",
    team: "",
  });
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const getGradeHandler = (grade) => {
    setSelectedGrade(grade);
  };
  const getGenderHandler = (gender) => {
    setSelectedGender(gender);
  };

  // useEffect(() => {
  //   console.log("selectedGrade : ", selectedGrade);
  // }, [selectedGrade]);
  const schoolFacilityOptions = Object.entries(schoolsName).reduce(
    (acc, [region, data]) => {
      const schoolValues = data.schools.map((school) => school.value);
      acc[region] = schoolValues;
      return acc;
    },
    {}
  );

  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setShowRight(true);
    } else if (isRightSwipe) {
      setShowRight(false);
    }
  }, [touchStart, touchEnd]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log("formData :", updatedData);
      return updatedData;
    });
  }, []);

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{ pt: 2 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Row>
            <Col xs={12} md={12} lg={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  width: "60%",
                  "@media (max-width: 600px)": {
                    display: showRight ? "none" : "flex",
                  },
                }}
              >
                <FormControls>
                  <Typographys>First Name*</Typographys>
                  <CustomTextFields
                    id="firstName"
                    name="firstName"
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <Typographys>Last Name or Initial*</Typographys>
                  <CustomTextFields
                    id="lastName"
                    name="lastName"
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <Typographys>Gender</Typographys>
                  <CustomTextFields
                    name="gender"
                    select
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    value={formData.gender}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (selected === "") {
                          return (
                            <span style={{ opacity: 0.5 }}>
                              Select a Gender
                            </span>
                          );
                        }
                        return genderArray.find(
                          (option) => option.value === selected
                        )?.label;
                      },
                    }}
                  >
                    {genderArray && genderArray.length > 0 ? (
                      genderArray.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Loading...
                      </MenuItem>
                    )}
                  </CustomTextFields>
                  <Typographys>Grade</Typographys>
                  <CustomTextFields
                    name="grade"
                    select
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    value={formData.grade}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (selected === "") {
                          return (
                            <span style={{ opacity: 0.5 }}>Select a Grade</span>
                          );
                        }
                        return gradesArray.find(
                          (option) => option.value === selected
                        )?.label;
                      },
                    }}
                  >
                    {gradesArray && gradesArray.length > 0 ? (
                      gradesArray.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Loading...
                      </MenuItem>
                    )}
                  </CustomTextFields>
                  <ProgramSiteContainer>
                    <Typographys>Region*</Typographys>
                    <CustomTextFields
                      name="region"
                      select
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={formData.region}
                      onChange={handleChange}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (selected === "") {
                            return (
                              <span style={{ opacity: 0.5 }}>
                                Select a Region
                              </span>
                            );
                          }
                          return regionsArray.find(
                            (option) => option.value === selected
                          )?.label;
                        },
                      }}
                    >
                      {regionsArray && regionsArray.length > 0 ? (
                        regionsArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Loading...
                        </MenuItem>
                      )}
                    </CustomTextFields>
                    <Typographys>School or Facility Name*</Typographys>
                    <CustomTextFields
                      name="schoolFacility"
                      select
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={formData.schoolFacility}
                      onChange={handleChange}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (selected === "") {
                            return (
                              <span style={{ opacity: 0.5 }}>
                                Select a School or Facility
                              </span>
                            );
                          }
                          return schoolFacilityOptions[formData.region]?.find(
                            (option) => option === selected
                          );
                        },
                      }}
                    >
                      {schoolFacilityOptions[formData.region]?.length > 0 ? (
                        schoolFacilityOptions[formData.region]?.map(
                          (option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )
                      ) : (
                        <MenuItem value="" disabled>
                          Loading...
                        </MenuItem>
                      )}
                    </CustomTextFields>
                    <Typographys>Team</Typographys>
                    <CustomTextFields
                      name="team"
                      select
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={formData.team}
                      onChange={handleChange}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (selected === "") {
                            return (
                              <span style={{ opacity: 0.5 }}>
                                Select a Team
                              </span>
                            );
                          }
                          return TeamArray.find(
                            (option) => option.value === selected
                          )?.label;
                        },
                      }}
                    >
                      {TeamArray && TeamArray.length > 0 ? (
                        TeamArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Loading...
                        </MenuItem>
                      )}
                    </CustomTextFields>
                  </ProgramSiteContainer>
                </FormControls>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    width: "80%",
                    marginLeft: "20%",
                  }}
                >
                  <CustomButton
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                  >
                    Back
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Get Started
                  </CustomButton>
                </Box>
              </Box>
            </Col>
            <Col xs={12} md={12} lg={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  "@media (max-width: 600px)": {
                    display: showRight ? "flex" : "none",
                  },
                }}
              >
                <ConnectYourStudentRight />
              </Box>
            </Col>
          </Row>
        </Box>
      ) : (
        <Box
          sx={{ pt: 2 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Row>
            <Col xs={12} md={12} lg={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  "@media (max-width: 600px)": {
                    display: showRight ? "none" : "flex",
                  },
                }}
              >
                <BoxContainer>
                  <FormControls>
                    <Typographys>First Name*</Typographys>
                    <CustomTextFields
                      id="firstName"
                      name="firstName"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <Typographys>Last Name or Initial</Typographys>
                    <CustomTextFields
                      id="lastName"
                      name="lastName"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <Typographys>Gender</Typographys>

                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
                      {genderArray_mob.map((gender, index) => (
                        <FabButton
                          key={index}
                          size="large"
                          onClick={() => getGenderHandler(gender)}
                          selected={selectedGender === gender}
                        >
                          {gender}
                        </FabButton>
                      ))}
                    </Box>
                    <Typographys>Grade</Typographys>
                    <GradeButtonContainer aria-label="Basic button group">
                      {gradeArray_mob.map((grade) => (
                        <GradeButton
                          key={grade}
                          onClick={() => getGradeHandler(grade)}
                          selected={selectedGrade === grade}
                        >
                          {grade}
                        </GradeButton>
                      ))}
                    </GradeButtonContainer>
                  </FormControls>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CustomButton
                      variant="contained"
                      color="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </CustomButton>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Continue
                    </CustomButton>
                  </Box>
                </BoxContainer>
              </Box>
            </Col>
          </Row>
        </Box>
      )}
    </>
  );
};

export default ConnectYourStudent;
