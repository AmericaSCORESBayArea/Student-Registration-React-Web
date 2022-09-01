import React, { useState, useEffect, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { ModalwithConfirmation } from "../utils/Modal";
import { WaiverModal } from "../utils/WaiverModal";
import "../styles/RadioButton.css";
import { regionsArray, schoolsName, gradesArray } from "./multiplesArray";
import { MissingFieldsValidation } from "./MissingFieldsValidation";
import Select from "react-select";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FormTitles } from "../utils/FormTitles";

const useStyles = makeStyles((theme) => ({
  paper: {
    //display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    paddingInline: "50px",
    borderRadius: 15,
    marginTop: "30px",
    backgroundColor: "#f8f5f4",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: " #BF6D3A",
  },
  inputForm: {
    borderRadius: 5,
    borderColor: "gray",
    width: "100%",
  },
  label: {
    textAlign: "left",
    paddingBottom: "5px",
  },
}));
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

export default function Form(props) {
  const classes = useStyles();
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const ethnicityOptions = props.formTranslations.ethnicityArray.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const relationshipOptions = props.formTranslations.relationshipArray.sort(
    (a, b) => a.label.localeCompare(b.label)
  );
  const genderOptions = props.formTranslations.genderArray.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const parent_Home_Lang_Options =
    props.formTranslations.parent_Home_Lang_Array.sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [width, setWidth] = useState(window.innerWidth);
  const [schoolsArray, setSchoolsArray] = useState("");
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  const options = schoolsArray;
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const customStyles = {
    control: (base, { isDisabled }) => ({
      ...base,
      height: 28,
      minHeight: 28,
      borderWidth: 0,
      textAlign: "left",
      boxShadow: "none",
      backgroundColor: isDisabled ? "white" : "white",
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
    }),
  };
  function useClientRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback((node) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect().top);
      }
    }, []);
    return [rect, ref];
  }
  const [rect, ref] = useClientRect();
  const [rectLName, refLName_field] = useClientRect();
  const [rectRegion, refRegion] = useClientRect();
  const [rectSchoolName, refSchoolName] = useClientRect();
  const [rectBirthdate, refBirthdate] = useClientRect();
  const [rectGender, refGender] = useClientRect();
  const [rectGrade, refGrade] = useClientRect();
  const [rectEthnicity, refEthnicity] = useClientRect();
  const [rectReduced, refReduced] = useClientRect();
  const [rectParentFName, refParentFName] = useClientRect();
  const [rectParentLName, refParentLName] = useClientRect();
  const [rectParentPhone, refParentPhone] = useClientRect();
  const [rectRelationship, refRelationship] = useClientRect();
  const [rectEmergencyName, refEmergencyName] = useClientRect();
  const [rectEmergencyRelationship, refEmergencyRelationship] = useClientRect();
  const [rectEmergencyPhone, refEmergencyPhone] = useClientRect();
  const [show, setShow] = useState(false);
  const confirmedRegistration = () => {
    window.open("https://scoresu.org/family", "_blank").focus();
    props.handleReset();
  };
  const formFieldsRef = {
    firstName_field: rect,
    lastName_field: rectLName,
    region_field: rectRegion,
    schoolName_field: rectSchoolName,
    birthdate_field: rectBirthdate,
    gender_field: rectGender,
    grade_field: rectGrade,
    ethnicity_field: rectEthnicity,
    reducedPriceLunch_field: rectReduced,
    parentFName_field: rectParentFName,
    parentLName_field: rectParentLName,
    parentPhone_field: rectParentPhone,
    relationship_field: rectRelationship,
    emergency_Contact_Name_field: rectEmergencyName,
    emergency_Contact_Relationship_field: rectEmergencyRelationship,
    emergency_Contact_Phone1_field: rectEmergencyPhone,
  };
  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 0, sm: 0, md: 10, lg: 10 }}
    >
      <CssBaseline />
      <Grid
        align="center"
        justify="center"
        alignItems="center"
        item
        xs={12}
        sm={12}
        md={12}
      >
        <div
          className={classes.paper}
          style={{
            width: width < 720 ? "100%" : width < 1380 ? "50%" : "30%",
          }}
        >
          <Formik
            initialValues={{
              firstName: "",
              middleName: "",
              lastName: "",
              schoolName: { region: "", schoolname: "" },
              studentEmail: "",
              studentphoneNumber: "",
              birthdate: new Date(),
              gender: "",
              grade: "",
              ethnicity: "",
              reducedPriceLunch: "",
              allergies: "",
              parentFName: "",
              parentLName: "",
              parentEmail: "",
              relationship: "",
              parentPhone1: "",
              parentPhone2: "",
              mailingStreet: "",
              mailingCity: "",
              mailingState: "",
              mailingZip: 0,
              mailingCountry: "US",
              parentHomeLang: "",
              otherLang: "",
              volunteer: "",
              emergency_Contact_Name: "",
              emergency_Contact_Relationship: "",
              emergency_Contact_Phone1: "",
              emergency_Contact_Phone2: "",
              second_Emergency_Contact_Name: "",
              second_Emergency_Contact_Relationship: "",
              second_Emergency_Contact_Phone1: "",
              second_Emergency_Contact_Phone2: "",
              waiver: false,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required(
                props.formTranslations.required_fields
              ),
              lastName: Yup.string().required(
                props.formTranslations.required_fields
              ),
              schoolName: Yup.object({
                region: Yup.string().required(
                  props.formTranslations.required_fields
                ),
                schoolname: Yup.string().required(
                  props.formTranslations.required_fields
                ),
              }),
              studentEmail: Yup.string().email(
                props.formTranslations.invalid_email
              ),
              studentphoneNumber: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              StartDate: Yup.date(),
              birthdate: Yup.date()
                .required(props.formTranslations.required_fields)
                .max(date, props.formTranslations.required_fields),
              gender: Yup.string().required(
                props.formTranslations.required_fields
              ),
              grade: Yup.string().required(
                props.formTranslations.required_fields
              ),
              ethnicity: Yup.string().required(
                props.formTranslations.required_fields
              ),
              parentFName: Yup.string().required(
                props.formTranslations.required_fields
              ),
              parentLName: Yup.string().required(
                props.formTranslations.required_fields
              ),
              parentEmail: Yup.string().email(
                props.formTranslations.invalid_email
              ),
              relationship: Yup.string().required(
                props.formTranslations.required_fields
              ),
              reducedPriceLunch: Yup.string().required(
                props.formTranslations.required_fields
              ),
              parentPhone1: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number)
                .required(props.formTranslations.required_fields),
              parentPhone2: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              parentHomeLang: Yup.string().required(
                props.formTranslations.required_fields
              ),
              otherLang: Yup.string().when("parentHomeLang", {
                is: "Other",
                then: Yup.string().required(
                  props.formTranslations.required_fields
                ),
              }),
              emergency_Contact_Name: Yup.string().required(
                props.formTranslations.required_fields
              ),
              emergency_Contact_Relationship: Yup.string().required(
                props.formTranslations.required_fields
              ),
              emergency_Contact_Phone1: Yup.string()
                .required(props.formTranslations.required_fields)
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              emergency_Contact_Phone2: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              second_Emergency_Contact_Phone1: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              second_Emergency_Contact_Phone2: Yup.string()
                .matches(
                  phoneRegExp,
                  props.formTranslations.invalid_phone_number
                )
                .min(10, props.formTranslations.invalid_phone_number)
                .max(10, props.formTranslations.invalid_phone_number),
              waiver: Yup.bool().oneOf(
                [true],
                props.formTranslations.required_waiver
              ),
            })}
            onSubmit={(data, { resetForm }) => {
              ModalwithConfirmation(
                props.modalTranslations,
                confirmedRegistration,
                "success",
                props.handleReset
              );
            }}
          >
            {({
              values,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              formik,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormTitles title={props.formTranslations.formTitle1} />
                  <div className={classes.inputForm}>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={ref}
                    >
                      <div className={classes.label}>
                        <label htmlFor="firstName">
                          {props.formTranslations.firstName_field}
                        </label>
                      </div>
                      <Field
                        name="firstName"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.firstName_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="middleName">
                          {props.formTranslations.middleName_field}
                        </label>
                      </div>
                      <Field
                        name="middleName"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.middleName_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.middleName && touched.middleName
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refLName_field}
                    >
                      <div className={classes.label}>
                        <label htmlFor="lastName">
                          {props.formTranslations.lastName_field}
                        </label>
                      </div>
                      <Field
                        name="lastName"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.lastName_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.lastName && touched.lastName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label} ref={refRegion}>
                        <label htmlFor="schoolName">
                          {props.formTranslations.schoolName_field}
                        </label>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          marginBottom: "20px",
                          backgroundColor: "#b3d7fc",
                          padding: "15px",
                          borderRadius: 10,
                        }}
                      >
                        <div className={classes.label}>
                          <label htmlFor="schoolName.region">
                            {props.formTranslations.schoolName_region_field}
                          </label>
                        </div>
                        <Select
                          styles={customStyles}
                          menuPlacement="auto"
                          name="schoolName.region"
                          placeholder={
                            props.formTranslations
                              .schoolName_region_field_placeholder
                          }
                          options={regionsArray}
                          className={
                            "form-control" +
                            (errors.schoolName?.region &&
                            touched.schoolName?.region
                              ? " is-invalid"
                              : "")
                          }
                          onChange={(selectedOption) => {
                            let region;
                            for (region in schoolsName) {
                              if (region === selectedOption.value) {
                                let aux = schoolsName[region];
                                setSchoolsArray(
                                  aux.schools.sort((a, b) =>
                                    a.label.localeCompare(b.label)
                                  )
                                );
                              }
                            }
                            setFieldValue(
                              "schoolName.region",
                              selectedOption.value
                            );
                          }}
                        />
                        <ErrorMessage
                          name="schoolName.region"
                          component="div"
                          className="invalid-feedback"
                        />
                        <div
                          className={classes.label}
                          style={{ marginTop: "20px" }}
                          ref={refSchoolName}
                        >
                          <label htmlFor="schoolName.schoolname">
                            {props.formTranslations.schoolName_schoolname_field}
                          </label>
                          <Select
                            isDisabled={
                              values.schoolName.region.length === 0
                                ? true
                                : false
                            }
                            styles={customStyles}
                            menuPlacement="auto"
                            placeholder={
                              props.formTranslations
                                .schoolName_schoolname_field_placeholder
                            }
                            name="schoolName.schoolname"
                            options={options}
                            className={
                              "form-control" +
                              (errors.schoolName?.schoolname &&
                              touched.schoolName?.schoolname
                                ? " is-invalid"
                                : "")
                            }
                            onChange={(selectedOption) =>
                              setFieldValue(
                                "schoolName.schoolname",
                                selectedOption.value
                              )
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="schoolName.schoolname"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="studentEmail">
                          {props.formTranslations.studentEmail_field}
                        </label>
                      </div>
                      <Field
                        name="studentEmail"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.studentEmail_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.studentEmail && touched.studentEmail
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="studentEmail"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="studentphoneNumber">
                          {props.formTranslations.studentphoneNumber_field}
                        </label>
                      </div>
                      <Field
                        name="studentphoneNumber"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.studentphoneNumber_field
                        }
                        className={
                          "form-control" +
                          (errors.studentphoneNumber &&
                          touched.studentphoneNumber
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="studentphoneNumber"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label} ref={refBirthdate}>
                        <label
                          htmlFor="birthdate"
                          style={{ marginBottom: "10px" }}
                        >
                          {props.formTranslations.birthdate_field}
                        </label>
                      </div>
                      <MobileDatePicker
                        inputVariant="outlined"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        label={
                          props.formTranslations.birthdate_field_placeholder
                        }
                        name="birthdate"
                        value={values.birthdate}
                        onChange={(newValue) =>
                          setFieldValue("birthdate", newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            variant="outlined"
                            {...params}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <CalendarMonthIcon />
                                </InputAdornment>
                              ),
                              disableUnderline: true,
                            }}
                          />
                        )}
                        className={
                          "form-control" +
                          (errors.birthdate && touched.birthdate
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="birthdate"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refGender}
                    >
                      <div className={classes.label}>
                        <label htmlFor="gender">
                          {props.formTranslations.gender_field}
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations.gender_field_placeholder
                        }
                        name="gender"
                        options={genderOptions}
                        className={
                          "form-control" +
                          (errors.gender && touched.gender ? " is-invalid" : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue("gender", selectedOption.value)
                        }
                      />
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refGrade}
                    >
                      <div className={classes.label}>
                        <label htmlFor="grade">
                          {props.formTranslations.grade_field}
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations.grade_field_placeholder
                        }
                        name="grade"
                        options={gradesArray}
                        className={
                          "form-control" +
                          (errors.grade && touched.grade ? " is-invalid" : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue("grade", selectedOption.value)
                        }
                      />
                      <ErrorMessage
                        name="grade"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="ethnicity" ref={refEthnicity}>
                          {props.formTranslations.ethnicity_field}
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations.ethnicity_field_placeholder
                        }
                        name="ethnicity"
                        options={ethnicityOptions}
                        className={
                          "form-control" +
                          (errors.ethnicity && touched.ethnicity
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue("ethnicity", selectedOption.value)
                        }
                      />
                      <ErrorMessage
                        name="ethnicity"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      role="group"
                      aria-labelledby="my-radio-group"
                      style={{ textAlign: "left", marginBottom: "20px" }}
                      ref={refReduced}
                    >
                      <div className={classes.label}>
                        <label htmlFor="reducedPriceLunch">
                          {props.formTranslations.reducedPriceLunch_field}
                        </label>
                      </div>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="reducedPriceLunch"
                          value="yes"
                        />
                        {
                          props.formTranslations
                            .reducedPriceLunch_field_placeholder_confirm
                        }
                      </label>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="reducedPriceLunch"
                          value="no"
                        />
                        {
                          props.formTranslations
                            .reducedPriceLunch_field_placeholder_denied
                        }
                      </label>
                      {errors.reducedPriceLunch && touched.reducedPriceLunch ? (
                        <div
                          style={{
                            textAlign: "center",
                            color: "#dc3545",
                            fontSize: ".875em",
                            marginTop: ".25rem",
                          }}
                        >
                          {errors.reducedPriceLunch}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "40px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="allergies">
                          {props.formTranslations.allergies_field}
                        </label>
                      </div>
                      <Field
                        name="allergies"
                        as={CustomInputComponent}
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.allergies_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.allergies && touched.allergies
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <FormTitles title={props.formTranslations.formTitle2} />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px", marginTop: "5px" }}
                      ref={refParentFName}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentFName">
                          {props.formTranslations.parentFName_field}
                        </label>
                      </div>
                      <Field
                        name="parentFName"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.parentFName_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.parentFName && touched.parentFName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="parentFName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refParentLName}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentLName">
                          {props.formTranslations.parentLName_field}
                        </label>
                      </div>
                      <Field
                        name="parentLName"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.parentLName_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.parentLName && touched.parentLName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="parentFName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentEmail">
                          {props.formTranslations.parentEmail_field}
                        </label>
                      </div>
                      <Field
                        name="parentEmail"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.parentEmail_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.parentEmail && touched.parentEmail
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="parentEmail"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refRelationship}
                    >
                      <div className={classes.label}>
                        <label htmlFor="relationship">
                          {props.formTranslations.relationship_field}
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations.relationship_field_placeholder
                        }
                        name="relationship"
                        options={relationshipOptions}
                        className={
                          "form-control" +
                          (errors.relationship && touched.relationship
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue("relationship", selectedOption.value)
                        }
                      />
                      <ErrorMessage
                        name="relationship"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refParentPhone}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentPhone1">
                          {props.formTranslations.parentPhone1_field}
                        </label>
                      </div>
                      <Field
                        name="parentPhone1"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.parentPhone1_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.parentPhone1 && touched.parentPhone1
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="parentPhone1"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentPhone2">
                          {props.formTranslations.parentPhone2_field}
                        </label>
                      </div>
                      <Field
                        name="parentPhone2"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.parentPhone2_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.parentPhone2 && touched.parentPhone2
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="mailingStreet">
                          {props.formTranslations.mailingStreet_field}
                        </label>
                      </div>
                      <Field
                        name="mailingStreet"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.mailingStreet_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.mailingStreet && touched.mailingStreet
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="mailingCity">
                          {props.formTranslations.mailingCity_field}
                        </label>
                      </div>
                      <Field
                        name="mailingCity"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.mailingCity_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.mailingCity && touched.mailingCity
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="mailingState">
                          {props.formTranslations.mailingState_field}
                        </label>
                      </div>
                      <Field
                        name="mailingState"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.mailingState_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.mailingState && touched.mailingState
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="mailingZip">
                          {props.formTranslations.mailingZip_field}
                        </label>
                      </div>
                      <input
                        name="mailingZip"
                        type="number"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations.mailingZip_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.mailingZip && touched.mailingZip
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="mailingCountry">
                          {props.formTranslations.mailingCountry_field}
                        </label>
                      </div>
                      <Field
                        name="mailingCountry"
                        value={values.mailingCountry}
                        type="text"
                        disabled={true}
                        autoComplete="off"
                        className={
                          "form-control" +
                          (errors.mailingCountry && touched.mailingCountry
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentHomeLang">
                          {props.formTranslations.parentHomeLang_field}
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations
                            .parentHomeLang_field_placeholder
                        }
                        name="parentHomeLang"
                        options={parent_Home_Lang_Options}
                        className={
                          "form-control" +
                          (errors.parentHomeLang && touched.parentHomeLang
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue("parentHomeLang", selectedOption.value)
                        }
                      />
                      <ErrorMessage
                        name="parentHomeLang"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    {values.parentHomeLang === "Other" ? (
                      <div
                        className="form-group"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className={classes.label}>
                          <label htmlFor="otherLang">
                            {props.formTranslations.parentHomeLang_field}
                          </label>
                        </div>
                        <Field
                          name="otherLang"
                          type="text"
                          autoComplete="off"
                          placeholder={
                            props.formTranslations
                              .parentHomeLang_field_input_placeholder
                          }
                          className={
                            "form-control" +
                            (errors.otherLang && touched.otherLang
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="otherLang"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    ) : null}
                    <div
                      className="form-group"
                      role="group"
                      aria-labelledby="my-radio-group"
                      style={{ textAlign: "left", marginBottom: "40px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="volunteer">
                          {props.formTranslations.volunteer_field}
                        </label>
                      </div>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="volunteer"
                          value="yes"
                        />
                        {
                          props.formTranslations
                            .volunteer_field_placeholder_confirm
                        }
                      </label>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="volunteer"
                          value="no"
                        />
                        {
                          props.formTranslations
                            .volunteer_field_placeholder_denied
                        }
                      </label>
                      <ErrorMessage
                        name="volunteer"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <FormTitles title={props.formTranslations.formTitle3} />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refEmergencyName}
                    >
                      <div className={classes.label}>
                        <label htmlFor="emergency_Contact_Name">
                          {props.formTranslations.emergency_Contact_Name_field}
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Name"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .emergency_Contact_Name_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.emergency_Contact_Name &&
                          touched.emergency_Contact_Name
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="emergency_Contact_Name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refEmergencyRelationship}
                    >
                      <div className={classes.label}>
                        <label htmlFor="emergency_Contact_Relationship">
                          {
                            props.formTranslations
                              .emergency_Contact_Relationship_field
                          }
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations
                            .emergency_Contact_Relationship_field_placeholder
                        }
                        name="emergency_Contact_Relationship"
                        options={relationshipOptions}
                        className={
                          "form-control" +
                          (errors.emergency_Contact_Relationship &&
                          touched.emergency_Contact_Relationship
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue(
                            "emergency_Contact_Relationship",
                            selectedOption.value
                          )
                        }
                      />
                      <ErrorMessage
                        name="emergency_Contact_Relationship"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refEmergencyPhone}
                    >
                      <div className={classes.label}>
                        <label htmlFor="emergency_Contact_Phone1">
                          {
                            props.formTranslations
                              .emergency_Contact_Phone1_field
                          }
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Phone1"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .emergency_Contact_Phone1_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.emergency_Contact_Phone1 &&
                          touched.emergency_Contact_Phone1
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="emergency_Contact_Phone1"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "40px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="emergency_Contact_Phone2">
                          {
                            props.formTranslations
                              .emergency_Contact_Phone2_field
                          }
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Phone2"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .emergency_Contact_Phone2_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.emergency_Contact_Phone2 &&
                          touched.emergency_Contact_Phone2
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="emergency_Contact_Phone2"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <FormTitles title={props.formTranslations.formTitle4} />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Name">
                          {
                            props.formTranslations
                              .second_Emergency_Contact_Name_field
                          }
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Name"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .second_Emergency_Contact_Name_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.second_Emergency_Contact_Name &&
                          touched.second_Emergency_Contact_Name
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Relationship">
                          {
                            props.formTranslations
                              .second_Emergency_Contact_Relationship_field
                          }
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder={
                          props.formTranslations
                            .second_Emergency_Contact_Relationship_field_placeholder
                        }
                        name="second_Emergency_Contact_Relationship"
                        options={relationshipOptions}
                        className={
                          "form-control" +
                          (errors.second_Emergency_Contact_Relationship &&
                          touched.second_Emergency_Contact_Relationship
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(selectedOption) =>
                          setFieldValue(
                            "second_Emergency_Contact_Relationship",
                            selectedOption.value
                          )
                        }
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Phone1">
                          {
                            props.formTranslations
                              .second_Emergency_Contact_Phone1_field
                          }
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Phone1"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .second_Emergency_Contact_Phone1_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.second_Emergency_Contact_Phone1 &&
                          touched.second_Emergency_Contact_Phone1
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="second_Emergency_Contact_Phone1"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Phone2">
                          {
                            props.formTranslations
                              .second_Emergency_Contact_Phone2_field
                          }
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Phone2"
                        type="text"
                        autoComplete="off"
                        placeholder={
                          props.formTranslations
                            .second_Emergency_Contact_Phone2_field_placeholder
                        }
                        className={
                          "form-control" +
                          (errors.second_Emergency_Contact_Phone2 &&
                          touched.second_Emergency_Contact_Phone2
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="second_Emergency_Contact_Phone2"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "40px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="waiver">
                          {props.formTranslations.waiver_field}
                        </label>
                      </div>
                      <label
                        style={{
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Field
                          type="checkbox"
                          name="waiver"
                          id="cb1"
                          disabled
                        />
                        <Button size={"small"} onClick={() => setShow(true)}>
                          {props.formTranslations.waiver_field_button}
                        </Button>
                      </label>
                      {errors.waiver && touched.waiver ? (
                        <div
                          style={{
                            textAlign: "center",
                            color: "#dc3545",
                            fontSize: ".875em",
                            marginTop: ".25rem",
                          }}
                        >
                          {errors.waiver}
                        </div>
                      ) : null}
                    </div>
                    <MissingFieldsValidation
                      values={values}
                      fieldsRef={formFieldsRef}
                      formTranslations={props.formTranslations}
                    />
                    {show === true ? (
                      <WaiverModal
                        confirmButton={
                          props.formTranslations.waiverModal_confirm
                        }
                        deniedButton={props.formTranslations.waiverModal_denied}
                        function={() => setShow(false)}
                        checkboxFunction={setFieldValue}
                      />
                    ) : null}
                    <div
                      className="form-group"
                      style={{
                        display: "flex",
                        justifyContent: width < 1000 ? "center" : "flex-end",
                        marginTop: "8%",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        size={"medium"}
                        variant="contained"
                        onClick={() => props.function_back()}
                        style={{
                          marginRight: "2%",
                          backgroundColor: "#5c6370",
                        }}
                      >
                        {props.backButton}
                      </Button>
                      <Button
                        size={"medium"}
                        variant="contained"
                        onClick={() => handleSubmit()}
                      >
                        {props.submitButton}
                      </Button>
                    </div>
                  </div>
                </LocalizationProvider>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
