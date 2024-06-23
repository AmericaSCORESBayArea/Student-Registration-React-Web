# Requirements Overview #

## New Objectives: Paper as a reality and Acceptable, if Temporary Medium
- School districts served by SCORES incorporate paper-based forms and communications in their regular business with students and families. While "paperless" is an objective in many cases, the realities of _Accessibility_ and _the Digital Divide_ dictate that we support paper too.
- A guardian who chooses to use paper, or has no access to the digital option in this platform, still needs to be able to register their student
- Parents may give coaches their forms directly, during game day, or they may be delivered, in batch, by a site administrator
### The UI/UX for the Student Registration App will provide accomodations to help coaches and Site Admins easily transcribe some or all paper-based registration info on behalf of parents

### The Waiver History supports a record of "paper form received" that the user with appropriate privilages can select and add

### Guardians should be able to "bridge the gap" and start using the digital tools to update their records any time. The necessary link is a mobile phone with SMS to complete the authentication. The guardian primary phone number needs to be set in the Student Contact record for this to work properly.

# registration
### America SCORES Registration Form ###
Scores Program relationshiops with school districts, liability insurancxe, and impact reporting goals, require us to colelcting indentifying information, safely and securey, and provide student families/guardians secure access to update or delete records, and accept waivers at any time. The geographic, social, cultural, and economic diversity of the students make _Accessibility_ a key, and evolving, objective.
 
## Student Registration Service Goals ##
This service is intended to run as a low cost webservice deployable on a serverless environment e.g. Heroku or Squarespace
Families of Scores students are required to provide information to register their student, and this information may sometimes change, such as address or contact info, or be newly required, such as medical or emergency contacts.

The Data is stored in a Salesforce DB.

The protection of the family requires a secure authentication strategy. The current release of the service utilizes _Firebase Authentication_.

## Primary User Types ##
| **User Type**    | **Description**                                                                                                           | **Story Goals**                                                                                                                                                                                           |
|------------------|---------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Program Coach    | Interacts directly with students (and often, guardians), provides program experiences, tracking rosters and participation | Can monitor the progress of enrollment and build their roster                                                                                                                                             |
| Program Manager  | Oversees programming, site and district relationships, Coach placement and program performance                            | Facilitate and coordinate the completion of registration and attendance for all their teams/coaches                                                                                                       |
| Region Manager   | Oversees Program delivery and coaching at the district (Region) level                                                     | Facilitate and monitor status of student record completion and participation                                                                                                                              |
| Site Coordinator | site-based staff who oversee coaches on a day to day basis and support registration and attendance.                       | Ability to look after all their kids and afterschool activities and ensure requirements are met between coach and families. Keeping track is their main need. Their responsibility is about participation |
| Parent/Guardian  | legal custodian for Student minor                                                                                         | Needs to determine they want their student participating, quickly complete the paperwork, and confirm it has been received                                                                                |
|                  |                                                                                                                           |                                                                                                                                                                     

### UX Details ###
- Accessbility includes
  - Language Support
  - Mobile and Web support for a majority of devices, browsers, and user platforms
  - Support for Coach-Assisted form completion and tracking

- The first time a family registers, they provide a mobile number where they can receive an SMS with an authentication code to complete the initial registration.
- A returning family updating their contact information, will enter their mobile phone number to identify themselves. The https://github.com/AmericaSCORESBayArea/salesforce-auth-api returns the needed response for _Firebase_ to generate the SMS to that contact number, if it exists. If it is not found, the user will need to complete the initial registration step. Presently, there is nothing to stop a registrant from creating more than one record, provided they use a different phone number for each, and can complete the authentication
- This basic authentiation flow will be used in other web-based services and a future Family App.
- Salesforce will reject new records where firstName, lastName, and DOB match an exissting record.

## Data Requirements
### The Contact Object stores the Student Registration info, including Waiver Status for the present Season
### The Contact is linked to an Account record for the Student's school or partner programn
### A historical record is made including: Date/Time, Contact ID, Parent Full Name, Parent Email, WaiverName, Acceptance (T/F)
- The historical record belongs in a Salesforce as a _Historical_ record with the above information
- The Waiver text with limited formatting (e.g. markdown) to indicate headers and italics, is stored in a Waiver object with Active Date, Expiration Date, Region (referenced from Account)
- Old Waivers are never deleted
- The schema must support a query of what waiver was accepted, by who, and when, can be constructed with full waiver text
## NEW Data Requirements (added 10-12-22)
- [ ] New student records need the *User External Profile* record created and attached to that record in Salesforce. The Type is _Phone_ and the Value is the _Mobile Number Used to Authenticate_. This should also appear in the Parent_Phone_1 Field.*

### Implementation Resources
https://medium.com/javascript-in-plain-english/easy-authentication-system-with-react-and-firebase-for-beginners-780cadc9d5e4

### Design Documentation
![Design.md](https://github.com/AmericaSCORESBayArea/student-registration/blob/main/Registration_design.png)
[Design](Design.md)
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
The Heroku environment debug instance points to the /debug branch https://github.com/AmericaSCORESBayArea/Student-Registration-React-Web/tree/debug and will auto-deploy.
Likewise Master directs to the Production instance. Commit to /debug first and then /master only after testing is completed.

Additional information can be found here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

