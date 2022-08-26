import React from "react";

function FormTitles(props) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", textAlign: "left" }}
    >
      <h2>{props.title}</h2>
    </div>
  );
}

export { FormTitles };
