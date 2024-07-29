import axios from "axios";
import moment from "moment";
import firebase from "../../firebase/firebaseConfig";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const id = `${process.env.REACT_APP_CLIENT_ID}`;
const secret = `${process.env.REACT_APP_CLIENT_SECRET}`;
axios.defaults.headers.common["client_id"] = id;
axios.defaults.headers.common["client_secret"] = secret;

var myHeaders = new Headers();
myHeaders.append("client_id", id);
myHeaders.append("client_secret", secret);
myHeaders.append("Content-Type", "application/json");

export async function submitForm(
  data,
  schoolSiteId,
  showSuccessModal,
  showErrorModal,
  waiverInfo
) {
  firebase.analytics().logEvent("selected_school", {
    regionName: data.schoolName.region,
    schoolName: data.schoolName.schoolname,
  });

  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let timeZone = dayjs()
    .format("z")
    .toString()
    .replace(/\d+/g, "")
    .replace(/[^\w\s]/gi, "");

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
    SchoolSiteId: schoolSiteId,
  };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(student),
  };

  let response = await fetch(
    `${process.env.REACT_APP_BASEURL}/contacts`,
    requestOptions
  );
  if (response.status === 200) {
    let studentCreated = await response.json();
    const waiverData = {
      waiverResponse: "Acceptance",
      datetime: dayjs().format("YYYY-MM-DDTHH:mm:ss") + timeZone,
      contactId: studentCreated.ContactId,
      contactEmail: data.parentEmail,
    };

    var requestOptionsWaiver = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(waiverData),
    };
    await firebase.analytics().logEvent("form_complete", {
      app: "web_registration",
      completed: "true",
      status: "200",
      message: "success",
    });
    await fetch(
      `${process.env.REACT_APP_BASEURL}/waiver/${waiverInfo.waiverId}`,
      requestOptionsWaiver
    ).then((response) => {
      if (response.status === 200) {
        showSuccessModal();
      } else {
        showErrorModal(505);
      }
    });
  } else if (response.status === 500) {
    await firebase.analytics().logEvent("form_complete", {
      app: "web_registration",
      completed: "false",
      status: "500",
      message: "server error",
    });
    showErrorModal(500);
  } else if (response.status === 409) {
    await firebase.analytics().logEvent("form_complete", {
      app: "web_registration",
      completed: "false",
      status: "409",
      message: "duplicate student",
    });
    showErrorModal(409);
  }
}

export async function getContactInfo(phoneNumberProp) {
  let value = "";
  phoneNumberProp = phoneNumberProp.slice(2);
  const serviceProvider = "Phone";

  const authApiHeaders = new Headers();
  authApiHeaders.append("client_id", `${process.env.REACT_APP_PROD_CLIENT_ID}`);
  authApiHeaders.append(
    "client_secret",
    `${process.env.REACT_APP_PROD_CLIENT_SECRET}`
  );
  authApiHeaders.append("Content-Type", "application/json");

  var requestOptionsForAuthApi = {
    method: "GET",
    headers: authApiHeaders,
    redirect: "follow",
  };

  await fetch(
    `${process.env.REACT_APP_AUTH_BASEURL}/auth/login?useridentifier=${phoneNumberProp}&serviceprovider=${serviceProvider}`,
    requestOptionsForAuthApi
  )
    .then((response) => response.json())
    .then((data) => {
      value = data;
    })
    .catch((error) => console.log("error", error));
  return value;
}

export async function getStudents(student) {
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${process.env.REACT_APP_BASEURL}/contacts/search?searchString=${student}`,
    requestOptions
  ).then(async (response) => {
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  });
}

export async function getContactRecordType(contactId) {
  let value = "";

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `${process.env.REACT_APP_BASEURL}/contacts/${contactId}`,
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

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `${process.env.REACT_APP_BASEURL}/contacts/searchByPhoneNumber?phoneNumber=${phoneNumber}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (value = data))
    .catch((error) => console.log("error", error));
  return value;
}

export async function submitEditedForm(
  data,
  schoolSiteId,
  showSuccessModal,
  showErrorModal,
  studentId,
  waiverInfo,
  isWaiverAccepted
) {
  firebase.analytics().logEvent("selected_school", {
    regionName: data.schoolName.region,
    schoolName: data.schoolName.schoolname,
  });

  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let timeZone = dayjs()
    .format("z")
    .toString()
    .replace(/\d+/g, "")
    .replace(/[^\w\s]/gi, "");

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
    AccountId: schoolSiteId,
  };

  const waiverData = {
    waiverResponse: "Acceptance",
    datetime: dayjs().format("YYYY-MM-DDTHH:mm:ss") + timeZone,
    contactId: studentId,
    contactEmail: data.parentEmail,
  };

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(student),
  };

  var requestOptionsWaiver = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(waiverData),
  };

  fetch(
    `${process.env.REACT_APP_BASEURL}/contacts/${studentId}`,
    requestOptions
  )
    .then(async (response) => {
      if (response.status === 200) {
        await firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: "true",
          status: "200",
          message: "success",
        });
        if (!isWaiverAccepted) {
          await fetch(
            `${process.env.REACT_APP_BASEURL}/waiver/${waiverInfo.waiverId}`,
            requestOptionsWaiver
          ).then((response) => {
            if (response.status === 200) {
              showSuccessModal();
            } else {
              showErrorModal(505);
            }
          });
        } else {
          showSuccessModal();
        }
      } else if (response.status === 500) {
        await firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: "false",
          status: "500",
          message: "server error",
        });
        showErrorModal(500);
      } else if (response.status === 409) {
        await firebase.analytics().logEvent("form_complete", {
          app: "web_registration",
          completed: "false",
          status: "409",
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

export async function getWaiver(region) {
  try {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/waiver?region=${region}`,
      requestOptions
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getRegionsData(showErrorModal) {
  try {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/regions`,
      requestOptions
    );
    const json = await response.json();
    var remapped = json.map((region) => {
      return {
        value: region.RegionName ? region.RegionName : undefined,
        label: region.RegionName ? region.RegionName : undefined,
      };
    });
    remapped = remapped.filter((e) => e.value !== undefined);
    remapped = remapped.sort((a, b) => a.label.localeCompare(b.label));
    return remapped;
  } catch (error) {
    showErrorModal(500);
  }
}

export async function getSchoolData(regionName, showErrorModal) {
  try {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/regions/${regionName}/schoolsites`,
      requestOptions
    );
    const json = await response.json();
    var remapped = json.map((school) => {
      return {
        value: school.Name ? school.Name : undefined,
        label: school.Name ? school.Name : undefined,
        id: school.Name ? school.Id : undefined,
      };
    });
    remapped = remapped.filter((e) => e);
    remapped = remapped.sort((a, b) => a.label.localeCompare(b.label));
    return remapped;
  } catch (error) {
    showErrorModal(500);
  }
}

export async function getWaiverAcceptance(contactId, waiverId, regionName) {
  try {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/contacts/${contactId}/waiver/${waiverId}?` +
        new URLSearchParams({
          region: regionName,
        }),
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getTeamSeasons() {
  try {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/teamSeasons?date=2023-08-14&isWithinDateRange=true`,
      requestOptions
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
  }
}

export async function postContact(data) {
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/contacts`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function postEnrollment(data) {
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/enrollments`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentsByPhoneNumberComplete(phoneNumber) {
  let value = "";
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(
    `${process.env.REACT_APP_BASEURL}/contacts/searchByPhoneNumber?phoneNumber=${phoneNumber}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => (value = data))
    .catch((error) => console.log("error", error));
  return value;
}
