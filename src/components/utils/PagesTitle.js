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
  } else {
    return <div></div>;
  }
}

export { PagesTitle };
