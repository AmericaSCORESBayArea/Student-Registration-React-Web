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
import useStore from "../../store/useStore";

const EnrollmentDetailsAccordion = () => {
  const { enrolledStudents } = useStore();

  if (Object.keys(enrolledStudents).length === 0) {
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
        {Object.entries(enrolledStudents).map(([region, students]) => (
          <Accordion key={region} sx={{ width: "100%", marginBottom: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">
                Enrolled Students for {region}
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
              {students.map((student, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={3}>
                      <CustomTextField
                        fullWidth
                        variant="filled"
                        hiddenLabel
                        size="small"
                        value={student.firstName}
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
                        value={student.lastName}
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
                        value={student.schoolSiteLabel}
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
                        value={student.teamSeasonLabel}
                        InputLabelProps={{
                          readOnly: true,
                        }}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default EnrollmentDetailsAccordion;
