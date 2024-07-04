import React from "react";
import { Box, Typography } from "@mui/material";

const OhNoSorry = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography>Oh no! Sorry!</Typography>
    </Box>
  );
};

export default OhNoSorry;
