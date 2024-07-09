import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AcceptWaiverRight from "./AcceptWaiverRight";
import { container } from "../../../componentsStyle/registrationFormStyle";

const ShareYourConcern = () => {
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
            <Typography>Accpet the Waiver</Typography>
            <div className={container}>
              <Typography>
                SCORES an the _______ School District require a guardian’s
                signature on this waiver for your student to participate. Please
                have a look and, if it’s ok, click Accept.
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button variant="contained" color="secondary">
                  Accpet
                </Button>
                <Button variant="contained" color="primary">
                  I Need To Think About It
                </Button>
              </Box>
            </div>
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
            {/* <Typography variant="h6">Right</Typography> */}
            <AcceptWaiverRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default ShareYourConcern;
