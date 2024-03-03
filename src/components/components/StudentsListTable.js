import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  search: {
    width: "80%",
    height: "40px",
    borderRadius: 10,
  },
}));
export default function StudentsListTable(props) {
  var w = window.innerWidth;
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function StudentsList({ value }) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            props.studentProps(value);
            props.goToForm();
          }}
        >
          <div
            style={{
              padding: "20px",
            }}
          >
            <PersonIcon sx={{ color: "#757575" }} fontSize="medium" />
          </div>
          <div style={{ marginTop: "15px" }}>
            <b>
              {value.FirstName} {value.LastName} <br />
            </b>
            <p>{value.SchoolName}</p>
          </div>
          <div style={{ margin: "auto 0 auto auto" }}>
            <IconButton
              aria-label="edit"
              sx={{
                paddingRight: "20px",
                color: "#1976d2",
                fontSize: "medium",
              }}
              onClick={() => {
                props.studentProps(value);
                props.goToForm();
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            background: "#D3D3D3",
            height: "1.5px",
          }}
        />
      </>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f5f4",
        marginBottom: "80px",
        maxWidth: width < 1000 ? "100%" : width < 1500 ? "60%" : "40%",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f5f4",
          padding: "10px",
          borderRadius: 15,
        }}
        title={props.props.title_parents}
      >
        <div style={{ marginBottom: "10px" }}>
          <IconButton color="primary" onClick={() => props.goBack()}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
            marginBottom: "1%",
            textAlign: "center",
          }}
        >
          <h5>{props.props.title_parents}</h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4%",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          <p>{props.sub_title_parents}</p>
        </div>
        <div
          style={{
            maxWidth: "100%",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <div sx={{ overflow: "auto" }}>
            {props.students.map((student) => (
              <StudentsList key={student.Id} value={student} />
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8%",
            textAlign: "center",
          }}
        >
          <Button
            size={"medium"}
            variant="contained"
            onClick={() => {
              props.selectCategory();
            }}
            style={{
              marginRight: "2%",
              backgroundColor: "#1976d2",
              marginBottom: "20px",
            }}
          >
            {props.add_student_button}
          </Button>
        </div>
      </div>
    </div>
  );
}
