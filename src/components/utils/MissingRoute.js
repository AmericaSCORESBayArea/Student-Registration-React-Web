import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function MissingRoute() {
  const showToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  var code = localStorage.getItem("language");
  if (code === "US") {
    import("../../components/translations/en.js").then((language) =>
      showToast(language.enLanguages.error_404)
    );
  } else if (code === "ES") {
    import("../../components/translations/es.js").then((language) =>
      showToast(language.esLanguages.error_404)
    );
  } else if (code === "CN") {
    import("../../components/translations/cn.js").then((language) =>
      showToast(language.cnLanguages.error_404)
    );
  }
  return <Navigate to={{ pathname: "/" }} />;
}

export { MissingRoute };
