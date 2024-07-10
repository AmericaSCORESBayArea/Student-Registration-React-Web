import React from "react";
import { Container } from "../../../componentsStyle/registrationFormStyle";
import scores_img from "../../../../assets/scores.png";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { styled } from "@mui/system";
function AllDoneRight() {
  const ImageContainer = styled("div")({
    position: "relative",
    width: "100%",
    marginTop: "30px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  });
  const Image = styled("img")({
    width: "100%",
    height: "315",
  });

  return (
    <Container>
      <ImageContainer>
        <Image
          width="100%"
          height="315"
          src={scores_img}
          alt="Community service learning concept"
        />
      </ImageContainer>
    </Container>
  );
}

export default AllDoneRight;
