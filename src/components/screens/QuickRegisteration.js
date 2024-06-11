import React, { useState, useCallback, useEffect } from "react";
import RegisterUI from "../components/RegisterUI";
import {
  getRegionsData,
  getSchoolData,
  getTeamSeasons,
  postContact,
  postEnrollment,
} from "../controller/api";
import { Box, Button, Grid, Typography } from "@mui/material";
import Loader from "../utils/Loader";
import { ModalwithConfirmation } from "../utils/Modal";
import { enLanguages } from "../translations/en";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const QuickRegisteration = () => {
  const navigate = useNavigate();
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingTeamSeasons, setLoadingTeamSeasons] = useState(true);
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
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

    getTeamSeasons()
      .then(async (response) => {
        setTeamSeasons(response);
        setLoadingTeamSeasons(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingTeamSeasons(false);
      });
  }, []);

  const handleBeforeUnload = useCallback(
    (event) => {
      if (userHasInteracted) {
        const message =
          "You have unsaved changes! Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    },
    [userHasInteracted]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const handleRegionChange = useCallback(
    (event) => {
      if (userHasInteracted) {
        ModalwithConfirmation(enLanguages.dataLoss_modal, () => {
          const newRegion = event.target.value;
          setRegion(newRegion);
          getSchoolData(newRegion)
            .then((response) => {
              setSchoolSitesData(response);
              setUserHasInteracted(false);
              setRows(
                Array(10).fill({
                  firstName: "",
                  lastName: "",
                  schoolSite: { id: "", label: "" },
                  teamSeason: "",
                })
              );
            })
            .catch((e) => {
              console.log("Failed to fetch school sites:", e);
            });
        });
      } else {
        const newRegion = event.target.value;
        setRegion(newRegion);
        getSchoolData(newRegion)
          .then((response) => {
            setSchoolSitesData(response);
            setUserHasInteracted(false);
          })
          .catch((e) => {
            console.log("Failed to fetch school sites:", e);
          });
      }
    },
    [userHasInteracted]
  );

  const handleInputChange = useCallback((index, field, value) => {
    setUserHasInteracted(true);
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

  const handleReset = useCallback(
    (showConfirmation = true) => {
      if (userHasInteracted && showConfirmation) {
        ModalwithConfirmation(
          enLanguages.dataLoss_modal,
          () => {
            resetForm();
          },
          "warning",
          () => console.log("Navigation cancelled.")
        );
      } else {
        resetForm();
      }
    },
    [userHasInteracted]
  );

  const resetForm = () => {
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
    setUserHasInteracted(false);
  };

  const handleSubmit = useCallback(() => {
    setLoadingSubmit(true);
    let allValid = true;

    const newErrors = rows.map((row) => {
      const isRowInteracted =
        row.firstName.trim() ||
        row.lastName.trim() ||
        row.schoolSite.id.trim() ||
        row.teamSeason.trim();
      if (isRowInteracted) {
        const errors = {
          firstNameError: row.firstName.trim() ? "" : "First name is required",
          lastNameError: row.lastName.trim() ? "" : "Last name is required",
          schoolSiteError: row.schoolSite.id.trim()
            ? ""
            : "School site is required",
          teamSeasonError: row.teamSeason.trim()
            ? ""
            : "Team season is required",
        };
        if (Object.values(errors).some((error) => error !== "")) {
          allValid = false;
        }
        return errors;
      }
      return {
        firstNameError: "",
        lastNameError: "",
        schoolSiteError: "",
        teamSeasonError: "",
      };
    });

    setErrors(newErrors);

    if (!allValid) {
      setLoadingSubmit(false);
      return;
    }

    const filteredRows = rows.filter(
      (row, index) =>
        newErrors[index].firstNameError === "" && row.firstName.trim()
    );

    const contactPromises = filteredRows.map(async (row) => {
      const formattedData = {
        FirstName: row.firstName,
        LastName: row.lastName,
        Birthdate: "2000-01-01",
        SchoolSiteId: row.schoolSite.id,
      };

      try {
        return await postContact(formattedData);
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
        handleReset(false);
        setLoadingSubmit(false);
      })
      .catch(() => {
        setLoadingSubmit(false);
      });

    setUserHasInteracted(false);
  }, [rows, handleReset]);

  const handleGoBack = useCallback(() => {
    if (userHasInteracted) {
      ModalwithConfirmation(
        enLanguages.dataLoss_modal,
        () => {
          navigate(-1);
        },
        "warning",
        () => console.log("Navigation cancelled.")
      );
    } else {
      navigate(-1);
    }
  }, [userHasInteracted, navigate]);

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
      <Grid
        item
        container
        xs={12}
        md={12}
        sm={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={2} sm={12}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Enroll Students</Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={12} />
      </Grid>
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
        userHasInteracted={userHasInteracted}
      />
    </Box>
  );
};

export default QuickRegisteration;
