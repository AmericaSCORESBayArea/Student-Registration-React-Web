import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AllDoneRight from "./AllDoneRight";
import { styled } from "@mui/system";
import { SubTitle } from "../../../componentsStyle/registrationFormStyle";
import axios from "axios";
const CustomButton = styled(Button)({
  marginTop: "30px",
  marginLeft: "5px",
});
const AllDone = ({ handleNext, handleBack, contactId, waiverId }) => {
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

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().split(".")[0] + "Z";
  };
  async function postDataHandler() {
    try {
      const currentDateTime = getCurrentDateTime();
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/contacts/${contactId}/finishRegistration`,
        data: {
          datetime: currentDateTime,
          waiverResponse: "Acceptance",
          waiverId: waiverId,
        },
      });

      return response;
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const submitHandler = async () => {
    postDataHandler().then(() => {});
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
            <SubTitle>There’s a great school year ahead with SCORES!</SubTitle>
          </Box>
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
              onClick={submitHandler}
            >
              Finish
            </CustomButton>
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
            <AllDoneRight />
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default AllDone;
