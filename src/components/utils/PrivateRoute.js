import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export { PrivateRoute };

function PrivateRoute(props) {
  const showToast = (message) => {
    toast.warning(message, {
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
  const user = localStorage.getItem("user");
  if (JSON.parse(user) !== true) {
    var code = localStorage.getItem("language");
    if (code === "US") {
      import("../../components/translations/en.js").then((language) =>
        showToast(language.enLanguages.login_warning)
      );
    } else if (code === "ES") {
      import("../../components/translations/es.js").then((language) =>
        showToast(language.esLanguages.login_warning)
      );
    } else if (code === "CN") {
      import("../../components/translations/cn.js").then((language) =>
        showToast(language.cnLanguages.login_warning)
      );
    }
    return <Navigate to="/Login" />;
  }

  // authorized so return child components
  return props.children;
}
