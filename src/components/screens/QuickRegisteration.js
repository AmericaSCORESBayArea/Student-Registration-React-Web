import React, { useState, useCallback, useEffect, useMemo } from "react";
import RegisterUI from "../components/RegisterUI";
import {
  getRegionsData,
  getSchoolData,
  getTeamSeasons,
  postContact,
  postEnrollment,
} from "../controller/api";
import { Box, Typography } from "@mui/material";
import Loader from "../utils/Loader";

const QuickRegisteration = () => {
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingTeamSeasons, setLoadingTeamSeasons] = useState(false);
  const [regionsData, setRegionsData] = useState([]);
  const [schoolSitesData, setSchoolSitesData] = useState([]);
  const [teamSeasons, setTeamSeasons] = useState([]);
  const [region, setRegion] = useState("");
  const [errors, setErrors] = useState(
    Array(10).fill({
      firstNameError: "",
      lastNameError: "",
      schoolSiteError: "",
      teamSeasonError: "",
    })
  );
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [rows, setRows] = useState(
    Array(10).fill({
      firstName: "",
      lastName: "",
      schoolSite: { id: "", label: "" },
      teamSeason: "",
    })
  );

  useEffect(() => {
    getRegionsData()
      .then(async (response) => {
        setRegionsData(response);
        setLoadingRegions(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const schoolSiteLabelsDependency = useMemo(
    () => rows.map((row) => row.schoolSite.label).join("|"),
    [rows]
  );

  useEffect(() => {
    if (schoolSiteLabelsDependency.replace(/\|/g, "").length > 0) {
      setLoadingTeamSeasons(true);
      getTeamSeasons()
        .then((response) => {
          const schoolLabels = schoolSiteLabelsDependency
            .split("|")
            .filter(Boolean);
          const filteredTeams = response.filter((team) =>
            schoolLabels.includes(team.SchoolSite)
          );
          setTeamSeasons(filteredTeams.length > 0 ? filteredTeams : []);
          setLoadingTeamSeasons(false);
        })
        .catch((e) => {
          console.log("Failed to fetch team seasons:", e);
          setLoadingTeamSeasons(false);
        });
    } else {
      setTeamSeasons([]);
    }
  }, [schoolSiteLabelsDependency]);

  const handleRegionChange = useCallback((event) => {
    const newRegion = event.target.value;
    setRegion(newRegion);

    getSchoolData(newRegion)
      .then((response) => {
        setSchoolSitesData(response);
      })
      .catch((e) => {
        console.log("Failed to fetch school sites:", e);
      });

    setRows(
      Array(10).fill({
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: "",
      })
    );
  }, []);

  const handleInputChange = useCallback((index, field, value) => {
    setRows((rows) =>
      rows.map((row, idx) => (idx === index ? { ...row, [field]: value } : row))
    );

    setErrors((errors) =>
      errors.map((error, idx) => {
        if (idx === index) {
          return { ...error, [field + "Error"]: "" };
        }
        return error;
      })
    );
  }, []);

  const handleAddRow = useCallback(() => {
    setRows([
      ...rows,
      {
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: "",
      },
    ]);
    setErrors([
      ...errors,
      {
        firstNameError: "",
        lastNameError: "",
        schoolSiteError: "",
        teamSeasonError: "",
      },
    ]);
  }, [rows, errors]);

  const handleReset = useCallback(() => {
    setRows(
      Array(10).fill({
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: "",
      })
    );
    setErrors(
      Array(10).fill({
        firstNameError: "",
        lastNameError: "",
        schoolSiteError: "",
        teamSeasonError: "",
      })
    );
    setRegion("");
  }, []);

  const handleSubmit = useCallback(() => {
    setLoadingSubmit(true);
    const newErrors = rows.map((row) => {
      const isRowInteracted =
        row.firstName.trim() ||
        row.lastName.trim() ||
        row.schoolSite.id.trim() ||
        row.teamSeason.trim();
      return isRowInteracted
        ? {
            firstNameError: row.firstName.trim()
              ? ""
              : "First name is required",
            lastNameError: row.lastName.trim() ? "" : "Last name is required",
            schoolSiteError: row.schoolSite.id.trim()
              ? ""
              : "School site is required",
            teamSeasonError: row.teamSeason.trim()
              ? ""
              : "Team season is required",
          }
        : {
            firstNameError: "",
            lastNameError: "",
            schoolSiteError: "",
            teamSeasonError: "",
          };
    });

    setErrors(newErrors);

    const filteredRows = rows.filter((row, index) => {
      const noErrors = Object.values(newErrors[index]).every(
        (val) => val === ""
      );
      return (
        noErrors &&
        row.firstName.trim() &&
        row.lastName.trim() &&
        row.schoolSite.id.trim() &&
        row.teamSeason.trim()
      );
    });

    if (filteredRows.length === 0) {
      return;
    }
    const contactPromises = filteredRows.map(async (row) => {
      const formattedData = {
        FirstName: row.firstName,
        LastName: row.lastName,
        Birthdate: "2000-01-01",
        SchoolSiteId: row.schoolSite.id,
      };
      try {
        const contactResponse = await postContact(formattedData);
        return {
          ...contactResponse,
          teamSeason: row.teamSeason,
        };
      } catch (e) {
        console.error("Failed to submit contact:", e);
        return { error: true, message: e.message };
      }
    });

    Promise.allSettled(contactPromises)
      .then((results) => {
        const enrollmentPromises = results.map((result) => {
          if (result.status === "fulfilled" && !result.value.error) {
            const enrollmentData = {
              // TeamSeasonId: result.value.teamSeason,
              TeamSeasonId: "a0qU8000001MkTRIA0",
              StudentId: result.value.ContactId,
              StartDate: "2023-08-06",
              EndDate: "2024-06-06",
            };
            return postEnrollment(enrollmentData);
          } else {
            return Promise.resolve(null);
          }
        });
        return Promise.allSettled(enrollmentPromises);
      })
      .then(() => {
        setFormSubmitted(true);
        handleReset();
        setLoadingSubmit(false);
      })
      .catch(() => {
        setLoadingSubmit(false);
      });
  }, [rows, handleReset]);

  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  if (loadingRegions || loadingTeamSeasons) return <Loader />;

  return (
    <Box
      container
      width={"100%"}
      marginX={"auto"}
      paddingX={"40px"}
      marginTop={"2%"}
      marginBottom={"10%"}
      sx={{ maxWidth: 1400 }}
    >
      {formSubmitted && (
        <Typography
          variant="h6"
          color="green"
          textAlign={"center"}
          gutterBottom
        >
          Form successfully submitted!
        </Typography>
      )}
      <RegisterUI
        rows={rows}
        region={region}
        regionsData={regionsData}
        schoolSitesData={schoolSitesData}
        teamSeasons={teamSeasons}
        onRegionChange={handleRegionChange}
        onInputChange={handleInputChange}
        onAddRow={handleAddRow}
        onReset={handleReset}
        onSubmit={handleSubmit}
        errors={errors}
        loadingSubmit={loadingSubmit}
      />
    </Box>
  );
};

export default QuickRegisteration;
