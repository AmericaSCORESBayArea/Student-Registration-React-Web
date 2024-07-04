import React from "react";
import { Box, Typography } from "@mui/material";

const SafetyConcern = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography>Safety is Our Top Concern</Typography>
    </Box>
  );
};

export default SafetyConcern;
