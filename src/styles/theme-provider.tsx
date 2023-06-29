import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useMemo } from "react";
import { blue, grey } from "@mui/material/colors";

import { useColorModeContext } from "../shared/context";

export const StyledThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useColorModeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: blue[800],
          },
          secondary: {
            main: grey[100],
            dark: "red",
          },
        },
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
