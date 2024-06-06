import React from "react";
import { useLocation } from "react-router-dom";

function PagesTitle(props) {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/Login") {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{props.translations.pages_title}</h1>
      </div>
    );
  } else if (pathname === "/QuickRegistration") {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Enroll Students</h1>
      </div>
    );
  }
}

export { PagesTitle };
