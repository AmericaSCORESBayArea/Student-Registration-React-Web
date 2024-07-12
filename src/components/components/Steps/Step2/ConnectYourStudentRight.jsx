import React, { memo } from "react";
import {
  Container,
  Title,
  SubTitle,
  Corners1,
  Corners2,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";
const VideoResponsive = styled("div")({
  position: "relative",
  width: "100%",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "40px",
    height: "40px",
    background: "rgba(200, 200, 200, 0.8)", // Grey color for tape
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for tape
    zIndex: 1,
  },

  "&::before": {
    top: "-10px",
    left: "-10px",
    transform: "rotate(-45deg)",
  },

  "&::after": {
    bottom: "-10px",
    left: "-10px",
    transform: "rotate(45deg)",
  },

  "&::before:nth-of-type(2)": {
    top: "-10px",
    right: "-10px",
    transform: "rotate(45deg)",
  },

  "&::after:nth-of-type(2)": {
    bottom: "-10px",
    right: "-10px",
    transform: "rotate(-45deg)",
  },
});

const Iframe = styled("iframe")({
  width: "100%",
  height: "250",
});
const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const ConnectYourStudentRight = memo(() => {
  const videoUrls = ["https://www.youtube.com/embed/30LWjhZzg50"];

  return (
    <Container>
      <TitleContainer>
        <Title>2024 Oakland Poetry Slam</Title>
        <SubTitle>
          SCORES Student develop language skills, confidence and self-advocacy
          through poetry
        </SubTitle>
      </TitleContainer>
      <VideoResponsive>
        <Corners1></Corners1>
        <Corners2></Corners2>
        <Iframe
          width="100%"
          height="250"
          src={videoUrls[0]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube"
        ></Iframe>
      </VideoResponsive>
    </Container>
  );
});

export default ConnectYourStudentRight;
