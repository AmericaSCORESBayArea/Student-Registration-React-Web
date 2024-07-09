import React, { useState } from "react";
import { Box, FormControl, MenuItem, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import ConnectYourStudentRight from "./ConnectYourStudentRight";

import { programSiteContainer } from "../../../componentsStyle/registrationFormStyle";
import {
  genderArray,
  gradesArray,
  regionsArray,
  schoolsName,
  TeamArray,
} from "../../multiplesArray";
import { CustomTextField } from "../../RegisterUI";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    flexDirection: "column",
    borderColor: "gray",
    width: "100%",
    marginTop: 5,
  },
  label: {
    textAlign: "left",
    paddingBottom: "5px",
    width: "100%",
  },
  textFieldContainer: {
    backgroundColor: "white",
  },
}));
const ConnectYourStudent = () => {
  const classes = useStyles();

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
            <Typography>Help Us Connect Your Student</Typography>
            <FormControl className={classes.formControl}>
              <Typography className={classes.label}>First Name*</Typography>
              <CustomTextField
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.firstName}
                onChange={handleChange}
                className={classes.textFieldContainer}
              ></CustomTextField>
              <Typography className={classes.label}>
                Last Name or inital*
              </Typography>

              <CustomTextField
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.lastName}
                onChange={handleChange}
                className={classes.textFieldContainer}
              ></CustomTextField>
              <Typography className={classes.label}>Gender</Typography>
              <CustomTextField
                select
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.gender}
                onChange={handleChange}
                className={classes.textFieldContainer}
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
              </CustomTextField>
              <Typography className={classes.label}>Grade</Typography>
              <CustomTextField
                select
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.grade}
                onChange={handleChange}
                className={classes.textFieldContainer}
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
              </CustomTextField>
              <div className={programSiteContainer}>
                <Typography className={classes.label}>Region*</Typography>
                <CustomTextField
                  select
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  value={formData.region}
                  onChange={handleChange}
                  className={classes.textFieldContainer}
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
                </CustomTextField>
                <Typography className={classes.label}>
                  School or Facility Name*
                </Typography>
                <CustomTextField
                  select
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  value={formData.team}
                  onChange={handleChange}
                  className={classes.textFieldContainer}
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
                </CustomTextField>
                <Typography className={classes.label}>Team</Typography>
                <CustomTextField
                  select
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  value={formData.team}
                  onChange={handleChange}
                  className={classes.textFieldContainer}
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
                </CustomTextField>
              </div>
            </FormControl>
            <button onClick={handlerNavigation}>press</button>
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
            <Typography variant="h6">Right Section</Typography>
            <ConnectYourStudentRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default ConnectYourStudent;
