import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AcceptWaiverRight from "./AcceptWaiverRight";
import {
  Container,
  SubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  marginLeft: "5px",
});
const ShareYourConcern = ({ handleNext, handleBack }) => {
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
            {/* <Title>Accpet the Waiver</Title> */}
            <Container>
              <SubTitle>
                SCORES an the _______ School District require a guardian’s
                signature on this waiver for your student to participate. Please
                have a look and, if it’s ok, click Accept.
              </SubTitle>

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
                  I Need To Think About It
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
              // backgroundColor: "blue",
              "@media (max-width: 600px)": {
                display: showRight ? "flex" : "none",
              },
            }}
          >
            <AcceptWaiverRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default ShareYourConcern;
