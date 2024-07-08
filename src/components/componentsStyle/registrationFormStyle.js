import { css } from "@emotion/css";
import { typographyClasses, textFieldClasses } from "@mui/material";
export const parentContainer = css`
  height: 700px;
  padding: 20px 10px;
  background-color: #f5deb3;
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;

export const container = css`
  position: relative;
  padding: 10px;
  max-width: 600px;
  width: 100%;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adding grey shadow */
`;

export const corners1 = css`
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid black;

    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    z-index: 1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
  }

  /* Top left corner */
  &::before {
    top: -10px;
    left: -10px;
    transform: rotate(-45deg);
  }

  /* Bottom left corner */
  &::after {
    bottom: -10px;
    left: -10px;
    transform: rotate(-45deg);
  }
`;

export const corners2 = css`
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid black;

    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    z-index: 1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
  }

  /* Top right corner */
  &::before {
    top: -10px;
    right: -10px;
    transform: rotate(45deg);
  }

  /* Bottom right corner */
  &::after {
    bottom: -10px;
    right: -10px;
    transform: rotate(45deg);
  }
`;

export const titleContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const title = css`
  font-size: 25px;
`;

export const subTitle = css`
  font-size: 17px;
`;

export const videoResponsive = css`
  position: relative;
  width: 100%;
  margin-top: 30px;

  /* Top left corner */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(-45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Bottom left corner */
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Top right corner */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Bottom right corner */
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(-45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }
`;

export const imageContainer = css`
  position: relative;

  width: 100%;
  margin-top: 30px;

  /* Top left corner */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(-45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Bottom left corner */
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Top right corner */
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }

  /* Bottom right corner */
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: rgba(200, 200, 200, 0.8); /* Grey color for tape */
    transform: rotate(-45deg);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for tape */
    z-index: 1;
  }
`;

export const imageStyle = css`
  max-width: 500px;
`;
/** Define your styles */
export const videoCarousel = css`
  position: relative;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
`;

export const videoItem = css`
  position: relative;
  width: 100%;
  height: 315px; /* Adjust height as needed */
  overflow: hidden;
  margin-bottom: 20px; /* Space between videos */
`;

export const videoFrame = css`
  width: 100%;
  height: 100%;
  border: none;
`;

export const waiverContainer = css`
  padding: 20px;
  /* margin: 20px; */
  height: 400px; /* Example maximum height */
  /* overflow-y: auto; */
  border-radius: 30px;

  /* border: 1px solid red; */
`;

export const waiverTitle = css`
  &.${typographyClasses.root} {
    font-weight: 600;

    font-size: 22px;
    /* border: 1px solid red; */
  }
`;
export const waiverSubTitle = css`
  &.${typographyClasses.root} {
    font-size: 15px;
    /* border: 1px solid red; */
  }
`;
export const textFieldStyle = css`
  &.${textFieldClasses.root} {
    max-height: 600px;
    height: 100%;
    margin-top: 30px;
    background-color: whitesmoke;

    /* padding: 3px; */
    /* border: 1px solid red; */
  }
`;

export const imageContainers = css`
  position: relative;

  width: 100%;
  margin-top: 30px;
  /* border: 1px solid red; */
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const dotsContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const dot = css`
  height: 12px;
  width: 12px;
  margin: 0 4px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease;
`;

export const activeDot = css`
  background-color: #717171;
`;
