import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { statusArray } from "./categoriesArray";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt1";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import firebase from "../../firebase/firebaseConfig";

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
export default function RoleType(props) {
  const [selected, setSelected] = useState(props.registration_status);
  const [width, setWidth] = useState(window.innerWidth);
  const classes = useStyles();
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const icons = (name) => {
    if (name === selected) {
      switch (name) {
        case "New":
          return <PersonAddIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />;
        case "Existing":
          return <PersonSearchIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />;
        default:
          return <PersonAddIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />;
      }
    } else {
      switch (name) {
        case "New":
          return <PersonAddIcon sx={{ fontSize: 100, color: "#808080" }} />;
        case "Existing":
          return <PersonSearchIcon sx={{ fontSize: 100, color: "#808080" }} />;
        default:
          return <PersonAddIcon sx={{ fontSize: 100, color: "#808080" }} />;
      }
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f8f5f4",
        padding: "40px",
        borderRadius: 15,
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
        <h6>{props.props}</h6>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 0, sm: 0, md: 10, lg: 10 }}
      >
        {statusArray.map((category) => (
          <Grid
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
              style={
                selected === category.name
                  ? {
                      borderRadius: 15,
                      width: "200px",
                      height: "200px",
                      borderWidth: 3,
                      borderColor: "#1976d2",
                      backgroundColor: "#1976d2",
                    }
                  : {
                      borderRadius: 15,
                      width: "200px",
                      height: "200px",
                      borderWidth: 3,
                      borderColor: "#1976d2",
                    }
              }
              onClick={() => {
                setSelected(category.name);
                firebase.analytics().logEvent("student_status", {
                  status: category.name,
                });
                props.function("registration_status", category.name);
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
              {category.name === "New"
                ? props.newOption
                : props.returningOption}
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
          onClick={() => props.function_back()}
          style={{ marginRight: "2%", backgroundColor: "#5c6370" }}
        >
          {props.backButton}
        </Button>
      </div>
    </div>
  );
}
