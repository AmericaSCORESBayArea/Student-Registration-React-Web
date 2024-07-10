import React, { useState } from "react";
import { Box, FormControl, MenuItem, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import { relationshipArray } from "../../multiplesArray";
import SafetyConcernRight from "./SafetyConcernRight";
import { CustomTextField } from "../../RegisterUI";
import { styled } from "@mui/system";

const SafetyConcern = () => {
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
            <FormControls>
              <Typographys>Parent/Guardian First Name*</Typographys>
              <CustomTextFields
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianFirstName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Last Name*</Typographys>
              <CustomTextFields
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianLastName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Email</Typographys>
              <CustomTextFields
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianEmail}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Relationship to Child*</Typographys>
              <CustomTextFields
                select
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.relationshipToChild}
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
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianPhone1}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Phone 2</Typographys>
              <CustomTextFields
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianPhone2}
                onChange={handleChange}
              ></CustomTextFields>
            </FormControls>

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
    </Box>
  );
};

export default SafetyConcern;
