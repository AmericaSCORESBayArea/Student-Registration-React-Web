import React, { useState } from "react";
import { Box, Button, FormControl, MenuItem, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { relationshipArray } from "../../multiplesArray";
import SafetyConcernRight from "./SafetyConcernRight";
import { CustomTextField } from "../../RegisterUI";
import { styled } from "@mui/system";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const FormControls = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  height: "100%",
  paddingInline: "1%",
  maxHeight: "57vh",
  overflowY: "scroll",
});

const Typographys = styled(Typography)({
  textAlign: "left",
  paddingBottom: "5px",
  width: "100%",
});
const CustomTextFields = styled(CustomTextField)({
  backgroundColor: "white",
  borderRadius: 10,
});
const CustomButton = styled(Button)({
  marginLeft: "5px",
});

const SafetyConcern = ({ handleNext, handleBack, contactId }) => {
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const formData = {
    parentGuardianFirstName: "",
    parentGuardianLastName: "",
    parentGuardianEmail: "",
    relationshipToChild: "",
    parentGuardianPhone1: "",
    parentGuardianPhone2: "",
  };

  const validationSchema = Yup.object({
    parentGuardianFirstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
      .required("Parent/Guardian First Name is required"),
    parentGuardianLastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
      .required("Parent/Guardian Last Name is required"),
    parentGuardianEmail: Yup.string().matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    ),
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

  async function postDataHandler(data) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_BASEURL}/contacts/${contactId}`,
        data: {
          ParentFName: data.parentGuardianFirstName,
          ParentLName: data.parentGuardianLastName,
          Relationship: data.relationshipToChild,
          ParentEmail: data.parentGuardianEmail,
          ParentPhone1: data.parentGuardianPhone1,
          ParentPhone2: data.parentGuardianPhone2,
        },
      });

      return response;
    } catch (error) {
      console.log("Post Form Submit Error : ", error);
    }
  }
  const onSumbitHandler = async (data) => {
    if (data.parentGuardianFirstName && data.parentGuardianLastName) {
      postDataHandler(data).then((data) => {
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
      {({ values, handleChange }) => (
        <Form>
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
                    />
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
                    />
                    <ErrorMessage
                      name="parentGuardianLastName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Typographys>Parent/Guardian Email</Typographys>
                    <Field
                      as={CustomTextFields}
                      name="parentGuardianEmail"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianEmail}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="parentGuardianEmail"
                      component="div"
                      style={{ color: "red" }}
                    />
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
                    />
                    <Typographys>Parent/Guardian Phone 2</Typographys>
                    <CustomTextFields
                      name="parentGuardianPhone2"
                      hiddenLabel
                      fullWidth
                      variant="filled"
                      size="small"
                      value={values.parentGuardianPhone2}
                      onChange={handleChange}
                    />
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
                  <SafetyConcernRight />
                </Box>
              </Col>
            </Row>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SafetyConcern;
