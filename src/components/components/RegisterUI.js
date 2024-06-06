import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import DataRow from "./DataRow";

export const CustomTextField = styled(TextField)({
  backgroundColor: "transparent",
  "& .MuiFilledInput-input": {
    backgroundColor: "transparent",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&.Mui-focused": {
      border: "0.5px solid #ccc",
      backgroundColor: "transparent",
      borderColor: "#ccc",
      boxShadow: "0 0 0 2px #ccc",
    },
  },
});

const RegisterUI = React.memo(
  ({
    rows,
    region,
    regionsData,
    schoolSitesData,
    teamsSeasonsData,
    onRegionChange,
    onInputChange,
    onAddRow,
    onReset,
    onSubmit,
    errors,
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: 3,
          backgroundColor: "#f8f5f4",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
        >
          <Grid item xs={12} md={3} sm={12}>
            <Typography variant="h4">Select a region</Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <CustomTextField
              select
              hiddenLabel
              fullWidth
              variant="filled"
              label={regionsData ? "" : "Select Region"}
              size="small"
              value={region}
              onChange={onRegionChange}
              sx={{ marginBottom: 2 }}
            >
              {regionsData &&
                regionsData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </CustomTextField>
          </Grid>
        </Grid>
        {region && (
          <>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item xs={12} sm={3} md={3} lg={3} />
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                  Students Details
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                sx={{
                  textAlign: "right",
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                  paddingBlock: 1,
                }}
              >
                <Button onClick={onReset} variant="outlined">
                  Cancel
                </Button>
                <Button onClick={onSubmit} variant="contained">
                  Assign
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">
                  First Name
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">
                  Last Name
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">
                  School/Site
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1">
                  Team-Season
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              </Grid>
            </Grid>
            {rows.map((row, index) => (
              <DataRow
                key={index}
                index={index}
                rowData={row}
                setRowData={onInputChange}
                region={region}
                schoolSitesData={schoolSitesData}
                teamsSeasonsData={teamsSeasonsData}
                errors={errors}
              />
            ))}
            <Grid container item>
              <Button
                onClick={onAddRow}
                variant="outlined"
                sx={{
                  width: "100%",
                  borderColor: "#e1e1d4",
                  height: "100%",
                  backgroundColor: "#e1e1d4",
                  display: "flex",
                  borderRadius: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "black",
                }}
              >
                + Add Row
              </Button>
            </Grid>
          </>
        )}
      </Box>
    );
  }
);

export default RegisterUI;
