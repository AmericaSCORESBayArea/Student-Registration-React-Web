import React, { useState, useRef } from "react";
import {
  Container,
  Title,
  SubTitle,
  dotsContainer,
  dot,
  activeDot,
} from "../../../componentsStyle/registrationFormStyle";

import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { styled } from "@mui/system";

function ShareYourConcernRight() {
  const VideoFrame = styled("iframe")({
    width: "100%",
    height: "100%",
    border: "none",
  });
  const DotContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  });
  const Dot = styled("span")({
    height: "12px",
    width: "12px",
    margin: "0 4px",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
    transition: "background-color 0.3s ease",
  });
  const ActiveDot = styled("span")({
    backgroundColor: "#717171",
  });

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
    <Container>
      <Title>Here how SCORES helps kids</Title>
      <SubTitle>Community service learning concept</SubTitle>

      <Flicking
        ref={flickingRef}
        plugins={[new Perspective({ rotate: 0.5 })]}
        circular={true}
        onMove={onMove}
      >
        {videoUrls.map((url, index) => (
          <div key={index} className="card-panel">
            <VideoFrame
              src={url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Embedded YouTube ${index}`}
            ></VideoFrame>
          </div>
        ))}
      </Flicking>
      <DotContainer>
        {videoUrls.map((_, index) => (
          <span
            key={index}
            className={`${dot} ${currentIndex === index ? activeDot : ""}`}
            onClick={() => flickingRef.current.moveTo(index)}
          />
        ))}
      </DotContainer>
    </Container>
  );
}

export default ShareYourConcernRight;
