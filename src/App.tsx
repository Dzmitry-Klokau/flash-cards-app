import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigation } from "./navigation";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
