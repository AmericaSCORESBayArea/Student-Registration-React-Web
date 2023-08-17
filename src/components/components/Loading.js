import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Loading(props) {
  return (
    <div>
      <Modal open={props.open} onClose={null}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            outline: "none",
          }}
        >
          <img
            style={{
              width: "300px",
              display: "flex",
              justifyContent: "center",
            }}
            src={require("../../assets/Scores_Logo.gif")}
            alt=""
          />
        </Box>
      </Modal>
    </div>
  );
}
