import React, { memo } from "react";
import {
  Container,
  Title,
  SubTitle,
  Corners1,
  Corners2,
} from "../../../componentsStyle/registrationFormStyle";
import { styled } from "@mui/system";

const ImageContainer = styled("div")({
  position: "relative",

  width: "100%",

  /* Top left corner */
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "-10px",
    width: "40px",
    height: "40px",
    background: "rgba(200, 200, 200, 0.8)" /* Grey color for tape */,
    transform: "rotate(-45deg)",
    boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.1)" /* Shadow for tape */,
    zIndex: 1,
  },

  /* Bottom left corner */
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: "-10px",
    width: "40px",
    height: "40px",
    background: "rgba(200, 200, 200, 0.8)" /* Grey color for tape */,
    transform: "rotate(45deg)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" /* Shadow for tape */,
    zIndex: "1",
  },
});
const SafetyConcernRight = memo(() => {
  return (
    <Container>
      <Title>Parents need to Know</Title>
      <SubTitle>
        Where to share information on your student and concept with you in the
        event of any emergency
      </SubTitle>
      <ImageContainer>
        <Corners1></Corners1>
        <Corners2></Corners2>
        <img
          width="100%"
          height="250"
          src="https://sectionv.org/images/2023/11/9/IMG_8998.jpg?width=1416&height=797&mode=crop"
          alt="Community service learning concept"
        />
      </ImageContainer>
    </Container>
  );
});

export default SafetyConcernRight;
