import React, { useState } from "react";
import { Box, Button, FormControl, MenuItem, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import { relationshipArray } from "../../multiplesArray";
import SafetyConcernRight from "./SafetyConcernRight";
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
const CustomButton = styled(Button)({
  marginLeft: "5px",
});

const SafetyConcern = ({ handleNext, handleBack }) => {
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
              <CustomTextFields
                name="parentGuardianFirstName"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianFirstName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Last Name*</Typographys>
              <CustomTextFields
                name="parentGuardianLastName"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianLastName}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Email</Typographys>
              <CustomTextFields
                name="parentGuardianEmail"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianEmail}
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
                name="parentGuardianPhone1"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianPhone1}
                onChange={handleChange}
              ></CustomTextFields>
              <Typographys>Parent/Guardian Phone 2</Typographys>
              <CustomTextFields
                name="parentGuardianPhone2"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={formData.parentGuardianPhone2}
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
            <SafetyConcernRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default SafetyConcern;
