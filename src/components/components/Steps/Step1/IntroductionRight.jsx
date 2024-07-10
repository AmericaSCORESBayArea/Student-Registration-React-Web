import React from "react";
import {
  Container,
  Title,
} from "../../../componentsStyle/registrationFormStyle";
import helpPoint from "../../../../assets/help_point.png";
import helpMe from "../../../../assets/help_me.png";
import arrow from "../../../../assets/arrow.png";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

function IntroductionRight() {
  const IntroductionContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  });
  const ImageArrow = styled("img")({
    height: 80,
    width: 100,
    marginTop: -100,
  });
  const ImageHelpPoint = styled("img")({
    height: 90,
    width: 90,
  });
  const ImageHelpMe = styled("img")({
    height: 60,
    width: 60,
  });
  const TitleContainer = styled("div")({
    width: "80%",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container>
      <IntroductionContainer>
        {!isMobile ? (
          <>
            <ImageArrow src={arrow} alt="Community service learning concept" />
            <Title>
              This shows how much is left to complete or if there are issues.
            </Title>
          </>
        ) : (
          <></>
        )}
      </IntroductionContainer>
      <IntroductionContainer>
        <ImageHelpPoint
          src={helpPoint}
          alt="Community service learning concept"
        />
        <TitleContainer>
          <Title>Tap this icon for more information where it apperars.</Title>
        </TitleContainer>
      </IntroductionContainer>
      <IntroductionContainer>
        <ImageHelpMe src={helpMe} alt="Community service learning concept" />
        <TitleContainer>
          <Title>Tap this to get help at any time</Title>
        </TitleContainer>
      </IntroductionContainer>
    </Container>
  );
}

export default IntroductionRight;
