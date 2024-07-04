import React from "react";
import { Box, Typography } from "@mui/material";

const AllDone = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography>All Done! Thanks!</Typography>
    </Box>
  );
};

export default AllDone;
