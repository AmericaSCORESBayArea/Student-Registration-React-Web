import React from "react";
import { Grid, MenuItem } from "@mui/material";
import { CustomTextField } from "./RegisterUI";

const DataRow = ({
  index,
  rowData,
  setRowData,
  region,
  schoolSitesData,
  teamsSeasonsData,
  errorData,
}) => (
  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
    <Grid item xs={12} sm={3}>
      <CustomTextField
        type="text"
        variant="filled"
        placeholder="First Name"
        hiddenLabel
        helperText={errorData.firstName ? "Required" : ""}
        size="small"
        fullWidth
        value={rowData.firstName}
        onChange={(e) => setRowData(index, "firstName", e.target.value)}
        disabled={!region}
        error={errorData.firstName}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <CustomTextField
        type="text"
        variant="filled"
        placeholder="Last Name"
        hiddenLabel
        helperText={errorData.lastName ? "Required" : ""}
        size="small"
        fullWidth
        value={rowData.lastName}
        onChange={(e) => setRowData(index, "lastName", e.target.value)}
        disabled={!region}
        error={errorData.lastName}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <CustomTextField
        select
        variant="filled"
        hiddenLabel
        fullWidth
        size="small"
        helperText={errorData.schoolSite ? "Required" : ""}
        value={rowData.schoolSite}
        onChange={(e) => setRowData(index, "schoolSite", e.target.value)}
        disabled={!region}
        error={errorData.schoolSite}
      >
        {schoolSitesData && schoolSitesData.length > 0 ? (
          schoolSitesData.map((option) => (
            <MenuItem key={option.value} value={option.id}>
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
        select
        fullWidth
        variant="filled"
        helperText={errorData.teamSeason ? "Required" : ""}
        hiddenLabel
        size="small"
        value={rowData.teamSeason}
        onChange={(e) => setRowData(index, "teamSeason", e.target.value)}
        disabled={!region}
        error={errorData.teamSeason}
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

export default React.memo(DataRow);
