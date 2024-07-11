import React, { useState } from "react";
import { Box, Button, FormControl, MenuItem, Typography } from "@mui/material";
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

const ConnectYourStudent = () => {
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
  });
  const ProgramSiteContainer = styled("div")({
    display: "flex",
    /* align-items: center, */
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
    // border: "1px solid green",
  });

  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    region: "",
    schoolFacility: "",
    team: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlerNavigation = () => {
    console.log("form data : ", formData);
  };

  return (
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
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.firstName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Last Name or inital*</Typographys>

              <CustomTextFields
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.lastName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Gender</Typographys>
              <CustomTextFields
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
                        <span style={{ opacity: 0.5 }}>Select a Gender</span>
                      );
                    }
                    return genderArray.find(
                      (option) => option.value === selected
                    )?.label;
                  },
                }}
              >
                {genderArray &&
                  genderArray.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </CustomTextFields>
              <Typographys>Grade</Typographys>
              <CustomTextFields
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
                {gradesArray &&
                  gradesArray.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </CustomTextFields>
              <ProgramSiteContainer>
                <Typographys>Region*</Typographys>
                <CustomTextFields
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
                          <span style={{ opacity: 0.5 }}>Select a Region</span>
                        );
                      }
                      return regionsArray.find(
                        (option) => option.value === selected
                      )?.label;
                    },
                  }}
                >
                  {regionsArray &&
                    regionsArray.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </CustomTextFields>
                <Typographys>School or Facility Name*</Typographys>
                <CustomTextFields
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
                          <span style={{ opacity: 0.5 }}>Select a Team</span>
                        );
                      }
                      return TeamArray.find(
                        (option) => option.value === selected
                      )?.label;
                    },
                  }}
                >
                  {TeamArray &&
                    TeamArray.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </CustomTextFields>
                <Typographys>Team</Typographys>
                <CustomTextFields
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
                          <span style={{ opacity: 0.5 }}>Select a Team</span>
                        );
                      }
                      return TeamArray.find(
                        (option) => option.value === selected
                      )?.label;
                    },
                  }}
                >
                  {TeamArray &&
                    TeamArray.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </CustomTextFields>
              </ProgramSiteContainer>
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
              <CustomButton variant="contained" color="secondary">
                Back
              </CustomButton>
              <CustomButton variant="contained" color="primary">
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
  );
};

export default ConnectYourStudent;
