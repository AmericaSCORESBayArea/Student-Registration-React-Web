import React, { useState, useRef } from "react";
import {
  container,
  introductionContainer,
  title,
  subTitle,
} from "../../../componentsStyle/registrationFormStyle";
import helpPoint from "../../../../assets/help_point.png";
import helpMe from "../../../../assets/help_me.png";
import arrow from "../../../../assets/arrow.png";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useTheme, useMediaQuery } from "@mui/material";
function IntroductionRight() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={container}>
      <div className={introductionContainer}>
        {!isMobile ? (
          <>
            <img
              height={80}
              width={100}
              style={{ marginTop: -100 }}
              src={arrow}
              alt="Community service learning concept"
            />
            <p className={[title]}>
              This shows how much is left to complete or if there are issues.
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={introductionContainer}>
        <img
          height={90}
          width={90}
          src={helpPoint}
          alt="Community service learning concept"
        />
        <div style={{ width: "80%" }}>
          <p className={title}>
            Tap this icon for more information where it apperars.
          </p>
        </div>
      </div>
      <div className={[introductionContainer]}>
        <img
          height={60}
          width={60}
          src={helpMe}
          alt="Community service learning concept"
        />
        <div style={{ width: "80%" }}>
          <p className={title}>Tap this to get help at any time</p>
        </div>
      </div>
    </div>
  );
}

export default IntroductionRight;
