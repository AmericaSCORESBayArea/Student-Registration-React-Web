import React from "react";
import {
  container,
  title,
  subTitle,
  corners1,
  corners2,
  imageContainer,
} from "../../../componentsStyle/registrationFormStyle";

import "@egjs/react-flicking/dist/flicking-inline.css";
function SafetyConcernRight() {
  return (
    <div className={container}>
      <h1 className={title}>Parents need to Know</h1>
      <p className={subTitle}>
        Where to share information on your student and concept with you in the
        event of any emergency
      </p>
      <div className={imageContainer}>
        <div className={corners1}></div>
        <div className={corners2}></div>
        <img
          width="100%"
          height="250"
          src="https://sectionv.org/images/2023/11/9/IMG_8998.jpg?width=1416&height=797&mode=crop"
          alt="Community service learning concept"
        />
      </div>
    </div>
  );
}

export default SafetyConcernRight;
