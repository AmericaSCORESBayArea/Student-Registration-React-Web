import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { statusArray } from "./categoriesArray";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import firebase from "../../firebase/firebaseConfig";
import SearchStudent from "./SearchStudent";
import StudentsListTable from "./StudentsListTable";
import { getStudentsByPhoneNumber } from "../../components/controller/api";
import ls from "localstorage-slim";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { ErrorModal } from "../utils/Modal";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  homeScreenContainer: {
    backgroundColor: "#FFFFFF",
  },
  carousel: {
    marginTop: "30px",
  },
  CategorySelected: {
    borderColor: "#6BAFFF",
    backgroundColor: "#6BAFFF",
  },
  textCategory: {
    color: "#1976d2",
    textAlign: "center",
  },
  textCategorySelected: {
    color: "#1976d2",
    textAlign: "center",
  },
}));
export default function Registration_Status(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(props.registration_status);
  const [width, setWidth] = useState(window.innerWidth);
  const [studentsList, setStudentsList] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showParentStudents, setShowParentStudents] = useState(false);
  const toastId = React.useRef(null);
  const classes = useStyles();
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const showModal = useCallback(() => {
    ErrorModal(props.modalOptions, "info");
  }, [props]);

  useEffect(() => {
    props.studentProps(null);
    async function fetchData() {
      let data = localStorage.getItem("phoneNumber");
      await getStudentsByPhoneNumber(data).then((result) => {
        if (result.length !== 0) {
          setStudentsList(result);
          setShowSearch(true);
          setShowParentStudents(true);
          showModal();
        }
      });
    }
    fetchData();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [props, showModal]);

  const goBack = () => {
    setShowSearch(false);
    dismiss();
  };
  const dismiss = () => toast.dismiss(toastId.current);

  const selectingCategory = (categoryName) => {
    setSelected(categoryName);
    firebase.analytics().logEvent("student_status", {
      app: "web_registration",
      status: categoryName,
    });

    if (categoryName === "Quick Registration" && props.roleType === "Coach") {
      navigate("/QuickRegistration");
    }
  };

  const showToast = (message) => {
    setLoading(false);
    toast.error(message, {
      toastId: toastId,
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      selectingCategory("New");
    }, 4000);
  };
  async function fetchData(data) {
    await getStudentsByPhoneNumber(data).then((result) => {
      if (result.length === 0) {
        showToast(props.error_students);
      } else {
        showModal();
        setStudentsList(result);
        setShowSearch(true);
        setShowParentStudents(true);
        setLoading(false);
      }
    });
  }
  const formRedirect = (category) => {
    dismiss();
    if (category === "Existing" && props.roleType === "Parent") {
      let contactId = ls.get("Parent_ContactId", { decrypt: true });
      let data = localStorage.getItem("phoneNumber");
      if (contactId !== null && contactId !== undefined) {
        setLoading(true);
        fetchData(data);
      } else {
        if (contactId === null) {
          fetchData(data);
        } else {
          selectingCategory(category);
          props.function("registration_status", category);
        }
      }
    } else {
      selectingCategory(category);
      props.function("registration_status", category);
    }
  };
  const icons = (name) => {
    const color = selected === name ? "#F0F8FF" : "#808080";
    const iconProps = { sx: { fontSize: 100, color } };
    switch (name) {
      case "New":
        return <PersonAddIcon {...iconProps} />;
      case "Existing":
        return <PersonSearchIcon {...iconProps} />;
      case "Quick Registration":
        return <GroupAddIcon {...iconProps} />;
      case "Enroll":
        return <NoteAltIcon {...iconProps} />;
      default:
        return <PersonAddIcon {...iconProps} />;
    }
  };

  const buttonDisabled = (categoryName) => {
    return categoryName === "Enroll";
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading open={loading} />
      {showSearch === false ? (
        <div
          style={{
            width: width < 1000 ? "100%" : width < 1500 ? "55%" : "35%",
            backgroundColor: "#f8f5f4",
            padding: "35px",
            borderRadius: 15,
            margin: "auto",
            marginTop: "30px",
          }}
          title={props.title}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1%",
              marginBottom: "4%",
              textAlign: "center",
            }}
          >
            <h5>{props.props}</h5>
          </div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, sm: 0, md: 0, lg: 0 }}
          >
            {statusArray.map((category, index) => (
              <Grid
                key={index}
                item
                sm={12}
                xs={12}
                md={6}
                lg={6}
                align="center"
                justify="center"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  disabled={buttonDisabled(category.name)}
                  style={{
                    borderRadius: 15,
                    width: "200px",
                    height: "200px",
                    borderWidth: 3,
                    borderColor: buttonDisabled(category.name)
                      ? "#D3D3D3"
                      : "#1976d2",
                    backgroundColor: buttonDisabled(category.name)
                      ? "#D3D3D3"
                      : selected === category.name
                      ? "#1976d2"
                      : "transparent",
                    color: buttonDisabled(category.name)
                      ? "#D3D3D3"
                      : selected === category.name
                      ? "#FFFFFF"
                      : "#1976d2",
                    cursor: buttonDisabled(category.name)
                      ? "not-allowed"
                      : "pointer",
                  }}
                  onClick={() => {
                    if (!buttonDisabled(category.name)) {
                      setSelected(category.name);
                    }
                    if (
                      category.name === "Existing" &&
                      props.roleType === "Coach"
                    ) {
                      setShowSearch(true);
                      selectingCategory(category.name);
                    } else {
                      formRedirect(category.name);
                    }
                  }}
                >
                  {icons(category.name)}
                </Button>
                <h3
                  className={
                    selected === category.name
                      ? classes.textCategorySelected
                      : classes.textCategory
                  }
                >
                  {category.name}
                </h3>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: width < 1000 ? "center" : "flex-start",
              marginTop: "8%",
              textAlign: "center",
            }}
          >
            <Button
              size={"large"}
              variant="contained"
              onClick={() => {
                dismiss();
                props.function_back();
              }}
              style={{ marginRight: "2%", backgroundColor: "#5c6370" }}
            >
              {props.backButton}
            </Button>
          </div>
        </div>
      ) : showParentStudents === true ? (
        <StudentsListTable
          props={props.students}
          students={studentsList}
          sub_title_parents={props.sub_title}
          goBack={() => {
            setShowParentStudents(false);
            goBack();
          }}
          add_student_button={props.modalOptions.add_student_button}
          selectCategory={() => {
            selectingCategory("New");
            props.function("registration_status", "New");
          }}
          goToForm={() => props.function("registration_status", "Existing")}
          studentProps={props.studentProps}
        />
      ) : (
        <SearchStudent
          props={props.students}
          goBack={() => goBack()}
          empty={props.empty}
          goToForm={() => props.function("registration_status", "Existing")}
          studentProps={props.studentProps}
        />
      )}
    </div>
  );
}
