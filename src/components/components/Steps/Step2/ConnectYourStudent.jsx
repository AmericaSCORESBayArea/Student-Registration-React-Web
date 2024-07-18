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
import {
  getRegionsData,
  getSchoolData,
  getTeamSeasons,
} from "../../../controller/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SubTitle } from "../../../componentsStyle/registrationFormStyle";

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
// CustomFabButton component
const CustomFabButton = ({ field, form, gender, selectedGender }) => (
  <FabButton
    size="large"
    onClick={() => {
      form.setFieldValue(field.name, gender);
      console.log("Gender selected:", gender);
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
      console.log("Grade selected:", grade);
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
  const [regionData, setRegionData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [isTeamData, setIsTeamData] = useState(false);
  const [selectedRegionData, setSelectedRegionData] = useState(null);
  const genderArray_mob = ["Boy", "Non-Declared", "Girl"];
  const gradeArray_mob = ["3", "4", "5", "6", "7", "8"];
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    region: "",
    schoolFacility: "",
    team: "",
  });
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
      .required("Last Name is required"),
    region: Yup.string().required("Region is required"),
    schoolFacility: Yup.string().required(
      "School or Facility Name is required"
    ),
  });
  useEffect(() => {
    const fetchData = async () => {
      let data = await getRegionsData();

      setRegionData(data);
      console.log(data);
    };

    fetchData();
  }, []);

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

  const handleChanges = useCallback(
    async (e) => {
      const { name, value } = e.target;
      console.log("name :", name, value);

      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        return updatedData;
      });

      if (name === "region") {
        await getSchoolData(value).then((data) => {
          setSchoolData(data);
        });
      }

      if (name === "schoolFacility") {
        await getTeamSeasons().then((data) => {
          // console.log("Data : ", data);
          const schoolSite = value;
          const matchedTeams = data.filter(
            (team) => team.SchoolSite == schoolSite
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
    },
    [formData, isTeamData]
  );

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        console.log("Form submitted with values:", data);
        if (
          data.firstName &&
          data.lastName &&
          data.region &&
          data.schoolFacility
        ) {
          handleNext();
        }
      }}
    >
      {({ values, handleChange }) => (
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
                            console.log("First Name changed:", value);

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
                          name="schoolFacility"
                          select
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={values.schoolFacility}
                          onChange={async (e) => {
                            handleChange(e);
                            const { name, value } = e.target;
                            console.log("First Name changed:", value);

                            if (name === "schoolFacility") {
                              await getTeamSeasons().then((data) => {
                                // console.log("Data : ", data);
                                const schoolSite = value;
                                const matchedTeams = data.filter(
                                  (team) => team.SchoolSite == schoolSite
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
                          name="schoolFacility"
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
                          {genderArray_mob.map((gender, index) => (
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
                          {gradeArray_mob.map((grade, index) => (
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
                              console.log("Region changed:", value);

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
                            name="schoolFacility"
                            select
                            hiddenLabel
                            fullWidth
                            variant="filled"
                            size="small"
                            value={values.schoolFacility}
                            onChange={async (e) => {
                              handleChange(e);
                              const { name, value } = e.target;
                              console.log("School Facility changed:", value);

                              if (name === "schoolFacility") {
                                await getTeamSeasons().then((data) => {
                                  const schoolSite = value;
                                  const matchedTeams = data.filter(
                                    (team) => team.SchoolSite == schoolSite
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
                            name="schoolFacility"
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
