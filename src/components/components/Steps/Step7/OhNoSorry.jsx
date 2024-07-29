import React, { useState } from "react";
import { Box } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import OhNoSorryRight from "./OhNoSorryRight";
import { Title } from "../../../componentsStyle/registrationFormStyle";

const OhNoSorry = () => {
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
              alignItems: "flex-start",
              height: "100%",
              marginLeft: "20px",
              "@media (max-width: 600px)": {
                display: showRight ? "none" : "flex",
              },
            }}
          >
            <Title>Oh no! Sorry!</Title>
            <Title>Let us help you.</Title>
            <Title>Please choose one of the following options...</Title>
            <Title>I’d like to start over</Title>
            <Title>Send a message to my SCORES Coach</Title>
            <Title>I’d like my SCORES Coach to contact me</Title>
            <Title>I’d like a SCORES Program Manager to contact me</Title>
            <Title>I need help with translation</Title>
            <Title>I don’t have all the information required</Title>
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
            <OhNoSorryRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default OhNoSorry;
