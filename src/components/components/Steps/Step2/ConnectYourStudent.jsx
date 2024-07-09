import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import ConnectYourStudentRight from "./ConnectYourStudentRight";

import CustomTextField from "../../field/TextField";
import CustomSelectField from "../../field/CustomSelectField";
import {
  programSiteContainer,
  step2LeftContainer,
} from "../../../componentsStyle/registrationFormStyle";
import {
  genderArray,
  gradesArray,
  regionsArray,
  schoolsName,
  TeamArray,
} from "../../multiplesArray";

const ConnectYourStudent = () => {
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

  const regionOptions = regionsArray.map((region) => region.value);
  const teamOptions = TeamArray.map((team) => team.value);

  const schoolFacilityOptions = Object.entries(schoolsName).reduce(
    (acc, [region, data]) => {
      const schoolValues = data.schools.map((school) => school.value);
      acc[region] = schoolValues;
      return acc;
    },
    {}
  );

  const genderOptions = genderArray.map((gender) => gender.value);
  const gradeOptions = gradesArray.map((grades) => grades.value);
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
            <CustomTextField
              fieldName="firstName"
              label="First Name*"
              value={formData.firstName}
              onChange={handleChange}
            />
            <CustomTextField
              fieldName="lastName"
              label="Last Name or Initial"
              value={formData.lastName}
              onChange={handleChange}
            />
            <CustomSelectField
              fieldName="gender"
              label="Gender"
              options={genderOptions}
              value={formData.gender}
              onChange={handleChange}
            />
            <CustomSelectField
              fieldName="grade"
              label="Grade"
              options={gradeOptions}
              value={formData.grade}
              onChange={handleChange}
            />
            <div className={programSiteContainer}>
              <CustomSelectField
                fieldName="region"
                label="Region*"
                options={regionOptions}
                value={formData.region}
                onChange={handleChange}
              />
              <CustomSelectField
                fieldName="schoolFacility"
                label="School or Facility Name*"
                options={schoolFacilityOptions[formData.region] || []}
                value={formData.schoolFacility}
                onChange={handleChange}
              />
              <CustomSelectField
                fieldName="team"
                label="Team"
                options={teamOptions}
                value={formData.team}
                onChange={handleChange}
              />
            </div>
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
