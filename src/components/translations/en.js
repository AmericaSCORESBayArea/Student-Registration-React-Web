export const enLanguages = {
  US: "English",
  ES: "Spanish",
  CN: "Chinese (simplified)",
  pages_title: "Student registration",
  resultOption:
    "We didn't find any student that matches your search. Please double check the spelling or try creating a New Student.",
  login_warning:
    "You need to be logged in to access the student registration form.",
  error_404: "Error 404. Page not found.",
  error_students:
    "We couldn't find a student record associated with your phone number. We recommend you Create a New Record for your student. You may email us about this issue.",
  parent_coach_title: "Verifying your identity. Please wait",
  parent_coach_option: "Verifying your identity. Please wait",
  parent_option: "Parent/Guardian",
  coach_option: "Coach",
  new_option: "New",
  returningModal: {
    modal_title: "Student record(s) found",
    modal_text:
      "We found student record(s) already associated with your mobile number. Please see if the student you are registering already exists and save yourself time by simply updating it.",
    modal_close_button: "OK",
    add_student_button: "Add New Student",
  },
  returning_option: "Existing",
  new_returning_option: "Are you registering a new or existing student?",
  new_returning_title:
    "Select whether you are starting a new student registration or updating a returning student registration.",
  new_returning_sub_heading:
    "NOTE: Please allow a few minutes before you attempt to view or edit a new record.",
  steps_1: "Verify your role",
  steps_2: "Select new or existing",
  steps_3: "Complete form",
  button_continue: "CONTINUE",
  button_back: "BACK",
  button_submit: "SUBMIT",
  waiverText: {
    waiver: "Please review and accept the SCORES waivers and releases.",
    newwaiver:
      "We need a waiver update. Please review and accept this new waiver.",
  },
  logout_modal: {
    modal_title: "Are you sure you want to log out?",
    modal_text: "Any changes made will not be saved.",
    modal_cancel_button: "CANCEL",
    modal_confirm_button: "LOG OUT",
  },
  register_modal_success: {
    modal_title: "Successful registration",
    modal_text: "The student has been successfully registered.",
    modal_footer:
      "Please allow a few minutes before you attempt to view or edit this new record.",
    modal_cancel_button: "ADD OTHER STUDENT",
    modal_confirm_button: "DONE",
  },
  edit_modal_success: {
    modal_title: "Successful edit",
    modal_text: "The student has been successfully edited.",
    modal_cancel_button: "ADD/EDIT OTHER STUDENT",
    modal_confirm_button: "DONE",
  },
  error_modal: {
    error_500: {
      modal_title: "Server error [500]",
      modal_text:
        "There is an issue with our server. If this persists, please contact us " +
        '<a href="https://scoresu.org/contact" target="_blank">here</a> ',
      modal_close_button: "OK",
    },
    error_409: {
      modal_title: "Server error [409]",
      modal_text:
        "This Student is already in the system please contact your Coach or Administrator.",
      modal_close_button: "OK",
    },
    error_505: {
      modal_title: "Server error [500]",
      modal_text:
        "An error has occurred while saving the waiver acceptance. Please try again later. If this persists, please contact us.",
      modal_close_button: "OK",
    },
  },
  form: {
    waiverModal_region:
      "You need to select a SCORES program site region to review the waiver.",
    required_fields: "Field is required (*)",
    invalid_phone_number: "Phone number is not valid",
    required_waiver: "You need to review and accept waiver (*)",
    invalid_email: "Email is not valid",
    firstName_field: "First Name*",
    firstName_field_placeholder: "Enter first name",
    middleName_field: "Middle Name",
    middleName_field_placeholder: "Enter middle name",
    lastName_field: "Last Name*",
    lastName_field_placeholder: "Enter last name",
    schoolName_field: "SCORES Program Site*",
    schoolName_region_field: "Region*",
    schoolName_region_field_placeholder: "Select...",
    schoolName_schoolname_field: "School or Facility Name*",
    schoolName_schoolname_field_placeholder: "Select...",
    attendingSchool_field: "School Attending*",
    attendingSchool_field_placeholder: "Enter school attending",
    studentEmail_field: "Student Email",
    studentEmail_field_placeholder: "Enter student email",
    studentphoneNumber_field: "Student Phone",
    studentphoneNumber_field_placeholder: "Enter student phone",
    birthdate_field: "Birthdate*",
    birthdate_field_placeholder: "birthdate",
    gender_field: "Gender*",
    gender_field_placeholder: "Select...",
    grade_field: "Grade*",
    grade_field_placeholder: "Select...",
    ethnicity_field: "Ethnicity*",
    ethnicity_field_placeholder: "Select...",
    reducedPriceLunch_field:
      "Does your child receive Free or Reduced Price Lunch?*",
    reducedPriceLunch_field_placeholder_confirm: "Yes",
    reducedPriceLunch_field_placeholder_denied: "No",
    allergies_field: "Allergies/Medical Conditions",
    allergies_field_placeholder: "Enter allergies/medical conditions",
    parentFName_field: "Parent/Guardian First Name*",
    parentFName_field_placeholder: "Enter parent/guardian first name",
    parentLName_field: "Parent/Guardian Last Name*",
    parentLName_field_placeholder: "Enter parent/guardian last name",
    parentEmail_field: "Parent/Guardian Email*",
    parentEmail_field_placeholder: "Enter parent/guardian email",
    relationship_field: "Relationship to Child*",
    relationship_field_placeholder: "Select...",
    parentPhone1_field: "Parent/Guardian Phone 1*",
    parentPhone1_field_placeholder: "Enter parent/guardian phone 1",
    parentPhone2_field: "Parent/Guardian Phone 2",
    parentPhone2_field_placeholder: "Enter parent/guardian phone 2",
    mailingStreet_field: "Mailing Street",
    mailingStreet_field_placeholder: "Enter mailing street",
    mailingCity_field: "Mailing City",
    mailingCity_field_placeholder: "Enter mailing city",
    mailingState_field: "Mailing State/Province",
    mailingState_field_placeholder: "Enter mailing state/province",
    mailingZip_field: "Mailing Zip",
    mailingZip_field_placeholder: "Enter mailing zip",
    mailingCountry_field: "Mailing Country",
    parentHomeLang_field: "Parent/Guardian Home Language*",
    parentHomeLang_field_placeholder: "Select...",
    parentHomeLang_field_input_placeholder:
      "Enter parent/guardian home language",
    volunteer_field: "Volunteer for this program? (Parent/Guardian)",
    volunteer_field_placeholder_confirm: "Yes",
    volunteer_field_placeholder_denied: "No",
    emergency_Contact_Name_field:
      "Primary Emergency Contact Name (Other than Parent/Guardian and Primary Emergency Contact)*",
    emergency_Contact_Name_field_placeholder: "Enter emergency contact name",
    emergency_Contact_Relationship_field: "Emergency Relationship to Child*",
    emergency_Contact_Relationship_field_placeholder: "Select...",
    emergency_Contact_Phone1_field: "Emergency Contact Phone 1*",
    emergency_Contact_Phone1_field_placeholder:
      "Enter emergency contact phone 1",
    emergency_Contact_Phone2_field: "Emergency Contact Phone 2",
    emergency_Contact_Phone2_field_placeholder:
      "Enter emergency contact phone 2",
    second_Emergency_Contact_Name_field: "Secondary Emergency Contact Name",
    second_Emergency_Contact_Name_field_placeholder:
      "Enter secondary emergency contact name",
    second_Emergency_Contact_Relationship_field:
      "Secondary Emergency Relationship to Child",
    second_Emergency_Contact_Relationship_field_placeholder: "Select...",
    second_Emergency_Contact_Phone1_field: "Secondary Emergency Phone 1",
    second_Emergency_Contact_Phone1_field_placeholder:
      "Enter secondary emergency contact phone 1",
    second_Emergency_Contact_Phone2_field: "Secondary Emergency Phone 2",
    second_Emergency_Contact_Phone2_field_placeholder:
      "Enter secondary emergency contact phone 2",
    waiver_field: "Waiver*",
    waiver_field_button: "Accept waiver",
    formTitle1: "Students details",
    formTitle2: "Parent/Guardian Information",
    formTitle3: "Emergency Contact (Other than Parent/Guardian)",
    formTitle4:
      "Second Emergency Contact (Other than Parent/Guardian and Primary Emergency Contact)",
    requiredFieldsTitle: "Required Fields Missing :",
    genderArray: [
      {
        label: "Female",
        value: "Female",
      },
      {
        label: "Male",
        value: "Male",
      },
      {
        label: "Non-binary",
        value: "Non-binary",
      },
      {
        label: "Prefer not to say",
        value: "Prefer not to say",
      },
      {
        label: "Unknown",
        value: "Unknown",
      },
    ],
    ethnicityArray: [
      {
        label: "African American",
        value: "African American",
      },
      {
        label: "Asian",
        value: "Asian",
      },
      {
        label: "Caucasian",
        value: "Caucasian",
      },
      {
        label: "Filipino",
        value: "Filipino",
      },
      {
        label: "Hispanic/Latinx",
        value: "Hispanic/Latinx",
      },
      {
        label: "Middle Eastern/Arabic",
        value: "Middle Eastern/Arabic",
      },
      {
        label: "Multi-Racial/Multi-Ethnic",
        value: "Multi-Racial/Multi-Ethnic",
      },
      {
        label: "Native American",
        value: "Native American",
      },
      {
        label: "Pacific Islander",
        value: "Pacific Islander",
      },
    ],
    relationshipArray: [
      {
        label: "Parent",
        value: "Parent",
      },
      {
        label: "Legal Guardian",
        value: "Legal Guardian",
      },
      {
        label: "Foster Parent",
        value: "Foster Parent",
      },
      {
        label: "Grandparent",
        value: "Grandparent",
      },
      {
        label: "Sibling/Other relative",
        value: "Sibling/Other relative",
      },
    ],
    parent_Home_Lang_Array: [
      {
        label: "Arabic",
        value: "Arabic",
      },
      {
        label: "Bengali",
        value: "Bengali",
      },
      {
        label: "Chinese",
        value: "Chinese (incl. Cantonese, Mandarin, other Chinese languages)",
      },
      {
        label: "English",
        value: "English",
      },
      {
        label: "French",
        value: "French and French Creole",
      },
      {
        label: "German",
        value: "German",
      },
      {
        label: "Greek",
        value: "Greek",
      },
      {
        label: "Gujarati",
        value: "Gujarati",
      },
      {
        label: "Hebrew",
        value: "Hebrew",
      },
      {
        label: "Hindi",
        value: "Hindi",
      },
      {
        label: "Hmong",
        value: "Hmong",
      },
      {
        label: "Italian",
        value: "Italian",
      },
      {
        label: "Japanese",
        value: "Japanese",
      },
      {
        label: "Korean",
        value: "Korean",
      },
      {
        label: "Persian",
        value: "Persian",
      },
      {
        label: "Polish",
        value: "Polish",
      },
      {
        label: "Portuguese",
        value: "Portuguese",
      },
      {
        label: "Punjabi",
        value: "Punjabi",
      },
      {
        label: "Russian",
        value: "Russian",
      },
      {
        label: "Spanish",
        value: "Spanish",
      },
      {
        label: "Tagalog",
        value: "Tagalog",
      },
      {
        label: "Telugu",
        value: "Telugu",
      },
      {
        label: "Urdu",
        value: "Urdu",
      },
      {
        label: "Vietnamese",
        value: "Vietnamese",
      },
      {
        label: "Other",
        value: "Other",
      },
    ],
    waiverModal_confirm: "Accept",
    waiverModal_denied: "Dismiss",
    waiverModal_error: {
      modal_title: "Waiver not available",
      modal_text:
        "Please contact your SCORES Coach or Admin for an active waiver.",
      modal_close_button: "OK",
    },
    modal_info_parent_email: {
      modal_title: "Parent email",
      modal_text: `<div class="align-left">Providing SCORES with a parent email will help us keep you informed of your student's participation and upcoming events.</div>`,
      modal_close_button: "Close",
    },
  },
  searchStudent: {
    title_parents: "Select a student to edit their information.",
    modal_title: "Delete Student",
    modal_text:
      "Please contact your SCORES Administrator for help deleting a student record",
    modal_close_button: "Ok",
    title: "Search student by First Name/Last Name",
    inputProps: "search student",
    inputPlaceholder: "Search...",
    tableOptions: {
      firstName: "First Name",
      lastName: "Last Name",
      birthdate: "Birthdate",
      schoolName: "School Name",
      actions: "Actions",
    },
  },
};
