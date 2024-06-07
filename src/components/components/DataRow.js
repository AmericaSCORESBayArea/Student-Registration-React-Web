import React from "react";
import { Grid, MenuItem } from "@mui/material";
import { CustomTextField } from "./RegisterUI";

const DataRow = React.memo(
  ({
    index,
    rowData,
    setRowData,
    region,
    schoolSitesData,
    teamsSeasonsData,
    errors,
  }) => {
    return (
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            error={!!errors[index].firstNameError}
            helperText={errors[index].firstNameError}
            type="text"
            variant="filled"
            placeholder="First Name"
            hiddenLabel
            size="small"
            fullWidth
            value={rowData.firstName}
            onChange={(e) => setRowData(index, "firstName", e.target.value)}
            disabled={!region}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            error={!!errors[index].lastNameError}
            helperText={errors[index].lastNameError}
            type="text"
            variant="filled"
            placeholder="Last Name"
            hiddenLabel
            size="small"
            fullWidth
            value={rowData.lastName}
            onChange={(e) => setRowData(index, "lastName", e.target.value)}
            disabled={!region}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            error={!!errors[index].schoolSiteError}
            helperText={errors[index].schoolSiteError}
            select
            variant="filled"
            hiddenLabel
            fullWidth
            size="small"
            value={rowData.schoolSite}
            onChange={(e) => setRowData(index, "schoolSite", e.target.value)}
            disabled={!region}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (selected === "") {
                  return (
                    <span style={{ opacity: 0.5 }}>Select a School/Site</span>
                  );
                }
                return schoolSitesData.find((option) => option.id === selected)
                  ?.label;
              },
            }}
          >
            {schoolSitesData && schoolSitesData.length > 0 ? (
              schoolSitesData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No schools found</MenuItem>
            )}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            error={!!errors[index].teamSeasonError}
            helperText={errors[index].teamSeasonError}
            select
            fullWidth
            variant="filled"
            hiddenLabel
            size="small"
            value={rowData.teamSeason}
            onChange={(e) => setRowData(index, "teamSeason", e.target.value)}
            disabled={!region}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (selected === "") {
                  return (
                    <span style={{ opacity: 0.5 }}>Select Team Season</span>
                  );
                }
                return teamsSeasonsData.find(
                  (option) => option.TeamSeasonId === selected
                )?.TeamSeasonName;
              },
            }}
          >
            {teamsSeasonsData && teamsSeasonsData.length > 0 ? (
              teamsSeasonsData.map((option) => (
                <MenuItem key={option.TeamSeasonId} value={option.TeamSeasonId}>
                  {option.TeamSeasonName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No teams found</MenuItem>
            )}
          </CustomTextField>
        </Grid>
      </Grid>
    );
  }
);

export default DataRow;
