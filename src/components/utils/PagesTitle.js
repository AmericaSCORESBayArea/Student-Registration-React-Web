import React from "react";

function PagesTitle(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1>{props.translations.pages_title}</h1>
    </div>
  );
}

export { PagesTitle };
