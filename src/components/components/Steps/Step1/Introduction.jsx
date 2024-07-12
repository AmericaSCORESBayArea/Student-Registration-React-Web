import React, { useState } from "react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import IntroductionRight from "./IntroductionRight";
import { styled } from "@mui/system";
const TypographyContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  padding: "10px",
  maxWidth: "700px",
  width: "100%",
  height: "400px",
});
const Typographys = styled(Typography)({
  fontWeight: "bold",
  fontSize: "22px",
  textAlign: "left",
});
const CustomButton = styled(Button)({
  marginLeft: "5px",
});
const Introduction = ({ handleNext, handleBack }) => {
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
              // backgroundColor: "red",
              "@media (max-width: 600px)": {
                display: showRight ? "none" : "flex",
              },
            }}
          >
            <TypographyContainer>
              <Typographys>
                Completing this form will enable your student to become a SCORES
                player, poet, and take part in our game days and activites.
              </Typographys>
              <Typographys>
                You need to be an adult guardian to accept the waiver at the
                end.
              </Typographys>
              <Typographys>
                Use a mobile phone number to get started and this will enable
                you to access these records in the future.
              </Typographys>

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
            </TypographyContainer>
          </Box>
        </Col>
        <Col xs={12} md={12} lg={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              // backgroundColor: "blue",
              "@media (max-width: 600px)": {
                display: showRight ? "flex" : "none",
              },
            }}
          >
            {/* <Typography variant="h6">Right Section</Typography> */}
            <IntroductionRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default Introduction;
