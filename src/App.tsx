import "./App.css";

import { Navigation } from "./navigation";
import { ColorModeContextProvider } from "./shared/context";
import { StyledThemeProvider } from "./styles";

function App() {
  return (
    <ColorModeContextProvider>
      <StyledThemeProvider>
        <Navigation />
      </StyledThemeProvider>
    </ColorModeContextProvider>
  );
}

export default App;
