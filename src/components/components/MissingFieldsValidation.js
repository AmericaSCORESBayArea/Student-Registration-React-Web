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
      label: props.formTranslations.firstName_field,
      value: props.values.firstName,
      position: props.fieldsRef.firstName_field,
    },
    {
      label: props.formTranslations.lastName_field,
      value: props.values.lastName,
      position: props.fieldsRef.lastName_field,
    },
    {
      label: props.formTranslations.schoolName_region_field,
      value: props.values.schoolName.region,
      position: props.fieldsRef.region_field,
    },
    {
      label: props.formTranslations.schoolName_schoolname_field,
      value: props.values.schoolName.schoolname,
      position: props.fieldsRef.schoolName_field,
    },
    {
      label: props.formTranslations.birthdate_field,
      value: checkBirthdate === true ? props.values.birthdate : "",
      position: props.fieldsRef.birthdate_field,
    },
    {
      label: props.formTranslations.gender_field,
      gevaluender: props.values.gender,
      position: props.fieldsRef.gender_field,
    },
    {
      label: props.formTranslations.grade_field,
      value: props.values.grade,
      position: props.fieldsRef.grade_field,
    },
    {
      label: props.formTranslations.ethnicity_field,
      value: props.values.ethnicity,
      position: props.fieldsRef.ethnicity_field,
    },
    {
      label: props.formTranslations.reducedPriceLunch_field,
      value: props.values.reducedPriceLunch,
      position: props.fieldsRef.reducedPriceLunch_field,
    },
    {
      label: props.formTranslations.parentFName_field,
      value: props.values.parentFName,
      position: props.fieldsRef.parentFName_field,
    },
    {
      label: props.formTranslations.parentLName_field,
      value: props.values.parentLName,
      position: props.fieldsRef.parentLName_field,
    },
    {
      label: props.formTranslations.parentPhone1_field,
      value: props.values.parentPhone1,
      position: props.fieldsRef.parentPhone_field,
    },
    {
      label: props.formTranslations.parentHomeLang_field,
      value: props.values.parentHomeLang,
      position: props.fieldsRef.parent_Home_Lang_field,
    },
    {
      label: props.formTranslations.relationship_field,
      value: props.values.relationship,
      position: props.fieldsRef.relationship_field,
    },
    {
      label: props.formTranslations.emergency_Contact_Name_field,
      value: props.values.emergency_Contact_Name,
      position: props.fieldsRef.emergency_Contact_Name_field,
    },
    {
      label: props.formTranslations.emergency_Contact_Relationship_field,
      value: props.values.emergency_Contact_Relationship,
      position: props.fieldsRef.emergency_Contact_Relationship_field,
    },
    {
      label: props.formTranslations.emergency_Contact_Phone1_field,
      value: props.values.emergency_Contact_Phone1,
      position: props.fieldsRef.emergency_Contact_Phone1_field,
    },
  ];

  return (
    <React.Fragment>
      {requiredFields.every((element) => element.value !== "") === false ? (
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
          <p>{props.formTranslations.requiredFieldsTitle}</p>
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
      ) : null}
    </React.Fragment>
  );
}

export { MissingFieldsValidation };
