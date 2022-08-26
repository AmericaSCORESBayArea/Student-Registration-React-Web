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
    setSelected(code);
    localStorage.setItem("language", code);
    const event = new CustomEvent("languageChanged");
    document.dispatchEvent(event);
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            style={{
              width: "100%",
              maxWidth: "300px",
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
              US: props.traslations.US,
              ES: props.traslations.ES,
              CN: props.traslations.CN,
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
                firebase.auth().signOut();
                localStorage.setItem("user", false);
                history({ pathname: "/Login" });
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
