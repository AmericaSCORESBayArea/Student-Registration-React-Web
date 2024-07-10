import React from "react";
import {
  Container,
  Title,
  SubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { Typography, Box, TextField, Button } from "@mui/material";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { styled } from "@mui/system";
function OhNoSorryRight() {
  const TextFields = styled(TextField)({
    maxHeight: "600px",
    marginTop: "30px",
    backgroundColor: "whitesmoke",
  });
  return (
    <Container>
      <Title>Need Help?</Title>
      <SubTitle>Send us a message immediately</SubTitle>
      <TextFields
        fullWidth
        label="Your Message"
        multiline
        rows={8}
        variant="outlined"
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
    </Container>
  );
}

export default OhNoSorryRight;
