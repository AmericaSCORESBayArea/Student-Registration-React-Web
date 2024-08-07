import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { categoriesArray } from "./categoriesArray";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SportsIcon from "@mui/icons-material/Sports";
import {
  getContactInfo,
  getContactRecordType,
} from "../../components/controller/api";
import firebase from "../../firebase/firebaseConfig";
import ls from "localstorage-slim";

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
  const classes = useStyles();
  const [selected, setSelected] = useState();

  const setRType = useCallback(
    (role, contactId) => {
      setSelected(role);
      if (role === "Parent") {
        ls.set("Parent_ContactId", contactId, { encrypt: true });
      }
      setTimeout(() => {
        firebase.analytics().logEvent("user_roleType", {
          app: "web_registration",
          role: role,
        });
        props.function("role_type", role);
      }, 3000);
    },
    [props]
  );

  useEffect(() => {
    let data = localStorage.getItem("phoneNumber");
    async function fetchData() {
      await getContactInfo(data).then((result) => {
        if (result.ContactId === null) {
          setRType("Parent", result.ContactId);
        } else {
          getContactRecordType(result.ContactId).then((value) => {
            if (value[0].ContactRecordType === "01250000000VBbWAAW") {
              setRType("Coach");
            } else {
              setRType("Parent", result.ContactId);
            }
          });
        }
      });
    }
    fetchData();
  }, [setRType]);

  const icons = (name) => {
    if (name === selected) {
      switch (name) {
        case "Parent":
          return (
            <FamilyRestroomIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />
          );
        case "Coach":
          return <SportsIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />;
        default:
          return (
            <FamilyRestroomIcon sx={{ fontSize: 100, color: "#F0F8FF" }} />
          );
      }
    } else {
      switch (name) {
        case "Parent":
          return (
            <FamilyRestroomIcon sx={{ fontSize: 100, color: "#808080" }} />
          );
        case "Coach":
          return <SportsIcon sx={{ fontSize: 100, color: "#808080" }} />;
        default:
          return (
            <FamilyRestroomIcon sx={{ fontSize: 100, color: "#808080" }} />
          );
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
        <h5>
          {props.props}
          <span class="one">.</span>
          <span class="two">.</span>
          <span class="three">.</span>​
        </h5>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 0, sm: 0, md: 10, lg: 10 }}
      >
        {categoriesArray.map((category, index) => (
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
              {category.name === "Parent"
                ? props.parentOption
                : props.coachOption}
            </h3>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
