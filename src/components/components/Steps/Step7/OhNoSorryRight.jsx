import React, { memo } from "react";
import {
  Container,
  Title,
  SubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
const TextFields = styled(TextField)({
  maxHeight: "600px",
  marginTop: "30px",
  backgroundColor: "whitesmoke",
});
const OhNoSorryRight = memo(() => {
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
});

export default OhNoSorryRight;
