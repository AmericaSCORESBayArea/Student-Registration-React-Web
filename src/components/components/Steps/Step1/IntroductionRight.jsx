import React, { memo } from "react";
import { SubTitle } from "../../../componentsStyle/registrationFormStyle";
import helpPoint from "../../../../assets/help_point.png";
import helpMe from "../../../../assets/help_me.png";
import arrow from "../../../../assets/arrow.png";
import { useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
const IntroductionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
  maxWidth: "600px",
  width: "100%",
  height: "90%",
});
const Introduction = styled("div")(({ marginLeft }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  paddingLeft: marginLeft || "0",
}));
const ImageArrow = styled("img")({
  height: 80,
  width: 100,
  marginTop: -160,
});
const ImageHelpPoint = styled("img")({
  height: 80,
  width: 80,
});
const ImageHelpMe = styled("img")({
  height: 50,
  width: 50,
});
const TitleContainer = styled("div")({
  width: "60%",
  paddingLeft: "15px",
});
const IntroductionRight = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <IntroductionContainer>
      <Introduction marginLeft="50px">
        {!isMobile ? (
          <>
            <ImageArrow src={arrow} alt="Community service learning concept" />
            <TitleContainer>
              <SubTitle>
                This shows how much is left to complete or if there are issues.
              </SubTitle>
            </TitleContainer>
          </>
        ) : (
          <></>
        )}
      </Introduction>
      <Introduction>
        <ImageHelpPoint
          src={helpPoint}
          alt="Community service learning concept"
        />
        <TitleContainer>
          <SubTitle>
            Tap this icon for more information where it apperars.
          </SubTitle>
        </TitleContainer>
      </Introduction>
      <Introduction marginLeft="100px">
        <ImageHelpMe src={helpMe} alt="Community service learning concept" />
        <TitleContainer>
          <SubTitle>Tap this to get help at any time</SubTitle>
        </TitleContainer>
      </Introduction>
    </IntroductionContainer>
  );
});

export default IntroductionRight;
