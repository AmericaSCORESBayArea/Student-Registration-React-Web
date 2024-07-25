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
  genderArray_Mobile,
  gradeArray_Mobile,
  gradesArray,
} from "../../multiplesArray";
import { CustomTextField } from "../../RegisterUI";
import { styled } from "@mui/system";
import {
  getRegionsData,
  getSchoolData,
  getTeamSeasons,
} from "../../../controller/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SubTitle } from "../../../componentsStyle/registrationFormStyle";
import axios from "axios";

const FormControls = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  marginTop: 5,
  paddingInline: "1%",
  height: "100%",
  maxHeight: "57vh",
  overflowY: "scroll",
});
const FormControlsMobile = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  marginTop: 5,

  overflowY: "scroll",
});

const Typographys = styled(Typography)({
  textAlign: "left",
  paddingBottom: "5px",
  width: "100%",
  marginBlock: "5px",
  fontSize: "22px",
});

const CustomTextFields = styled(CustomTextField)({
  backgroundColor: "white",
  borderRadius: 10,
  marginBlock: "5px",
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
  marginBlock: "5px",
});

const CustomButton = styled(Button)({
  marginLeft: "5px",
  marginBlock: "5px",
});
const FabButton = styled(Fab)(({ selected }) => ({
  paddingInline: "10px",
  backgroundColor: selected ? "grey" : "#03467F",
  color: "white",
  height: "100px",
  width: "100px",
  marginBlock: "5px",
}));
// CustomFabButton component
const CustomFabButton = ({ field, form, gender, selectedGender }) => (
  <FabButton
    size="large"
    onClick={() => {
      form.setFieldValue(field.name, gender);
    }}
    selected={selectedGender === gender}
  >
    {gender}
  </FabButton>
);

const CustomGradeButton = ({ field, form, grade, selectedGrade }) => (
  <GradeButton
    onClick={() => {
      form.setFieldValue(field.name, grade);
    }}
    selected={selectedGrade === grade}
  >
    {grade}
  </GradeButton>
);
const GradeButtonContainer = styled(ButtonGroup)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBlock: "5px",
});
const GradeButton = styled(Button)(({ selected }) => ({
  marginInline: "5px",
  backgroundColor: selected ? "grey" : "#03467F",
  color: "white",
  marginBlock: "5px",
}));
const BoxContainer = styled("div")({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  backgroundColor: "#DFEDF9",
  padding: "10px",
  borderRadius: "20px",
  marginBlock: "5px",
});

const ConnectYourStudent = ({
  handleNext,
  handleBack,
  handleContact,
  handleRegion,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [regionData, setRegionData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [isTeamData, setIsTeamData] = useState(false);

  const formData = {
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    region: "",
    schoolName: {
      id: "",
      schoolFacility: "",
    },
    team: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
      .required("Last Name is required"),
    region: Yup.string().required("Region is required"),
    schoolName: Yup.object({
      schoolFacility: Yup.string().required(
        "School or Facility Name is required"
      ),
    }),
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await getRegionsData();

      setRegionData(data);
    };

    fetchData();
  }, []);

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

  async function postDataHandler(data) {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/contacts`,
        data: {
          FirstName: data.firstName,
          LastName: data.lastName,
          Gender__c: data.gender,
          Grade__c: data.grade,
          Region__c: data.region,
          School_Attending__c: data.schoolName.schoolFacility,
          SchoolSiteId: data.schoolName.id,
        },
      });

      handleContact(response.data.ContactId);
      handleRegion(data.region);
      return response;
    } catch (error) {
      console.log("Post Form Submit Error : ", error);
    }
  }
  const onSumbitHandler = async (data) => {
    if (
      data.firstName &&
      data.lastName &&
      data.region &&
      data.schoolName.schoolFacility
    ) {
      postDataHandler(data).then(() => {
        handleNext();
      });
    }
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={onSumbitHandler}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
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
                      <Field
                        as={CustomTextFields}
                        id="firstName"
                        name="firstName"
                        hiddenLabel
                        fullWidth
                        variant="filled"
                        size="small"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        style={{ color: "red" }}
                      />

                      <Typographys>Last Name or Initial*</Typographys>
                      <Field
                        as={CustomTextFields}
                        id="lastName"
                        name="lastName"
                        hiddenLabel
                        fullWidth
                        variant="filled"
                        size="small"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        style={{ color: "red" }}
                      />

                      <Typographys>Gender</Typographys>
                      <CustomTextFields
                        name="gender"
                        select
                        hiddenLabel
                        fullWidth
                        variant="filled"
                        size="small"
                        value={values.gender}
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
                        value={values.grade}
                        onChange={handleChange}
                        SelectProps={{
                          displayEmpty: true,
                          renderValue: (selected) => {
                            if (selected === "") {
                              return (
                                <span style={{ opacity: 0.5 }}>
                                  Select a Grade
                                </span>
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
                        <Field
                          as={CustomTextFields}
                          name="region"
                          select
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.region}
                          onChange={async (e) => {
                            handleChange(e);
                            const { name, value } = e.target;

                            if (name === "region") {
                              await getSchoolData(value).then((data) => {
                                setSchoolData(data);
                              });
                            }
                          }}
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
                              return regionData.find(
                                (option) => option.value === selected
                              )?.label;
                            },
                          }}
                        >
                          {regionData && regionData.length > 0 ? (
                            regionData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="" disabled>
                              Loading...
                            </MenuItem>
                          )}
                        </Field>
                        <ErrorMessage
                          name="region"
                          component="div"
                          style={{ color: "red" }}
                        />

                        <Typographys>School or Facility Name*</Typographys>
                        <Field
                          as={CustomTextFields}
                          name="schoolName.schoolFacility"
                          select
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.schoolName.schoolFacility}
                          onChange={async (e) => {
                            handleChange(e);
                            const { name, value } = e.target;

                            if (name === "schoolName.schoolFacility") {
                              const matchedSchool = schoolData.find(
                                (school) => school.value === value
                              );

                              if (matchedSchool) {
                                setFieldValue(
                                  "schoolName.id",
                                  matchedSchool.id
                                );
                              }
                            }
                            if (name === "schoolName.schoolFacility") {
                              await getTeamSeasons().then((data) => {
                                const schoolSite = value;
                                const matchedTeams = data.filter(
                                  (team) => team.SchoolSite === schoolSite
                                );

                                const teamData = matchedTeams.map((team) => ({
                                  label: team.TeamName,
                                  value: team.TeamName,
                                }));

                                if (teamData.length === 0) {
                                  setIsTeamData(true);
                                  setTeamData([]);
                                } else {
                                  setIsTeamData(false);
                                  setTeamData(teamData);
                                }
                              });
                            }
                          }}
                          SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) => {
                              if (selected === "") {
                                return (
                                  <span style={{ opacity: 0.5 }}>
                                    Select a School
                                  </span>
                                );
                              }
                              return schoolData.find(
                                (option) => option.value === selected
                              )?.label;
                            },
                          }}
                        >
                          {schoolData && schoolData.length > 0 ? (
                            schoolData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="" disabled>
                              Loading...
                            </MenuItem>
                          )}
                        </Field>
                        <ErrorMessage
                          name="schoolName.schoolFacility"
                          component="div"
                          style={{ color: "red" }}
                        />

                        <Typographys>Team</Typographys>
                        <CustomTextFields
                          name="team"
                          select
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.team}
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
                              return teamData.find(
                                (option) => option.value === selected
                              )?.label;
                            },
                          }}
                        >
                          {teamData && teamData.length > 0 ? (
                            teamData.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          ) : isTeamData ? (
                            <MenuItem value="" disabled>
                              Select Another School or Region
                            </MenuItem>
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
                      <FormControlsMobile>
                        <Typographys>First Name*</Typographys>
                        <Field
                          as={CustomTextFields}
                          id="firstName"
                          name="firstName"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.firstName}
                          onChange={handleChange}
                        />{" "}
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <Typographys>Last Name or Initial*</Typographys>
                        <Field
                          as={CustomTextFields}
                          id="lastName"
                          name="lastName"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.lastName}
                          onChange={handleChange}
                        />{" "}
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <Typographys>Gender</Typographys>
                        <Box sx={{ "& > :not(style)": { m: 1 } }}>
                          {genderArray_Mobile.map((gender, index) => (
                            <Field
                              key={index}
                              name="gender"
                              gender={gender}
                              selectedGender={values.gender}
                              component={CustomFabButton}
                            />
                          ))}
                        </Box>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <Typographys>Grade</Typographys>
                        <GradeButtonContainer aria-label="Basic button group">
                          {gradeArray_Mobile.map((grade, index) => (
                            <Field
                              key={index}
                              name="grade"
                              grade={grade}
                              selectedGrade={values.grade}
                              component={CustomGradeButton}
                            />
                          ))}
                        </GradeButtonContainer>
                        <ErrorMessage
                          name="grade"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <ProgramSiteContainer>
                          <Typographys>Region*</Typographys>
                          <Field
                            as={CustomTextFields}
                            name="region"
                            select
                            hiddenLabel
                            fullWidth
                            variant="filled"
                            size="small"
                            value={values.region}
                            onChange={async (e) => {
                              handleChange(e);
                              const { name, value } = e.target;

                              if (name === "region") {
                                await getSchoolData(value).then((data) => {
                                  setSchoolData(data);
                                });
                              }
                            }}
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
                                return regionData.find(
                                  (option) => option.value === selected
                                )?.label;
                              },
                            }}
                          >
                            {regionData && regionData.length > 0 ? (
                              regionData.map((option) => (
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
                          </Field>
                          <ErrorMessage
                            name="region"
                            component="div"
                            style={{ color: "red" }}
                          />

                          <Typographys>School or Facility Name*</Typographys>
                          <Field
                            as={CustomTextFields}
                            name="schoolName.schoolFacility"
                            select
                            hiddenLabel
                            fullWidth
                            variant="filled"
                            size="small"
                            value={values.schoolName.schoolFacility}
                            onChange={async (e) => {
                              handleChange(e);
                              const { name, value } = e.target;

                              if (name === "schoolName.schoolFacility") {
                                const matchedSchool = schoolData.find(
                                  (school) => school.value === value
                                );

                                if (matchedSchool) {
                                  setFieldValue(
                                    "schoolName.id",
                                    matchedSchool.id
                                  );
                                }
                              }
                              if (name === "schoolName.schoolFacility") {
                                await getTeamSeasons().then((data) => {
                                  const schoolSite = value;
                                  const matchedTeams = data.filter(
                                    (team) => team.SchoolSite === schoolSite
                                  );

                                  const teamData = matchedTeams.map((team) => ({
                                    label: team.TeamName,
                                    value: team.TeamName,
                                  }));

                                  if (teamData.length === 0) {
                                    setIsTeamData(true);
                                    setTeamData([]);
                                  } else {
                                    setIsTeamData(false);
                                    setTeamData(teamData);
                                  }
                                });
                              }
                            }}
                            SelectProps={{
                              displayEmpty: true,
                              renderValue: (selected) => {
                                if (selected === "") {
                                  return (
                                    <span style={{ opacity: 0.5 }}>
                                      Select a School
                                    </span>
                                  );
                                }
                                return schoolData.find(
                                  (option) => option.value === selected
                                )?.label;
                              },
                            }}
                          >
                            {schoolData && schoolData.length > 0 ? (
                              schoolData.map((option) => (
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
                          </Field>
                          <ErrorMessage
                            name="schoolName.schoolFacility"
                            component="div"
                            style={{ color: "red" }}
                          />
                          <Typographys>Team</Typographys>
                          <CustomTextFields
                            name="team"
                            select
                            hiddenLabel
                            fullWidth
                            variant="filled"
                            size="small"
                            value={values.team}
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
                                return teamData.find(
                                  (option) => option.value === selected
                                )?.label;
                              },
                            }}
                          >
                            {teamData && teamData.length > 0 ? (
                              teamData.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))
                            ) : isTeamData ? (
                              <MenuItem value="" disabled>
                                Select Another School or Region
                              </MenuItem>
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
                      </FormControlsMobile>
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
                          type="submit"
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
        </Form>
      )}
    </Formik>
  );
};

export default ConnectYourStudent;
