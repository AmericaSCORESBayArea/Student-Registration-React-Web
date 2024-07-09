import React, { useState, useRef } from "react";
import {
  container,
  title,
  subTitle,
  videoFrame,
  dotsContainer,
  dot,
  activeDot,
} from "../../../componentsStyle/registrationFormStyle";

import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking-inline.css";
function ShareYourConcernRight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flickingRef = useRef(null);

  const videoUrls = [
    "https://www.youtube.com/embed/30LWjhZzg50",
    "https://www.youtube.com/embed/ANOTHER_VIDEO_ID",
    "https://www.youtube.com/embed/YET_ANOTHER_VIDEO_ID",
    // Add more video URLs as needed
  ];

  const onMove = (e) => {
    setCurrentIndex(e.index);
  };
  return (
    <div className={container}>
      <h1 className={title}>Here how SCORES helps kids</h1>
      <p className={subTitle}>Community service learning concept</p>
      <div>
        <Flicking
          ref={flickingRef}
          plugins={[new Perspective({ rotate: 0.5 })]}
          circular={true}
          onMove={onMove}
        >
          {videoUrls.map((url, index) => (
            <div key={index} className="card-panel">
              <iframe
                className={videoFrame}
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Embedded YouTube ${index}`}
              ></iframe>
            </div>
          ))}
        </Flicking>
        <div className={dotsContainer}>
          {videoUrls.map((_, index) => (
            <span
              key={index}
              className={`${dot} ${currentIndex === index ? activeDot : ""}`}
              onClick={() => flickingRef.current.moveTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShareYourConcernRight;
