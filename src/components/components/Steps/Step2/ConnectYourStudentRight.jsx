import React from "react";
import {
  container,
  titleContainer,
  title,
  subTitle,
  videoResponsive,
  corners1,
  corners2,
} from "../../../componentsStyle/registrationFormStyle";

import "@egjs/react-flicking/dist/flicking-inline.css";
function ConnectYourStudentRight() {
  const videoUrls = [
    "https://www.youtube.com/embed/30LWjhZzg50",
    "https://www.youtube.com/embed/ANOTHER_VIDEO_ID",
    "https://www.youtube.com/embed/YET_ANOTHER_VIDEO_ID",
    // Add more video URLs as needed
  ];

  return (
    <div className={container}>
      <div className={titleContainer}>
        <h1 className={title}>2024 Oakland</h1>
        <p className={subTitle}>
          SCORES Student develop language skills, confidence and self-advocacy
          through poetry
        </p>
      </div>
      <div className={videoResponsive}>
        <div className={corners1}></div>
        <div className={corners2}></div>
        <iframe
          width="100%"
          height="250"
          src={videoUrls[0]} // Display the first video in the array
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube"
        ></iframe>
      </div>
    </div>
  );
}

export default ConnectYourStudentRight;
