import axios from "axios";
import moment from "moment";
import firebase from "../../firebase/firebaseConfig";

const schoolIdMapping = require("../utils/school_site_id_mapping.json");

const getSiteIdFromSchoolName = (schoolName) => {
  const results = schoolIdMapping.find(
    (school) => JSON.stringify(school.schoolName) === JSON.stringify(schoolName)
  );
  return results.siteId;
};

export async function submitForm(data, showSuccessModal, showErrorModal) {
  firebase.analytics().logEvent("selected_school", {
    regionName: data.schoolName.region,
    schoolName: data.schoolName.schoolname,
  });
  const student = {
    FirstName: data.firstName,
    MiddleName: data.middleName,
    LastName: data.lastName,
    PersonalEmail: data.studentEmail,
    HomePhone: data.studentphoneNumber,
    Birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
    Gender: data.gender,
    Grade: data.grade,
    Ethnicity: data.ethnicity,
    ReducedPriceLunch: data.reducedPriceLunch,
    Allergies: data.allergies,
    PermissiontoCommuteAlone: "",
    ExternalStudentId: "",
    ExternalStudentIdSource: "",
    ParentFName: data.parentFName,
    ParentLName: data.parentLName,
    ParentEmail: data.parentEmail,
    Relationship: data.relationship,
    ParentPhone1: data.parentPhone1,
    ParentPhone2: data.parentPhone2,
    ParentPhone3: "",
    MailingStreet: data.mailingStreet,
    MailingCity: data.mailingCity,
    MailingState: data.mailingState,
    MailingZip: data.mailingZip,
    MailingCountry: data.mailingCountry,
    ParentEnglishFluency: "",
    ParentHomeLang: data.parentHomeLang,
    OtherLang: data.otherLang,
    Volunteer: data.volunteer,
    Emergency_Contact_Name: data.emergency_Contact_Name,
    Emergency_Contact_Relationship: data.emergency_Contact_Relationship,
    Emergency_Contact_Phone1: data.emergency_Contact_Phone1,
    Emergency_Contact_Phone2: data.emergency_Contact_Phone2,
    Emergency_Contact_Phone3: "",
    Emergency_Contact_Permission_to_Pickup_child: "",
    Second_Emergency_Contact_Name: data.second_Emergency_Contact_Name,
    Second_Emergency_Contact_Relationship:
      data.second_Emergency_Contact_Relationship,
    Second_Emergency_Contact_Phone1: data.second_Emergency_Contact_Phone1,
    Second_Emergency_Contact_Phone2: data.second_Emergency_Contact_Phone2,
    Second_Emergency_Contact_Phone3: "",
    Second_Emergency_Contact_Permission_to_Pickup_child: "",
    LiabilityWaiver: data.waiver,
    DataReleaseWaiver: data.waiver,
    MediaReleaseWaiver: data.waiver,
    SchoolName: data.attendingSchool,
    SchoolSiteId: data.schoolName.schoolname
      ? getSiteIdFromSchoolName(data.schoolName.schoolname)
      : "",
  };
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  axios.defaults.headers.common["client_id"] = id;
  axios.defaults.headers.common["client_secret"] = secret;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(student),
  };

  fetch(
    "https://salesforce-data-api-proxy-prod.us-e2.cloudhub.io/api/contacts",
    requestOptions
  )
    .then((response) => {
      if (response.status === 200) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: true,
          status: 200,
          message: "success",
        });
        showSuccessModal();
      } else if (response.status === 500) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: false,
          status: 500,
          message: "server error",
        });
        showErrorModal(500);
      } else if (response.status === 409) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: false,
          status: 409,
          message: "duplicate student",
        });
        showErrorModal(409);
      }
      response.text();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

export async function getContactInfo(phoneNumberProp) {
  let value = "";
  phoneNumberProp = phoneNumberProp.slice(2);
  const serviceProvider = "Phone";
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `https://salesforce-auth-api-prod.us-e2.cloudhub.io/api/auth/login?useridentifier=${phoneNumberProp}&serviceprovider=${serviceProvider}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (value = data))
    .catch((error) => console.log("error", error));
  return value;
}

export async function getStudents(student) {
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://salesforce-data-api-proxy-prod.us-e2.cloudhub.io/api/contacts/search?searchString=${student}`,
    requestOptions
  ).then((response) => {
    return response
      .json()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

export async function getContactRecordType(contactId) {
  let value = "";
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `https://salesforce-data-api-proxy-prod.us-e2.cloudhub.io/api/contacts/${contactId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (value = data))
    .catch((error) => console.log("error", error));
  return value;
}

export async function getStudentsByPhoneNumber(phoneNumber) {
  let value = "";
  phoneNumber = phoneNumber.slice(2);
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `https://salesforce-data-api-proxy-prod.us-e2.cloudhub.io/api/contacts/searchByPhoneNumber?phoneNumber=${phoneNumber}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (value = data))
    .catch((error) => console.log("error", error));
  return value;
}

export async function submitEditedForm(
  data,
  showSuccessModal,
  showErrorModal,
  studentId
) {
  firebase.analytics().logEvent("selected_school", {
    regionName: data.schoolName.region,
    schoolName: data.schoolName.schoolname,
  });
  const student = {
    FirstName: data.firstName,
    MiddleName: data.middleName,
    LastName: data.lastName,
    PersonalEmail: data.studentEmail,
    HomePhone: data.studentphoneNumber,
    Birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
    Gender: data.gender,
    Grade: data.grade,
    Ethnicity: data.ethnicity,
    ReducedPriceLunch: data.reducedPriceLunch,
    Allergies: data.allergies,
    PermissiontoCommuteAlone: "",
    ExternalStudentId: "",
    ExternalStudentIdSource: "",
    ParentFName: data.parentFName,
    ParentLName: data.parentLName,
    ParentEmail: data.parentEmail,
    Relationship: data.relationship,
    ParentPhone1: data.parentPhone1,
    ParentPhone2: data.parentPhone2,
    ParentPhone3: "",
    MailingStreet: data.mailingStreet,
    MailingCity: data.mailingCity,
    MailingState: data.mailingState,
    MailingZip: data.mailingZip,
    MailingCountry: data.mailingCountry,
    ParentEnglishFluency: "",
    ParentHomeLang: data.parentHomeLang,
    OtherLang: data.otherLang,
    Volunteer: data.volunteer,
    Emergency_Contact_Name: data.emergency_Contact_Name,
    Emergency_Contact_Relationship: data.emergency_Contact_Relationship,
    Emergency_Contact_Phone1: data.emergency_Contact_Phone1,
    Emergency_Contact_Phone2: data.emergency_Contact_Phone2,
    Emergency_Contact_Phone3: "",
    Emergency_Contact_Permission_to_Pickup_child: "",
    Second_Emergency_Contact_Name: data.second_Emergency_Contact_Name,
    Second_Emergency_Contact_Relationship:
      data.second_Emergency_Contact_Relationship,
    Second_Emergency_Contact_Phone1: data.second_Emergency_Contact_Phone1,
    Second_Emergency_Contact_Phone2: data.second_Emergency_Contact_Phone2,
    Second_Emergency_Contact_Phone3: "",
    Second_Emergency_Contact_Permission_to_Pickup_child: "",
    LiabilityWaiver: data.waiver,
    DataReleaseWaiver: data.waiver,
    MediaReleaseWaiver: data.waiver,
    SchoolName: data.attendingSchool,
    AccountId: data.schoolName.schoolname
      ? getSiteIdFromSchoolName(data.schoolName.schoolname)
      : "",
  };
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
  axios.defaults.headers.common["client_id"] = id;
  axios.defaults.headers.common["client_secret"] = secret;
  var myHeaders = new Headers();
  myHeaders.append("client_id", id);
  myHeaders.append("client_secret", secret);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(student),
  };
  fetch(
    `https://salesforce-data-api-proxy-prod.us-e2.cloudhub.io/api/contacts/${studentId}`,
    requestOptions
  )
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: true,
          status: 200,
          message: "success",
        });
        showSuccessModal();
      } else if (response.status === 500) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: false,
          status: 500,
          message: "server error",
        });
        showErrorModal(500);
      } else if (response.status === 409) {
        firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: false,
          status: 409,
          message: "duplicate student",
        });
        showErrorModal(409);
      }
      response.text();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}
