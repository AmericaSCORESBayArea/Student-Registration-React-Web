import React from "react";
import {
  Title,
  SubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";
import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { Container } from "react-bootstrap";

const ShareYourConcernRight = () => {
  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  ];

  const VideoFrame = styled("iframe")({
    width: "100%",
    height: "100%",
    border: "none",
  });

  const videoUrls = [
    "https://www.youtube.com/embed/30LWjhZzg50",
    "https://www.youtube.com/embed/sz9K1e3LO4M?si=zEGbTdctUwcBoj3X",
    "https://www.youtube.com/embed/4J6cWRFdDh4?si=HaVeFlS7twSnbPku",
  ];

  return (
    <Container>
      <Title>Here how SCORES helps kids</Title>
      <SubTitle>Community service learning concept</SubTitle>

      <Flicking plugins={plugins} circular={true} moveType={["snap"]}>
        {videoUrls.map((url, index) => (
          <VideoFrame
            src={url}
            index={index}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="card-panel"
            title={`Embedded YouTube ${index}`}
          />
        ))}
      </Flicking>
    </Container>
  );
};

export default ShareYourConcernRight;
