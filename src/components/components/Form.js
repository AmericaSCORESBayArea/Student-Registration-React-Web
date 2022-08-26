import React, { useState, useEffect, useRef, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../styles/RadioButton.css";
import {
  regionsArray,
  schoolsName,
  genderArray,
  gradesArray,
  ethnicityArray,
  relationshipArray,
  parent_Home_Lang_Array,
} from "./multiplesArray";
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
  const history = useNavigate();
  const date = new Date();
  const ethnicityOptions = ethnicityArray.sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const relationshipOptions = relationshipArray.sort((a, b) =>
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
  console.log(rectGrade, rectLName);
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
  console.log(formFieldsRef);
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
              StartDate: new Date(date.getDate() - 1),
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
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("Field is required (*)"),
              lastName: Yup.string().required("Field is required (*)"),
              schoolName: Yup.object({
                region: Yup.string().required("Field is required (*)"),
                schoolname: Yup.string().required("Field is required (*)"),
              }),
              studentEmail: Yup.string().email("Email is not valid"),
              studentphoneNumber: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
              StartDate: Yup.date(),
              birthdate: Yup.date()
                .required("Field is required (*)")
                .max(Yup.ref("StartDate"), "Field is required (*)"),
              gender: Yup.string().required("Field is required (*)"),
              grade: Yup.string().required("Field is required (*)"),
              ethnicity: Yup.string().required("Field is required (*)"),
              parentFName: Yup.string().required("Field is required (*)"),
              parentLName: Yup.string().required("Field is required (*)"),
              parentEmail: Yup.string().email("Email is not valid"),
              relationship: Yup.string().required("Field is required (*)"),
              reducedPriceLunch: Yup.string().required("Field is required (*)"),
              parentPhone1: Yup.string()
                .matches(phoneRegExp, "Phone number is not valid")
                .required("Field is required (*)"),
              parentPhone2: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
              parentHomeLang: Yup.string().required("Field is required (*)"),
              otherLang: Yup.string().when("parentHomeLang", {
                is: "Other",
                then: Yup.string().required("Field is required (*)"),
              }),
              emergency_Contact_Name: Yup.string().required(
                "Field is required (*)"
              ),
              emergency_Contact_Relationship: Yup.string().required(
                "Field is required (*)"
              ),
              emergency_Contact_Phone1: Yup.string()
                .matches(phoneRegExp, "Phone number is not valid")
                .required("Field is required (*)"),
              emergency_Contact_Phone2: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
              second_Emergency_Contact_Phone1: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
              second_Emergency_Contact_Phone2: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
              ),
            })}
            onSubmit={(data) => {
              console.log(data);
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
                  <FormTitles title={"Students details"} />
                  <div className={classes.inputForm}>
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={ref}
                    >
                      <div className={classes.label}>
                        <label htmlFor="firstName">First Name*</label>
                      </div>
                      <Field
                        name="firstName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter first name"
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
                        <label htmlFor="middleName">Middle Name</label>
                      </div>
                      <Field
                        name="middleName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter middle name"
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
                        <label htmlFor="lastName">Last Name*</label>
                      </div>
                      <Field
                        name="lastName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter last name"
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
                        <label htmlFor="schoolName">School Name*</label>
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
                          <label htmlFor="schoolName.region">Region*</label>
                        </div>
                        <Select
                          styles={customStyles}
                          menuPlacement="auto"
                          name="schoolName.region"
                          placeholder="Select..."
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
                            School Name*
                          </label>
                          <Select
                            isDisabled={
                              values.schoolName.region.length === 0
                                ? true
                                : false
                            }
                            styles={customStyles}
                            menuPlacement="auto"
                            placeholder="Select..."
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
                        <label htmlFor="studentEmail">Student Email</label>
                      </div>
                      <Field
                        name="studentEmail"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter student email"
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
                          Student Phone
                        </label>
                      </div>
                      <Field
                        name="studentphoneNumber"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter student phone"
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
                          Birthdate*
                        </label>
                      </div>
                      <MobileDatePicker
                        inputVariant="outlined"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        label={"Birthdate"}
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
                        <label htmlFor="gender">Gender*</label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
                        name="gender"
                        options={genderArray}
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
                        <label htmlFor="grade">Grade*</label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
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
                          Ethnicity*
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
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
                          Does your child receive Free or Reduced Price Lunch?*
                        </label>
                      </div>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="reducedPriceLunch"
                          value="yes"
                        />
                        Yes
                      </label>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="reducedPriceLunch"
                          value="no"
                        />
                        No
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
                          Allergies/Medical Conditions
                        </label>
                      </div>
                      <Field
                        name="allergies"
                        as={CustomInputComponent}
                        autoComplete="off"
                        placeholder="Enter allergies/medical conditions"
                        className={
                          "form-control" +
                          (errors.allergies && touched.allergies
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </div>
                    <FormTitles title="Parent/Guardian Information" />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px", marginTop: "5px" }}
                      ref={refParentFName}
                    >
                      <div className={classes.label}>
                        <label htmlFor="parentFName">
                          Parent/Guardian First Name*
                        </label>
                      </div>
                      <Field
                        name="parentFName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter parent/guardian first name"
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
                          Parent/Guardian Last Name*
                        </label>
                      </div>
                      <Field
                        name="parentLName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter parent/guardian last name"
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
                          Parent/Guardian Email
                        </label>
                      </div>
                      <Field
                        name="parentEmail"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter parent/guardian email"
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
                          Relationship to Child*
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
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
                          Parent/Guardian Phone 1*
                        </label>
                      </div>
                      <Field
                        name="parentPhone1"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter parent/guardian phone 1"
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
                          Parent/Guardian Phone 2
                        </label>
                      </div>
                      <Field
                        name="parentPhone2"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter parent/guardian phone 2"
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
                        <label htmlFor="mailingStreet">Mailing Street </label>
                      </div>
                      <Field
                        name="mailingStreet"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter mailing street"
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
                        <label htmlFor="mailingCity">Mailing City </label>
                      </div>
                      <Field
                        name="mailingCity"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter mailing city"
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
                          Mailing State/Province
                        </label>
                      </div>
                      <Field
                        name="mailingState"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter mailing state/province"
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
                        <label htmlFor="mailingZip">Mailing Zip</label>
                      </div>
                      <input
                        name="mailingZip"
                        type="number"
                        autoComplete="off"
                        placeholder="Enter mailing zip"
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
                        <label htmlFor="mailingCountry">Mailing Country</label>
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
                          Parent/Guardian Home Language*
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
                        name="parentHomeLang"
                        options={parent_Home_Lang_Array}
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
                            Parent/Guardian Home Language*
                          </label>
                        </div>
                        <Field
                          name="otherLang"
                          type="text"
                          autoComplete="off"
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
                          Volunteer for this program? (Parent/Guardian)
                        </label>
                      </div>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="volunteer"
                          value="yes"
                        />
                        Yes
                      </label>
                      <label id="radioLabel">
                        <Field
                          id="input"
                          type="radio"
                          name="volunteer"
                          value="no"
                        />
                        No
                      </label>
                      <ErrorMessage
                        name="volunteer"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <FormTitles title="Emergency Contact (Other than Parent/Guardian)" />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                      ref={refEmergencyName}
                    >
                      <div className={classes.label}>
                        <label htmlFor="emergency_Contact_Name">
                          Primary Emergency Contact (Other than Parent/Guardian
                          and Primary Emergency Contact)*
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Name"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter emergency contact name"
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
                          Emergency Relationship to Child*
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
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
                          Emergency Contact Phone 1*
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Phone1"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter emergency contact phone 1"
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
                          Emergency Contact Phone 2
                        </label>
                      </div>
                      <Field
                        name="emergency_Contact_Phone2"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter emergency contact phone 2"
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
                    <FormTitles title="Second Emergency Contact (Other than Parent/Guardian and Primary Emergency Contact)" />
                    <div
                      className="form-group"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Name">
                          Secondary Emergency Contact Name
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Name"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter secondary emergency contact name"
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
                          Secondary Emergency Relationship to Child
                        </label>
                      </div>
                      <Select
                        styles={customStyles}
                        menuPlacement="auto"
                        placeholder="Select..."
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
                          Secondary Emergency Phone 1
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Phone1"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter secondary emergency contact phone 1"
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
                      style={{ marginBottom: "40px" }}
                    >
                      <div className={classes.label}>
                        <label htmlFor="second_Emergency_Contact_Phone2">
                          Secondary Emergency Phone 2
                        </label>
                      </div>
                      <Field
                        name="second_Emergency_Contact_Phone2"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter secondary emergency contact phone 2"
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
                    <MissingFieldsValidation
                      values={values}
                      fieldsRef={formFieldsRef}
                    />
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
