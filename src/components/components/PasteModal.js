/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStore from "../../store/useStore";

const PasteModal = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pastedData, setPastedDataTemp] = useState("");
  const setPastedData = useStore((state) => state.setPastedData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputValue("");
    setPastedDataTemp("");
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData("Text");
    setInputValue(paste);
    setPastedDataTemp(paste);
  };

  const handlePasteProcess = () => {
    const lines = pastedData.split("\n").filter((line) => line.trim() !== "");
    const newRows = lines.map((line) => {
      const parts = line.split("\t").map((part) => part.replace(/\r$/, ""));
      return {
        firstName: parts[0] || "",
        lastName: parts[1] || "",
      };
    });
    setPastedData(newRows);
    handleClose();
  };

  const tableStyle = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 10px;
    margin-top: 20px;
  `;

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Paste Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Paste Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste your data here so that it can be processed.
          </DialogContentText>
          {!pastedData ? (
            <TextField
              autoFocus
              required
              margin="dense"
              id="paste-field"
              name="paste-field"
              label="Paste here"
              type="text"
              fullWidth
              variant="standard"
              onPaste={handlePaste}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <></>
          )}
          <div css={tableStyle}>
            <div>
              <strong>First Name</strong>
            </div>
            <div>
              <strong>Last Name</strong>
            </div>
            {/* Here, you can map over the pasted data to display it */}
            {pastedData.split("\n").map((line, index) => {
              const parts = line
                .split("\t")
                .map((part) => part.replace(/\r$/, ""));
              return (
                <React.Fragment key={index}>
                  <div>{parts[0] || "-"}</div>
                  <div>{parts[1] || "-"}</div>
                </React.Fragment>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePasteProcess}>Paste</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PasteModal;
