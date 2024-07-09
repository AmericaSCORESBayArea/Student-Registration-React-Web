import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import ShareYourConcernRight from "./ShareYourConcernRight";
import {
  container,
  subTitle,
  textFieldStyle,
  title,
} from "../../../componentsStyle/registrationFormStyle";

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
            <Typography>Share Your Concerns and Goals</Typography>

            <div className={container}>
              <h1 className={title}>Student Needs</h1>
              <Typography className={subTitle}>
                Tell us if you student has allergies or any other needs weh
                should be aware of
              </Typography>
              <TextField
                fullWidth
                label="Your Message"
                multiline
                rows={8}
                variant="outlined"
                className={textFieldStyle}
              />
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Button variant="contained" color="secondary">
                  Back
                </Button>
                <Button variant="contained" color="primary">
                  Send
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
            <ShareYourConcernRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default ShareYourConcern;
