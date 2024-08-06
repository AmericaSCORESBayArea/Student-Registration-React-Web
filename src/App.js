import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import "./App.css";
const baseTheme = createTheme();
if (`${process.env.REACT_APP_NODE_ENV}` === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};

  const body = document.getElementsByTagName("body");
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && (event.key === "S" || event.key === "s")) {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }

    if (event.ctrlKey && event.key === "C") {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }
    if (event.ctrlKey && (event.key === "E" || event.key === "e")) {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }
    if (event.ctrlKey && (event.key === "I" || event.key === "i")) {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }
    if (event.ctrlKey && (event.key === "K" || event.key === "k")) {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }
    if (event.ctrlKey && (event.key === "U" || event.key === "u")) {
      event.preventDefault();
      body[0].innerHTML = "sorry, you can't do this 💔";
    }
  });
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}
const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={baseTheme}>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
