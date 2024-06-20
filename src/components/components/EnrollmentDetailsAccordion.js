import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { CustomTextField } from "./RegisterUI";

const EnrollmentDetailsAccordion = ({ enrollmentResults }) => {
  if (enrollmentResults.length === 0) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          borderRadius: 3,
          padding: 4,
          backgroundColor: "#f8f5f4",
        }}
      >
        <Accordion defaultExpanded sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">
              Enrolled Students for region{" "}
              {enrollmentResults.length > 0
                ? enrollmentResults[0].region
                : "N/A"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">First Name</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">Last Name</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">School/Site</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">Team-Season</Typography>
              </Grid>
            </Grid>
            {enrollmentResults.map((result, index) => (
              <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    size="small"
                    value={result.firstName}
                    InputLabelProps={{
                      readOnly: true,
                    }}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    size="small"
                    value={result.lastName}
                    InputLabelProps={{
                      readOnly: true,
                    }}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    size="small"
                    value={result.schoolSiteLabel}
                    InputLabelProps={{
                      readOnly: true,
                    }}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    variant="filled"
                    hiddenLabel
                    size="small"
                    value={result.teamSeasonLabel}
                    InputLabelProps={{
                      readOnly: true,
                    }}
                    disabled={true}
                  />
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default EnrollmentDetailsAccordion;
