import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
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
              width: "100%",
              "@media (max-width: 600px)": {
                display: showRight ? "none" : "flex",
              },
            }}
          >
            <SubTitle>There’s a great school year ahead with SCORES!</SubTitle>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              {loading ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                "Finish"
              )}
            </CustomButton>
          </Box>
        </Col>
        <Col xs={12} md={12} lg={5}>
          <Box
            sx={{
              marginTop: "60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
