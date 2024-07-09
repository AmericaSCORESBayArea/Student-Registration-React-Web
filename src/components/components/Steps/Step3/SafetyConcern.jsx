import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";

import CustomTextField from "../../field/TextField";
import CustomSelectField from "../../field/CustomSelectField";
import { relationshipArray } from "../../multiplesArray";
import SafetyConcernRight from "./SafetyConcernRight";

const initialValues = {
  parentGuardianFirstName: "",
  parentGuardianLastName: "",
  parentGuardianEmail: "",
  relationshipToChild: "",
  parentGuardianPhone1: "",
  parentGuardianPhone2: "",
};

const relationshipOptions = relationshipArray.map(
  (relationship) => relationship.value
);

const SafetyConcern = () => {
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

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
      <form>
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
                fieldName="parentGuardianFirstName"
                label="Parent/Guardian First Name*"
                value={formData.parentGuardianFirstName}
                onChange={handleChange}
              />
              <CustomTextField
                fieldName="parentGuardianLastName"
                label="Parent/Guardian Last Name*"
                value={formData.parentGuardianLastName}
                onChange={handleChange}
              />

              <CustomTextField
                fieldName="parentGuardianEmail"
                label="Parent/Guardian Email"
                value={formData.parentGuardianEmail}
                onChange={handleChange}
              />
              <CustomSelectField
                fieldName="relationshipToChild"
                label="Relationship to Child*"
                options={relationshipOptions}
                value={formData.relationshipToChild}
                onChange={handleChange}
              />
              <CustomTextField
                fieldName="parentGuardianPhone1"
                label="Parent/Guardian Phone 1"
                value={formData.parentGuardianPhone1}
                onChange={handleChange}
              />
              <CustomTextField
                fieldName="parentGuardianPhone2"
                label="Parent/Guardian Phone 2"
                value={formData.parentGuardianPhone2}
                onChange={handleChange}
              />
              <button onClick={handlerNavigation}>Submit</button>
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
              <SafetyConcernRight />
            </Box>
          </Col>
        </Row>
      </form>
    </Box>
  );
};

export default SafetyConcern;
