import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AcceptWaiverRight from "./AcceptWaiverRight";
import {
  Container,
  SubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";
import axios from "axios";

const CustomButton = styled(Button)({
  marginLeft: "5px",
});

const CustomDialog = styled(Dialog)({
  border: "1px solid red",
});
const CustomDialogActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
});
const CustomDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "red",
});

const AcceptWaiver = ({
  handleNext,
  handleBack,
  contactId,
  region,
  handleWaiver,
}) => {
  const [showRight, setShowRight] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  async function getDataHandler() {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}/waiver?region=${region}`,
      });

      handleWaiver(response.data[0].WaiverId);
      return response;
    } catch (error) {}
  }

  const submitHandler = () => {
    setOpenModal(true);
  };

  const handleAccept = () => {
    setOpenModal(false);
    getDataHandler().then(() => {
      handleNext();
    });
  };

  const handleDecline = () => {
    setOpenModal(false);
  };
  const withoutSubmitHandler = () => {
    handleNext();
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
              "@media (max-width: 600px)": {
                display: showRight ? "none" : "flex",
              },
            }}
          >
            <Container>
              <SubTitle>
                SCORES and the _______ School District require a guardian’s
                signature on this waiver for your student to participate. Please
                have a look and, if it’s ok, click Accept.
              </SubTitle>

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
                  onClick={submitHandler}
                >
                  Accept
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={withoutSubmitHandler}
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
              "@media (max-width: 600px)": {
                display: showRight ? "flex" : "none",
              },
            }}
          >
            <AcceptWaiverRight />
          </Box>
        </Col>
      </Row>

      <CustomDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="waiver-dialog-title"
        aria-describedby="waiver-dialog-description"
      >
        <CustomDialogTitle id="waiver-dialog-title">
          ARE YOU SURE?
        </CustomDialogTitle>
        <DialogContent>
          <Typography id="waiver-dialog-description" variant="body1">
            School districts require that we collect this waiver for your
            student’s safety. This information remains confidential. Without
            this, your student may not be allowed to participate.
          </Typography>
        </DialogContent>
        <CustomDialogActions>
          <CustomButton
            onClick={handleAccept}
            variant="contained"
            color="primary"
          >
            Accept
          </CustomButton>
          <CustomButton
            onClick={handleDecline}
            variant="contained"
            color="secondary"
          >
            Decline
          </CustomButton>
        </CustomDialogActions>
      </CustomDialog>
    </Box>
  );
};

export default AcceptWaiver;
