import React, { useMemo } from "react";
import { Grid, MenuItem } from "@mui/material";
import { CustomTextField } from "./RegisterUI";

const DataRow = React.memo(
  ({
    index,
    rowData,
    setRowData,
    region,
    schoolSitesData,
    teamSeasons,
    errors,
  }) => {
    const filteredTeamSeasons = useMemo(() => {
      if (!rowData.schoolSite.label) return [];
      return teamSeasons.filter((team) => {
        return team.SchoolSite === rowData.schoolSite.label;
      });
    }, [teamSeasons, rowData.schoolSite.label]);

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
            value={rowData.schoolSite.id}
            onChange={(e) => {
              const selectedSite = schoolSitesData.find(
                (option) => option.id === e.target.value
              );
              setRowData(index, "schoolSite", {
                id: selectedSite.id,
                label: selectedSite.label,
              });
            }}
            disabled={!region}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected || selected === "" || !rowData.schoolSite.label) {
                  return (
                    <span style={{ opacity: 0.5 }}>Select a School/Site</span>
                  );
                }
                return rowData.schoolSite.label;
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
            value={rowData.teamSeason.id}
            onChange={(e) => {
              const selectedTeamSeason = filteredTeamSeasons.find(
                (option) => option.TeamSeasonId === e.target.value
              );
              setRowData(index, "teamSeason", {
                id: selectedTeamSeason.TeamSeasonId,
                label: selectedTeamSeason.TeamSeasonName,
              });
            }}
            disabled={!region || !filteredTeamSeasons.length}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) =>
                !selected ? (
                  <span style={{ opacity: 0.5 }}>Select Team Season</span>
                ) : (
                  rowData.teamSeason.label
                ),
            }}
          >
            {filteredTeamSeasons.map((option) => (
              <MenuItem key={option.TeamSeasonId} value={option.TeamSeasonId}>
                {option.TeamSeasonName}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    );
  }
);

export default DataRow;
