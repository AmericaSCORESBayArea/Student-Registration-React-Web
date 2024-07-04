import React from "react";
import { Box, Typography } from "@mui/material";

const AcceptWaiver = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography>Accept the Waiver</Typography>
    </Box>
  );
};

export default AcceptWaiver;
