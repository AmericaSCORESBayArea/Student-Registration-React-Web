import React, { useState, useCallback, useEffect } from "react";
import RegisterUI from "../components/RegisterUI";
import {
  getRegionsData,
  getSchoolData,
  getTeamSeasons,
  postContact,
  postEnrollment,
} from "../controller/api";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
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
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [enrollmentResults, setEnrollmentResults] = useState([]);
  const [errorAlert, setErrorAlert] = useState({ show: false, message: "" });
  const [isNewContact, setIsNewContact] = useState(false);

  const [rows, setRows] = useState(
    Array(5).fill({
      firstName: "",
      lastName: "",
      schoolSite: { id: "", label: "" },
      teamSeason: { id: "", label: "" },
      contactId: "",
    })
  );

  const [errors, setErrors] = useState(
    Array(5).fill({
      firstNameError: "",
      lastNameError: "",
      schoolSiteError: "",
      teamSeasonError: "",
    })
  );

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
              setErrorAlert({ show: false, message: "" });
              setFormSubmitted(false);
              setRows(
                Array(5).fill({
                  firstName: "",
                  lastName: "",
                  schoolSite: { id: "", label: "" },
                  teamSeason: { id: "", label: "" },
                  contactId: "",
                })
              );
              setErrors(
                Array(5).fill({
                  firstNameError: "",
                  lastNameError: "",
                  schoolSiteError: "",
                  teamSeasonError: "",
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
            setErrorAlert({ show: false, message: "" });
            setFormSubmitted(false);
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

  const handleFieldChange = () => {
    setIsNewContact(true);
  };

  const handleAddRow = useCallback(() => {
    setRows([
      ...rows,
      {
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: { id: "", label: "" },
        contactId: "",
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

  const handleSubmit = useCallback(() => {
    setLoadingSubmit(true);
    let allValid = true;

    const newErrors = rows.map((row) => {
      const isRowInteracted =
        row.firstName.trim() ||
        row.lastName.trim() ||
        row.schoolSite.id.trim() ||
        row.teamSeason.id.trim();

      if (!isRowInteracted) {
        return {
          firstNameError: "",
          lastNameError: "",
          schoolSiteError: "",
          teamSeasonError: "",
        };
      }

      const errors = {
        firstNameError: row.firstName.trim() ? "" : "First name is required",
        lastNameError: row.lastName.trim() ? "" : "Last name is required",
        schoolSiteError: row.schoolSite.id.trim()
          ? ""
          : "School site is required",
        teamSeasonError: row.teamSeason.id.trim()
          ? ""
          : "Team season is required",
      };

      if (Object.values(errors).some((error) => error !== "")) {
        allValid = false;
      }
      return errors;
    });

    setErrors(newErrors);

    if (!allValid) {
      setLoadingSubmit(false);
      return;
    }

    const filteredAndValidRows = rows.filter(
      (row, index) =>
        (row.firstName.trim() ||
          row.lastName.trim() ||
          row.schoolSite.id.trim() ||
          row.teamSeason.id.trim()) &&
        !Object.values(newErrors[index]).some((error) => error !== "")
    );

    const contactPromises = filteredAndValidRows.map(async (row) => {
      if (row.contactId === "" || isNewContact) {
        try {
          const contactResponse = await postContact({
            FirstName: row.firstName,
            LastName: row.lastName,
            SchoolSiteId: row.schoolSite.id,
          });
          if (contactResponse.error) {
            throw new Error(contactResponse.message);
          }
          row.contactId = contactResponse.ContactId;
        } catch (e) {
          console.error("Failed to create contact:", e);
          return { error: true, message: e.message };
        }
      }
      try {
        const enrollmentResponse = await postEnrollment({
          TeamSeasonId: row.teamSeason.id,
          StudentId: row.contactId,
        });
        if (enrollmentResponse.error) {
          throw new Error(enrollmentResponse.message);
        }
        return {
          ...enrollmentResponse,
          firstName: row.firstName,
          lastName: row.lastName,
          schoolSiteLabel: row.schoolSite.label,
          teamSeasonLabel: row.teamSeason.label,
          region: region,
        };
      } catch (e) {
        console.error("Failed to enroll contact:", e);
        return { error: true, message: e.message };
      }
    });

    Promise.allSettled(contactPromises)
      .then((results) => {
        const errors = results.filter(
          (result) => result.status === "rejected" || result.value.error
        );

        if (errors.length > 0) {
          setErrorAlert({
            show: true,
            message:
              "Some entries could not be processed. Please check the data and try again.",
          });
        } else {
          const enrolledDetails = results.map((result) => result.value);
          setEnrollmentResults(enrolledDetails);
          setFormSubmitted(true);
          handleReset(false);
        }
      })
      .catch((error) => {
        setErrorAlert({
          show: true,
          message: error.message,
        });
      })
      .finally(() => {
        setLoadingSubmit(false);
      });

    setUserHasInteracted(false);
  }, [rows, isNewContact, region, handleReset]);

  useEffect(() => {
    if (errorAlert.show || formSubmitted) {
      const timer = setTimeout(() => {
        setErrorAlert({ ...errorAlert, show: false });
        setFormSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorAlert, formSubmitted]);

  const handleGoBack = useCallback(
    (event) => {
      event.preventDefault();
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
    },
    [userHasInteracted, navigate]
  );

  const resetForm = () => {
    setRows(
      Array(5).fill({
        firstName: "",
        lastName: "",
        schoolSite: { id: "", label: "" },
        teamSeason: { id: "", label: "" },
        contactId: "",
      })
    );
    setErrors(
      Array(5).fill({
        firstNameError: "",
        lastNameError: "",
        schoolSiteError: "",
        teamSeasonError: "",
      })
    );
    setRegion("");
    setUserHasInteracted(false);
  };

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

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  if (loadingRegions || loadingTeamSeasons) return <Loader />;

  return (
    <Box
      container
      width={"100%"}
      marginX={"auto"}
      paddingX={"30px"}
      marginTop={"2%"}
      sx={{ maxWidth: 1400 }}
    >
      <Grid
        item
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
            onClick={(e) => handleGoBack(e)}
          >
            Go Back
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Enroll Students</Typography>
        </Grid>
        <Grid item xs={12} md={3} sm={12} />
      </Grid>

      {errorAlert.show && <Alert severity="error">{errorAlert.message}</Alert>}
      {formSubmitted && (
        <Alert
          severity="success"
          sx={{
            marginBlock: 2,
          }}
        >
          Form successfully submitted!
        </Alert>
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
        enrollmentResults={enrollmentResults}
        handleFieldChange={handleFieldChange}
      />
    </Box>
  );
};

export default QuickRegisteration;
