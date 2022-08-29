import React from "react";

function MissingFieldsValidation(props) {
  function isAfterToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }
  const checkBirthdate = isAfterToday(props.values.birthdate);
  const requiredFields = [
    {
      label: "First Name",
      value: props.values.firstName,
      position: props.fieldsRef.firstName_field,
    },
    {
      label: "Last Name",
      value: props.values.lastName,
      position: props.fieldsRef.lastName_field,
    },
    {
      label: "Region",
      value: props.values.schoolName.region,
      position: props.fieldsRef.region_field,
    },
    {
      label: "School Name",
      value: props.values.schoolName.schoolname,
      position: props.fieldsRef.schoolName_field,
    },
    {
      label: "Birthdate",
      value: checkBirthdate === true ? props.values.birthdate : "",
      position: props.fieldsRef.birthdate_field,
    },
    {
      label: "Gender",
      gevaluender: props.values.gender,
      position: props.fieldsRef.gender_field,
    },
    {
      label: "Grade",
      value: props.values.grade,
      position: props.fieldsRef.grade_field,
    },
    {
      label: "Ethnicity",
      value: props.values.ethnicity,
      position: props.fieldsRef.ethnicity_field,
    },
    {
      label: "Does your child receive Free or Reduced Price Lunch?",
      value: props.values.reducedPriceLunch,
      position: props.fieldsRef.reducedPriceLunch_field,
    },
    {
      label: "Parent/Guardian First Name",
      value: props.values.parentFName,
      position: props.fieldsRef.parentFName_field,
    },
    {
      label: "Parent/Guardian Last Name",
      value: props.values.parentLName,
      position: props.fieldsRef.parentLName_field,
    },
    {
      label: "Parent/Guardian Phone 1",
      value: props.values.parentPhone1,
      position: props.fieldsRef.parentPhone_field,
    },
    {
      label: "Relationship to Child",
      value: props.values.relationship,
      position: props.fieldsRef.relationship_field,
    },
    {
      label:
        "Primary Emergency Contact (Other than Parent/Guardian and Primary Emergency Contact)",
      value: props.values.emergency_Contact_Name,
      position: props.fieldsRef.emergency_Contact_Name_field,
    },
    {
      label: "Emergency Relationship to Child",
      value: props.values.emergency_Contact_Relationship,
      position: props.fieldsRef.emergency_Contact_Relationship_field,
    },
    {
      label: "Emergency Phone 1",
      value: props.values.emergency_Contact_Phone1,
      position: props.fieldsRef.emergency_Contact_Phone1_field,
    },
  ];
  return (
    <div
      className="form-group"
      style={{
        marginBottom: "20px",
        backgroundColor: "#f78b95",
        borderRadius: 5,
        textAlign: "left",
        padding: "15px",
      }}
    >
      <p>Required Fields Missing :</p>
      <ul>
        {requiredFields.map((value) =>
          value.value === "" ? (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.scrollTo(0, value.position);
              }}
            >
              {value.label}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export { MissingFieldsValidation };
