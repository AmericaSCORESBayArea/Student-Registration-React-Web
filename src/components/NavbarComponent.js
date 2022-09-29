import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./../assets/America-SCORES-Logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import firebase from "../firebase/firebaseConfig";
import { ModalwithConfirmation } from "./utils/Modal";

function NavbarComponent(props) {
  const [selected, setSelected] = useState(props.selected);
  const history = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const handleLanguageChange = (code) => {
    if (code === "US") {
      firebase.analytics().logEvent("selected_language", {
        selected: "english",
      });
    } else if (code === "ES") {
      firebase.analytics().logEvent("selected_language", {
        selected: "spanish",
      });
    } else if (code === "CN") {
      firebase.analytics().logEvent("selected_language", {
        selected: "chinese",
      });
    }
    setSelected(code);
    localStorage.setItem("language", code);
    const event = new CustomEvent("languageChanged");
    document.dispatchEvent(event);
  };

  const confirmedLogout = () => {
    firebase.auth().signOut();
    localStorage.setItem("user", false);
    history({ pathname: "/Login" });
  };

  const showLogoutModal = () => {
    ModalwithConfirmation(
      props.translations.logout_modal,
      confirmedLogout,
      "warning"
    );
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            style={{
              width: "100%",
              maxWidth: "250px",
            }}
            className="d-inline-block align-top"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ReactFlagsSelect
            style={{ marginRight: "15px" }}
            selected={selected}
            showSelectedLabel={width < 720 ? false : true}
            showOptionLabel={width < 720 ? false : true}
            countries={["US", "ES", "CN"]}
            customLabels={{
              US: props.translations.US,
              ES: props.translations.ES,
              CN: props.translations.CN,
            }}
            onSelect={(code) => handleLanguageChange(code)}
          />
          {JSON.parse(localStorage.getItem("user")) === true ? (
            <IconButton
              size="large"
              color="primary"
              aria-label="LogOut"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                showLogoutModal();
              }}
            >
              <LogoutIcon fontSize="large" />
            </IconButton>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
