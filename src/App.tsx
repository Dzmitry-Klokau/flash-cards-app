import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Navigation } from "./navigation";
import { ColorModeContextProvider } from "./shared/context";
import { StyledThemeProvider } from "./styles";
import { store, persistor } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeContextProvider>
          <StyledThemeProvider>
            <Navigation />
          </StyledThemeProvider>
        </ColorModeContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
