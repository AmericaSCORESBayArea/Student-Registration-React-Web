import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase/firebaseConfig";
const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  privacyPolicyUrl: "https://scoresu.org/privacy-policy",
  tosUrl: "https://scoresu.org/privacy-policy",
};
export default function LogInScreen() {
  const [widget, setWidget] = useState(null);
  useEffect(() => {
    setWidget(
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }, []);

  return <div>{widget}</div>;
}
