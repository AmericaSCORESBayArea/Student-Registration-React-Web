import axios from "axios";
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
    Birthdate: moment(data.birthdate).format("MM-DD-YYYY"),
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
  axios.defaults.headers.common["client_id"] = id;
  axios.defaults.headers.common["client_secret"] = secret;
  console.log(student);

  await axios
    .post(`${process.env.REACT_APP_BASEURL}`, student, {
      mode: "cors",
      headers: {
        "Access-control-Allow-Origin": true,
      },
    })
    .then(
      (response) => {
        console.log(`Request Complete!`);
        showSuccessModal();
      },
      (error) => {
        console.error(`Request ERRORS!`);
        console.error(error);
      }
    );
}
