import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode, useMemo } from "react";
import { green, purple } from "@mui/material/colors";

import { useColorModeContext } from "../shared/context";

export const StyledThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useColorModeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: purple[500],
          },
          secondary: {
            main: green[500],
          },
        },
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
