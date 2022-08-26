import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import "firebase/compat/storage";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("true");
    localStorage.setItem("user", true);
  } else {
    localStorage.setItem("user", false);
  }
});

export const db = firebase.firestore();

export { firebase as default };
