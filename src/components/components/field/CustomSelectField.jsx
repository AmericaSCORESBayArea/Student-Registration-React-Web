import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
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
  textFieldContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid lightgray",
  },
  inputBase: {
    width: "100%",
    padding: "10px 12px",
    border: "none",
    "&:focus": {
      borderColor: "#3f51b5",
      boxShadow: "0 0 5px rgba(63, 81, 181, 0.5)",
    },
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
}));

const CustomSelectField = ({
  fieldName,
  label,
  options,
  value,
  onChange,
  error,
  touched,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.formControl}>
      <label htmlFor={fieldName} className={classes.label}>
        {label}
      </label>
      <div className={classes.textFieldContainer}>
        <select
          id={fieldName}
          name={fieldName}
          className={classes.inputBase}
          value={value} // Set value to empty string if value is undefined or null
          onChange={onChange}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {touched && error && <div className={classes.errorText}>{error}</div>}
    </div>
  );
};

export default CustomSelectField;
