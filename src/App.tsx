import "./App.css";
import { Provider } from "react-redux";

import { Navigation } from "./navigation";
import { ColorModeContextProvider } from "./shared/context";
import { StyledThemeProvider } from "./styles";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ColorModeContextProvider>
        <StyledThemeProvider>
          <Navigation />
        </StyledThemeProvider>
      </ColorModeContextProvider>
    </Provider>
  );
}

export default App;
