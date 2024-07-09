import React from "react";
import { makeStyles } from "@mui/styles";
import { InputBase, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#BF6D3A",
  },
  inputForm: {
    display: "flex",
    flexDirection: "column",
    borderColor: "gray",
    width: "100%",
    marginTop: 5,
  },
  label: {
    textAlign: "left",
    paddingBottom: "5px",
  },
  inputLabel: {
    textAlign: "left",
    paddingBottom: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textFieldContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid lightgray",
  },
  inputBase: {
    padding: "10px 12px",
    "&:focus": {
      borderColor: "#3f51b5",
      boxShadow: "0 0 5px rgba(63, 81, 181, 0.5)",
    },
  },
  errorText: {
    color: "red",
    fontSize: "0.75rem",
    marginTop: theme.spacing(1),
  },
}));

const CustomTextField = ({ fieldName, label, value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.inputForm}>
      <label htmlFor={fieldName} className={classes.label}>
        {label}
      </label>
      <div className={classes.textFieldContainer}>
        <InputBase
          id={fieldName}
          name={fieldName}
          autoComplete="off"
          size="small"
          fullWidth
          value={value}
          onChange={onChange}
          classes={{
            input: classes.inputBase,
          }}
        />
      </div>
    </div>
  );
};

export default CustomTextField;
