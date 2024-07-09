import React from "react";
import {
  container,
  imageContainers,
} from "../../../componentsStyle/registrationFormStyle";
import scores_img from "../../../../assets/scores.png";

import "@egjs/react-flicking/dist/flicking-inline.css";
function AllDoneRight() {
  return (
    <div className={container}>
      <div className={imageContainers}>
        <img
          width="100%"
          height="315"
          src={scores_img}
          alt="Community service learning concept"
        />
      </div>
    </div>
  );
}

export default AllDoneRight;
