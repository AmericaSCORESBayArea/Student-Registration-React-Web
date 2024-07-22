import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import {
  Container,
  Title,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";
import ShareYourConcernRight from "./ShareYourConcernRight";
import { Formik, Form } from "formik";

import axios from "axios";

const FormControls = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  borderColor: "gray",
  width: "100%",
  marginTop: 5,
  height: "54vh",
  overflowY: "scroll",
});

const SubTitle = styled("p")({
  fontSize: "18px",
});

const TextFields = styled(TextField)({
  maxHeight: "600px",
  backgroundColor: "white",
});

const CustomButton = styled(Button)({
  marginTop: "30px",
  marginLeft: "5px",
});

const BoxContainer = styled("div")({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  backgroundColor: "#FFFADF",
  padding: "10px",
  borderRadius: "20px",
});

const ShareYourConcern = ({ handleNext, handleBack, contactId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [formData, setFormData] = useState({
    allergies: "",
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
          Allergies: data.allergies,
        },
      });

      return response;
    } catch (error) {
      console.log("Post Form Submit Error : ", error);
    }
  }
  const onSumbitHandler = async (data) => {
    postDataHandler(data).then((data) => {
      handleNext();
    });
  };
  return (
    <Formik initialValues={formData} onSubmit={onSumbitHandler}>
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
                      "@media (max-width: 600px)": {
                        display: showRight ? "none" : "flex",
                      },
                    }}
                  >
                    <Container
                      width="70%"
                      marginRight="25%"
                      sx={{
                        "@media (max-width: 600px)": {
                          width: "100%",
                          marginRight: "0",
                        },
                      }}
                    >
                      <Title textAlign="center">Student Needs</Title>
                      <SubTitle>
                        Tell us if your student has allergies or any other needs
                        we should be aware of
                      </SubTitle>
                      <TextFields
                        name="allergies"
                        label="Your Message"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={values.allergies}
                        onChange={handleChange}
                      />
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          width: "80%",
                          marginLeft: "20%",
                          "@media (max-width: 600px)": {
                            width: "100%",
                            marginLeft: "0",
                          },
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
                    </Container>
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
                    <ShareYourConcernRight />
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
                        <Title textAlign="center">Student Needs</Title>
                        <SubTitle>
                          Tell us if your student has allergies or any other
                          needs we should be aware of
                        </SubTitle>
                        <TextFields
                          label="Your Message"
                          multiline
                          rows={6}
                          variant="outlined"
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                        />
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

export default ShareYourConcern;
