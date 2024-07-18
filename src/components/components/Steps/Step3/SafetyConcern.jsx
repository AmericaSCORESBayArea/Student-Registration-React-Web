import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import {
  genderArray,
  gradesArray,
  regionsArray,
  schoolsName,
  TeamArray,
} from "../../multiplesArray";
import { relationshipArray } from "../../multiplesArray";
import SafetyConcernRight from "./SafetyConcernRight";
import { CustomTextField } from "../../RegisterUI";
import { styled } from "@mui/system";
import { SubTitle } from "../../../componentsStyle/registrationFormStyle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const FormControls = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  marginTop: 5,
  height: "57vh",
  overflowY: "scroll",
});

const BoxContainer = styled("div")({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  backgroundColor: "#DFEDF9",
  padding: "10px",
  borderRadius: "20px",
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
const CustomButton = styled(Button)({
  marginLeft: "5px",
});

const SafetyConcern = ({ handleNext, handleBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [formData, setFormData] = useState({
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    parentGuardianEmail: "",
    relationshipToChild: "",
    parentGuardianPhone1: "",
    parentGuardianPhone2: "",
  });

  const validationSchema = Yup.object({
    parentGuardianFirstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
      .required("Parent/Guardian First Name is required"),
    parentGuardianLastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
      .required("Parent/Guardian Last Name is required"),
  });
  const schoolFacilityOptions = Object.entries(schoolsName).reduce(
    (acc, [region, data]) => {
      const schoolValues = data.schools.map((school) => school.value);
      acc[region] = schoolValues;
      return acc;
    },
    {}
  );
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setShowRight(true);
    } else if (isRightSwipe) {
      setShowRight(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        console.log("Form submitted with values:", data);
        if (data.parentGuardianFirstName && data.parentGuardianLastName) {
          handleNext();
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          {/* {!isMobile ? ( */}
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
                      width: "100%",
                    },
                  }}
                >
                  <FormControls>
                    <Typographys>Parent/Guardian First Name*</Typographys>
                    <Field
                      as={CustomTextFields}
                      name="parentGuardianFirstName"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianFirstName}
                      onChange={handleChange}
                    ></Field>
                    <ErrorMessage
                      name="parentGuardianFirstName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Typographys>Parent/Guardian Last Name*</Typographys>
                    <Field
                      as={CustomTextFields}
                      name="parentGuardianLastName"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianLastName}
                      onChange={handleChange}
                    ></Field>
                    <ErrorMessage
                      name="parentGuardianLastName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Typographys>Parent/Guardian Email</Typographys>
                    <CustomTextFields
                      name="parentGuardianEmail"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianEmail}
                      onChange={handleChange}
                    ></CustomTextFields>
                    <Typographys>Relationship to Child*</Typographys>
                    <CustomTextFields
                      name="relationshipToChild"
                      select
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.relationshipToChild}
                      onChange={handleChange}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (selected === "") {
                            return <span style={{ opacity: 0.5 }}>Select</span>;
                          }
                          return relationshipArray.find(
                            (option) => option.value === selected
                          )?.label;
                        },
                      }}
                    >
                      {relationshipArray &&
                        relationshipArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </CustomTextFields>
                    <Typographys>Parent/Guardian Phone 1</Typographys>
                    <CustomTextFields
                      name="parentGuardianPhone1"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianPhone1}
                      onChange={handleChange}
                    ></CustomTextFields>
                    <Typographys>Parent/Guardian Phone 2</Typographys>
                    <CustomTextFields
                      name="parentGuardianPhone2"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianPhone2}
                      onChange={handleChange}
                    ></CustomTextFields>
                  </FormControls>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      // border: "1px solid red",
                      // justifyContent: "space-between",
                      width: "80%",
                      marginLeft: "20%",
                      // paddingLeft: "3px",
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
                      type="submit"
                    >
                      Continue
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
                  <SafetyConcernRight />
                </Box>
              </Col>
            </Row>
          </Box>
          {/* ) : ( */}
          {/* <Box
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
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
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
                                return schoolFacilityOptions[
                                  formData.region
                                ]?.find((option) => option === selected);
                              },
                            }}
                          >
                            {schoolFacilityOptions[formData.region]?.length >
                            0 ? (
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
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
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
                        <SubTitle>
                          Not sure What to Select? It’s OK to leave this page
                          blank and let us figure it out.
                        </SubTitle>
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
            </Box> */}
          {/* )} */}
        </Form>
      )}
    </Formik>
  );
};

export default SafetyConcern;
