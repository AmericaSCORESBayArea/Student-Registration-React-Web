import { css } from "@emotion/css";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled("div")(({ width, marginRight }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
  maxWidth: "600px",
  width: width || "100%",

  // border: "1px solid red",
  marginRight: marginRight || "0%",
}));

export const Corners1 = styled("div")({
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "40px",
    height: "40px",
    border: "1px solid black",

    background: "rgba(200, 200, 200, 0.8)" /* Grey color for tape */,
    zIndex: "1",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" /* Shadow for tape */,
  },

  /* Top left corner */
  "&::before": {
    top: "-10px",
    left: "-10px",
    transform: "rotate(-45deg)",
  },

  /* Bottom left corner */
  "&::after": {
    bottom: "-10px",
    left: "-10px",
    transform: "rotate(-45deg)",
  },
});
export const Corners2 = styled("div")({
  "&::before,&::after": {
    content: '""',
    position: "absolute",
    width: "40px",
    height: "40px",
    border: " 1px solid black",

    background: "rgba(200, 200, 200, 0.8)" /* Grey color for tape */,
    zIndex: "1",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" /* Shadow for tape */,
  },

  /* Top right corner */
  "&::before": {
    top: "-10px",
    right: "-10px",
    transform: "rotate(45deg)",
  },

  /* Bottom right corner */
  "&::after ": {
    bottom: "-10px",
    right: "-10px",
    transform: "rotate(45deg)",
  },
});
export const Title = styled(Typography)(({ textAlign }) => ({
  fontSize: "25px",
  textAlign: textAlign || "left",
  fontWeight: "bold",
  width: "100%",
}));

// export const subTitle = css`
//   font-size: 17px;
// `;
export const SubTitle = styled(Typography)({
  fontSize: "22px",
  textAlign: "left",
  marginBlock: "20px",
});

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