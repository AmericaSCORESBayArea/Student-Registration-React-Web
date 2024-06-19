import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, Grid, MenuItem } from "@mui/material";
import { getStudents } from "../controller/api";
import debounce from "lodash/debounce";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { CustomTextField, DropdownTextField } from "./RegisterUI";

const DataRow = React.memo(
  ({
    index,
    rowData,
    setRowData,
    region,
    schoolSitesData,
    teamSeasons,
    errors,
    handleFieldChange,
  }) => {
    const filteredTeamSeasons = useMemo(() => {
      if (!rowData.schoolSite.label) return [];
      return teamSeasons.filter((team) => {
        return team.SchoolSite === rowData.schoolSite.label;
      });
    }, [teamSeasons, rowData.schoolSite.label]);

    const [openFirstName, setOpenFirstName] = useState(false);
    const [openLastName, setOpenLastName] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [firstNameOptions, setFirstNameOptions] = useState([]);
    const [lastNameInput, setLastNameInput] = useState("");
    const [lastNameOptions, setLastNameOptions] = useState([]);
    const [loadingFirstName, setLoadingFirstName] = useState(false);
    const [loadingLastName, setLoadingLastName] = useState(false);
    const [shouldCreateNewContact, setShouldCreateNewContact] = useState(false);

    const defaultFilterOptions = createFilterOptions();

    const fetchData = useCallback(
      async (input, type) => {
        const setLoading =
          type === "firstName" ? setLoadingFirstName : setLoadingLastName;
        const setOptions =
          type === "firstName" ? setFirstNameOptions : setLastNameOptions;

        setLoading(true);
        try {
          const response = await getStudents(input);
          const filteredResponse = response.filter(
            (person) => person.Region === region
          );

          const newOptions = filteredResponse.map((person) => {
            const schoolSite = schoolSitesData.find(
              (site) => site.id === person.SchoolSiteId
            );
            const schoolSiteLabel = schoolSite
              ? schoolSite.label
              : "Unknown School";

            return {
              label: `${person.FirstName} ${person.LastName} ${schoolSiteLabel}`,
              id: person.Id,
            };
          });

          setOptions(newOptions);
        } catch (error) {
          console.error("Failed to fetch students:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      },
      [region, schoolSitesData]
    );

    const filterOptions = (options, params) => {
      const filtered = defaultFilterOptions(options, params);
      const { inputValue } = params;

      const isExisting = options.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );
      if (inputValue !== "" && !isExisting) {
        filtered.push({
          inputValue,
          label: `Add "${inputValue}"`,
          id: `add-${inputValue}`,
        });
      }

      return filtered;
    };

    const debouncedFetchFirstNameData = useMemo(
      () => debounce((input) => fetchData(input, "firstName"), 500),
      [fetchData]
    );

    const debouncedFetchLastNameData = useMemo(
      () => debounce((input) => fetchData(input, "lastName"), 500),
      [fetchData]
    );

    const handleNameSelect = (newValue, type) => {
      if (!newValue) return;

      if (newValue && newValue.inputValue) {
        const nameToAdd = newValue.inputValue;
        if (type === "firstName") {
          setFirstNameInput(nameToAdd);
          setRowData(index, "firstName", nameToAdd, "");
        } else {
          setLastNameInput(nameToAdd);
          setRowData(index, "lastName", nameToAdd, "");
        }
        setRowData(index, "schoolSite", { id: "", label: "" }, "");
        setShouldCreateNewContact(true);
      } else if (newValue.id) {
        const parts = newValue.label.split(" ");
        const firstName = parts[0];
        const lastName = parts[1];
        const schoolSiteLabel = parts.slice(2).join(" ");

        setFirstNameInput(firstName);
        setLastNameInput(lastName);

        const matchedSite = schoolSitesData.find(
          (site) => site.label === schoolSiteLabel
        );

        if (matchedSite) {
          setRowData(index, "schoolSite", {
            id: matchedSite.id,
            label: matchedSite.label,
          });
        }

        setRowData(index, "firstName", firstName, newValue.id);
        setRowData(index, "lastName", lastName, newValue.id);
        setRowData(index, "contactId", newValue.id);
        setShouldCreateNewContact(false);
      }
    };

    const handleInputChange = (field, value, isNewContact) => {
      if (isNewContact && shouldCreateNewContact) {
        handleFieldChange(index, field, value);
      } else if (typeof value === "string" && rowData[field] !== value) {
        setRowData(index, field, value, "");
      }
      setShouldCreateNewContact(false);
    };

    useEffect(() => {
      if (
        firstNameInput &&
        firstNameInput.trim().length >= 2 &&
        firstNameInput !== rowData.firstName
      ) {
        debouncedFetchFirstNameData(firstNameInput);
      } else {
        setFirstNameOptions([]);
      }
    }, [firstNameInput, debouncedFetchFirstNameData, rowData.firstName]);

    useEffect(() => {
      if (
        lastNameInput &&
        lastNameInput.trim().length >= 2 &&
        lastNameInput !== rowData.lastName
      ) {
        debouncedFetchLastNameData(lastNameInput);
      } else {
        setLastNameOptions([]);
      }
    }, [lastNameInput, debouncedFetchLastNameData, rowData.lastName]);

    useEffect(() => {
      setRowData(index, "teamSeason", { id: "", label: "" });
    }, [rowData.schoolSite, index, setRowData]);

    useEffect(() => {
      setFirstNameInput("");
      setLastNameInput("");
      setRowData(index, {
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: { id: "", label: "" },
        contactId: "",
      });
    }, [region, index, setRowData]);

    return (
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            id={`first-name-autocomplete-${index}`}
            open={openFirstName}
            onOpen={() => setOpenFirstName(true)}
            onClose={() => setOpenFirstName(false)}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id || (!value.id && !option.id)
            }
            value={
              firstNameOptions.find(
                (option) => option.label === rowData.firstName
              ) || ""
            }
            getOptionLabel={(option) => option.label || ""}
            options={firstNameOptions}
            loading={loadingFirstName}
            inputValue={firstNameInput}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                setFirstNameInput(newInputValue);
              } else if (reason === "clear") {
                setFirstNameInput("");
                setRowData(index, "firstName", "", "");
              }
            }}
            onBlur={(newValue) => {
              const inputValue = firstNameInput.trim();
              if (
                inputValue &&
                !firstNameOptions.some(
                  (option) =>
                    option.label.toLowerCase() === inputValue.toLowerCase()
                )
              ) {
                setRowData(index, "firstName", inputValue, "");
                handleNameSelect(newValue, "firstName");
                handleInputChange("firstName", inputValue, true);
              }
            }}
            onChange={(event, newValue) => {
              handleInputChange("firstName", newValue, false);
              handleNameSelect(newValue, "firstName");
            }}
            filterOptions={filterOptions}
            noOptionsText="start typing to search"
            renderInput={(params) => (
              <CustomTextField
                error={!!errors[index].firstNameError}
                helperText={errors[index].firstNameError}
                {...params}
                variant="filled"
                size="small"
                fullWidth
                placeholder="Enter First Name"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingFirstName ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  shrink: false,
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <div>
                  {option.label.split(" ").slice(0, 2).join(" ")}
                  <br />
                  <span style={{ color: "grey" }}>
                    {option.label.split(" ").slice(2).join(" ")}
                  </span>
                </div>
              </li>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            id={`last-name-autocomplete-${index}`}
            variant="filled"
            fullWidth
            size="small"
            open={openLastName}
            onOpen={() => setOpenLastName(true)}
            onClose={() => setOpenLastName(false)}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id || (!value.id && !option.id)
            }
            value={
              lastNameOptions.find(
                (option) => option.label === rowData.lastName
              ) || ""
            }
            getOptionLabel={(option) => option.label || ""}
            options={lastNameOptions}
            loading={loadingLastName}
            inputValue={lastNameInput}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") setLastNameInput(newInputValue);
              else if (reason === "clear") {
                setLastNameInput("");
                setRowData(index, "lastName", "", "");
              }
            }}
            onChange={(event, newValue) => {
              handleInputChange("lastName", newValue, false);
              handleNameSelect(newValue, "lastName");
            }}
            onBlur={(newValue) => {
              const inputValue = lastNameInput.trim();
              if (
                inputValue &&
                !lastNameOptions.some(
                  (option) =>
                    option.label.toLowerCase() === inputValue.toLowerCase()
                )
              ) {
                setRowData(index, "lastName", inputValue, "");
                handleNameSelect(newValue, "lastName");
                handleInputChange("lastName", inputValue, true);
              }
            }}
            filterOptions={filterOptions}
            noOptionsText="start typing to search"
            renderInput={(params) => (
              <CustomTextField
                error={!!errors[index].lastNameError}
                helperText={errors[index].lastNameError}
                {...params}
                variant="filled"
                size="small"
                fullWidth
                placeholder="Enter Last Name"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingLastName ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <div>
                  {option.label.split(" ").slice(0, 2).join(" ")}
                  <br />
                  <span style={{ color: "grey" }}>
                    {option.label.split(" ").slice(2).join(" ")}
                  </span>
                </div>
              </li>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DropdownTextField
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
              handleInputChange(
                "schoolSite",
                {
                  id: selectedSite.id,
                  label: selectedSite.label,
                },
                false
              );
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
          </DropdownTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <DropdownTextField
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
          </DropdownTextField>
        </Grid>
      </Grid>
    );
  }
);

export default DataRow;
