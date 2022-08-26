import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import NavBar from "./components/NavbarComponent";
//import Footer from "./components/Footer";
import { MissingRoute } from "./components/utils/MissingRoute";
import ScrollToTop from "./components/utils/ScrollToTop";
import LogInScreen from "./components/screens/LoginScreen";
import { PagesTitle } from "./components/utils/PagesTitle";
import { PrivateRoute } from "./components/utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enLanguages } from "./components/translations/en";
import { esLanguages } from "./components/translations/es";
import { cnLanguages } from "./components/translations/cn";

export default function RoutesWeb() {
  const lang = navigator.language || navigator.userLanguage;
  const [auxTranslation, setAuxTranslation] = React.useState("");
  const [selectedLanguage] = React.useState(
    lang === "es-ES" || lang === "es" ? "ES" : lang === "zh-CN" ? "CN" : "US"
  );

  const checkLocalstorageLanguage = () => {
    var code = localStorage.getItem("language");
    if (code === "US") {
      setAuxTranslation(enLanguages);
    } else if (code === "ES") {
      setAuxTranslation(esLanguages);
    } else if (code === "CN") {
      setAuxTranslation(cnLanguages);
    }
  };

  document.addEventListener("languageChanged", () => {
    checkLocalstorageLanguage();
  });

  useEffect(() => {
    if (
      localStorage.getItem("language") === null ||
      localStorage.getItem("language") === undefined
    ) {
      if (lang === "es-ES" || lang === "es") {
        setAuxTranslation(esLanguages);
        localStorage.setItem("language", "ES");
      } else if (lang === "zh-CN") {
        setAuxTranslation(cnLanguages);
        localStorage.setItem("language", "US");
      } else {
        localStorage.setItem("language", "CN");
        setAuxTranslation(enLanguages);
      }
    } else {
      checkLocalstorageLanguage();
    }
  }, []);
  return (
    <div>
      <NavBar
        traslations={auxTranslation}
        selected={
          localStorage.getItem("language") === null ||
          localStorage.getItem("language") === undefined
            ? selectedLanguage
            : localStorage.getItem("language")
        }
      />
      <PagesTitle />
      <div>
        <ScrollToTop />
        <Routes history={useNavigate}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeScreen traslations={auxTranslation} />
              </PrivateRoute>
            }
          />
          <Route index path="/LogIn" element={<LogInScreen />} />
          <Route path="*" element={<MissingRoute />} />
        </Routes>
        <ToastContainer />
      </div>
      {/*<Footer />*/}
    </div>
  );
}
