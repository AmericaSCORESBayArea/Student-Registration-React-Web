import React, { useState, useCallback, useEffect } from "react";
import RegisterUI from "../components/RegisterUI";
import {
  getRegionsData,
  getSchoolData,
  getTeamSeaons,
  postContact,
} from "../controller/api";
import { Box } from "@mui/material";

const QuickRegisteration = () => {
  const [loadingRegions, setLoadingRegions] = useState(true);

  const [regionsData, setRegionsData] = useState([]);
  const [schoolSitesData, setSchoolSitesData] = useState([]);
  const [teamsSeasonsDatas, setTeamsSeasonsData] = useState([]);
  const [region, setRegion] = useState("");

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

  useEffect(() => {
    if (region) {
      getTeamSeaons()
        .then((response) => {
          const filteredTeams = response.filter(
            (team) => team.Region === region
          );
          setTeamsSeasonsData(filteredTeams);
        })
        .catch((e) => {
          console.log("Failed to fetch team seasons:", e);
        });
    }
  }, [region]);

  const [rows, setRows] = useState(
    Array(10).fill({
      firstName: "",
      lastName: "",
      schoolSite: "",
      teamSeason: "",
    })
  );
  const [errors, setErrors] = useState(
    Array(10).fill({
      firstName: false,
      lastName: false,
      schoolSite: false,
      teamSeason: false,
    })
  );

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
        schoolSite: "",
        teamSeason: "",
      })
    );
    setErrors(
      Array(10).fill({
        firstName: false,
        lastName: false,
        schoolSite: false,
        teamSeason: false,
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
          return {
            ...error,
            [field]: !value.trim(),
          };
        }
        return error;
      })
    );
  }, []);

  const handleAddRow = useCallback(() => {
    setRows([
      ...rows,
      { firstName: "", lastName: "", schoolSite: "", teamSeason: "" },
    ]);
    setErrors([
      ...errors,
      {
        firstName: false,
        lastName: false,
        schoolSite: false,
        teamSeason: false,
      },
    ]);
  }, [rows, errors]);

  const handleReset = useCallback(() => {
    setRows(
      Array(10).fill({
        firstName: "",
        lastName: "",
        schoolSite: "",
        teamSeason: "",
      })
    );
    setErrors(
      Array(10).fill({
        firstName: false,
        lastName: false,
        schoolSite: false,
        teamSeason: false,
      })
    );
    setRegion("");
  }, []);

  const handleSubmit = useCallback(() => {
    const filteredRows = rows.filter(
      (row) =>
        row.firstName.trim() &&
        row.lastName.trim() &&
        row.schoolSite.trim() &&
        row.teamSeason.trim()
    );
    const promises = filteredRows.map(async (row) => {
      const formattedData = {
        FirstName: row.firstName,
        LastName: row.lastName,
        Birthdate: "2000-01-01",
        SchoolSiteId: row.schoolSite,
      };
      console.log("Formatted data:", formattedData);
      try {
        const response = await postContact(formattedData);
        console.log("Submitted", response);
        return response;
      } catch (e) {
        console.error("Failed to submit:", e);
        throw e;
      }
    });

    Promise.all(promises)
      .then((results) => {
        console.log("All submissions completed:", results);
      })
      .catch((error) => {
        console.error("One or more submissions failed:", error);
      });
  }, [rows]);

  if (loadingRegions) return <div>Loading...</div>;
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
      <RegisterUI
        rows={rows}
        region={region}
        regionsData={regionsData}
        schoolSitesData={schoolSitesData}
        teamsSeasonsData={teamsSeasonsDatas}
        onRegionChange={handleRegionChange}
        onInputChange={handleInputChange}
        onAddRow={handleAddRow}
        onReset={handleReset}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </Box>
  );
};

export default QuickRegisteration;
