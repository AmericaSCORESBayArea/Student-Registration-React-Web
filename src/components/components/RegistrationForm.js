import React, { useState, useRef } from "react";
import {
  container,
  titleContainer,
  title,
  subTitle,
  videoResponsive,
  corners1,
  corners2,
  imageContainer,
  videoFrame,
  waiverContainer,
  imageContainers,
  waiverTitle,
  waiverSubTitle,
  dotsContainer,
  dot,
  activeDot,
  textFieldStyle,
} from "../componentsStyle/registrationFormStyle";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import scores_img from "../../assets/scores.png";
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking-inline.css";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
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
      <div className={titleContainer}>
        {step === 1 ? (
          <>
            <h1 className={title}>2024 Oakland</h1>
            <p className={subTitle}>
              SCORES Student develop language skills, confidence and
              self-advocacy through poetry
            </p>
          </>
        ) : step === 2 ? (
          <>
            <h1 className={title}>Parents need to Know</h1>
            <p className={subTitle}>
              Where to share information on your student and concept with you in
              the event of any emergency
            </p>
          </>
        ) : step === 3 ? (
          <>
            <h1 className={title}>Here how SCORES helps kids</h1>
            <p className={subTitle}>Community service learning concept</p>
          </>
        ) : step === 4 ? (
          <div className={waiverContainer}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "grid",
                gap: 2,
                height: 400,
                overflowY: "scroll",
              }}
            >
              <Paper elevation={0}>
                <Typography className={waiverTitle}>Oakland Waiver</Typography>
                <Typography className={waiverTitle}>
                  Waiver & Indemnity Agreement
                </Typography>
                <Typography variant="body1" className={waiverSubTitle}>
                  In legal terms, a parent or legal guardian holds significant
                  responsibilities and rights concerning the care, well-being,
                  and upbringing of a child. These responsibilities are
                  fundamental to ensuring the welfare and development of minors
                  under their care. Guardianship refers to the legal
                  relationship between a guardian and a minor child, where the
                  guardian assumes responsibility for the child's personal care,
                  upbringing, and property management until the child reaches
                  adulthood or the guardianship is terminated. In legal terms, a
                  parent or legal guardian holds significant responsibilities
                  and rights concerning the care, well-being, and upbringing of
                  a child. These responsibilities are fundamental to ensuring
                  the welfare and development of minors under their care.
                  Guardianship refers to the legal relationship between a
                  guardian and a minor child, where the guardian assumes
                  responsibility for the child's personal care, upbringing, and
                  property management until the child reaches adulthood or the
                  guardianship is terminated. In legal terms, a parent or legal
                  guardian holds significant responsibilities and rights
                  concerning the care, well-being, and upbringing of a child.
                  These responsibilities are fundamental to ensuring the welfare
                  and development of minors under their care. Guardianship
                  refers to the legal relationship between a guardian and a
                  minor child, where the guardian assumes responsibility for the
                  child's personal care, upbringing, and property management
                  until the child reaches adulthood or the guardianship is
                  terminated.
                </Typography>
              </Paper>
            </Box>
          </div>
        ) : step === 5 ? (
          <div className={imageContainers}>
            <img
              width="100%"
              height="315"
              src={scores_img}
              alt="Community service learning concept"
            />
          </div>
        ) : step === 6 ? (
          <>
            <h1 className={title}>Need Help?</h1>
            <Typography className={subTitle}>
              Send us a message immediately
            </Typography>
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={8}
              variant="outlined"
              className={textFieldStyle}
            />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setStep(5)}
              >
                Back
              </Button>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </Box>
          </>
        ) : (
          <></>
        )}
      </div>

      {step === 1 ? (
        <div className={videoResponsive}>
          <div className={corners1}></div>
          <div className={corners2}></div>
          <iframe
            width="100%"
            height="315"
            src={videoUrls[0]} // Display the first video in the array
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube"
          ></iframe>
        </div>
      ) : step === 2 ? (
        <div className={imageContainer}>
          <div className={corners1}></div>
          <div className={corners2}></div>
          <img
            width="100%"
            height="315"
            src="https://sectionv.org/images/2023/11/9/IMG_8998.jpg?width=1416&height=797&mode=crop"
            alt="Community service learning concept"
          />
        </div>
      ) : step === 3 ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
