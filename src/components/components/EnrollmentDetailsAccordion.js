import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { CustomTextField } from "./RegisterUI";
import useStore from "../../store/useStore";

const EnrollmentDetailsAccordion = () => {
  const { enrolledStudents } = useStore();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
              <Typography
                variant={!isMobile ? "h5" : "h6"}
                sx={{
                  fontWeight: !isMobile ? "bold" : "normal",
                  fontSize: !isMobile ? "1.1rem" : "0.9rem",
                }}
              >
                Students Enrolled by me for {region}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!isMobile && (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    textAlign: "left",
                  }}
                >
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
              )}

              {students.map((student, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={3}>
                      {isMobile && (
                        <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
                          <Typography variant="subtitle1">
                            First Name
                          </Typography>
                        </Grid>
                      )}
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
                      {isMobile && (
                        <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
                          <Typography variant="subtitle1">Last Name</Typography>
                        </Grid>
                      )}
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
                      {isMobile && (
                        <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
                          <Typography variant="subtitle1">
                            School/Site
                          </Typography>
                        </Grid>
                      )}
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
                      {isMobile && (
                        <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
                          <Typography variant="subtitle1">
                            Team-Season
                          </Typography>
                        </Grid>
                      )}
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
                  {isMobile && (
                    <Box
                      sx={{
                        width: "100%",
                        marginY: 2,
                        borderBottom: "2px solid #ccc",
                      }}
                    />
                  )}
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
