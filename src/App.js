import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Route from "./Routes";

const baseTheme = createTheme();

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={baseTheme}>
      <div className="App">
        <Route />
      </div>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
