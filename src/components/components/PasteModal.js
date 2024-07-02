import React, { useState } from "react";
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
  const setPastedData = useStore((state) => state.setPastedData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputValue("");
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData("Text");
    const lines = paste.split("\n").filter((line) => line.trim() !== "");
    const newRows = lines.map((line) => {
      const parts = line.split("\t").map((part) => part.replace(/\r$/, ""));
      return {
        firstName: parts[0] || "",
        lastName: parts[1] || "",
      };
    });
    setInputValue(paste);
    setPastedData(newRows);
  };

  const onPasteClose = () => {
    handleClose();
  };

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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onPasteClose}> Paste</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PasteModal;
