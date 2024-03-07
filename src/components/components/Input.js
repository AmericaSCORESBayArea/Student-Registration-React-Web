import { Box, IconButton, Modal } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import InfoIcon from "@mui/icons-material/Info";
import { InfoModal } from "../utils/Modal";

const Input = ({
  innerRef,
  fieldName,
  label,
  placeholder,
  type,
  errors,
  touched,
  labelStyle,
  useCustomInput,
  disabled = false,
  showInfoButton = false,
  infoModalTexts,
}) => {
  const CustomInputComponent = (props) => (
    <textarea
      className="form-control"
      cols={5}
      rows={2}
      type="text"
      autoComplete="off"
      {...props}
    />
  );
  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <div className={labelStyle} ref={innerRef}>
        <label htmlFor={fieldName}>{label}</label>
        {showInfoButton && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => InfoModal(infoModalTexts)} //triggers info modal
          >
            {/*info button */}
            <IconButton
              aria-label="delete"
              disabled
              color="primary"
              sx={{ marginRight: -1 }}
            >
              <InfoIcon color="primary" fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
      {useCustomInput ? (
        <Field
          name={fieldName}
          type={type}
          as={CustomInputComponent}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          className={"form-control" + (errors && touched ? " is-invalid" : "")}
        />
      ) : (
        <Field
          name={fieldName}
          type={type}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          className={"form-control" + (errors && touched ? " is-invalid" : "")}
        />
      )}
      <ErrorMessage
        name={fieldName}
        component="div"
        className="invalid-feedback"
      />
    </div>
  );
};
export default Input;
