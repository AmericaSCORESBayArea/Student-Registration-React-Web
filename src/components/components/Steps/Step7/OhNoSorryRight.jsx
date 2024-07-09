import React from "react";
import {
  container,
  title,
  subTitle,
  textFieldStyle,
} from "../../../componentsStyle/registrationFormStyle";
import { Typography, Box, TextField, Button } from "@mui/material";

import "@egjs/react-flicking/dist/flicking-inline.css";
function OhNoSorryRight() {
  return (
    <div className={container}>
      <h1 className={title}>Need Help?</h1>
      <Typography className={subTitle}>
        Send us a message immediately
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
  );
}

export default OhNoSorryRight;
