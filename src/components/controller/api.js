import moment from "moment";

const schoolIdMapping = require("../utils/school_site_id_mapping.json");

const getSiteIdFromSchoolName = (schoolName) => {
  const results = schoolIdMapping.find(
    (school) => (school.schoolName = schoolName)
  );
  return results.siteId;
};

export async function submitForm(data, showSuccessModal) {
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
    ContactType: `${process.env.REACT_APP_CONTACTRECORDID}`,
    ContactRecordType: `${process.env.REACT_APP_CONTACTRECORDTYPE}`,
    SchoolName: data.schoolName.schoolname,
    SchoolSiteId: data.schoolName.schoolname
      ? getSiteIdFromSchoolName(data.schoolName.schoolname)
      : "",
  };
  const id = `${process.env.REACT_APP_CLIENT_ID}`;
  const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;

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

  fetch(`${process.env.REACT_APP_BASEURL}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      showSuccessModal();
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}
