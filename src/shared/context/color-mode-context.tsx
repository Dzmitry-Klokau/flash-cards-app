import { PaletteMode } from "@mui/material";
import React, { ReactNode, useContext, useMemo, useState } from "react";

export type ColorModeContextType = {
  mode: PaletteMode;
  toggleColorMode: VoidFunction;
};

export const ColorModeContext = React.createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

const STORAGE_KEY = "color-mode";

const initialValue = localStorage.getItem(STORAGE_KEY) ?? "dark";

export const ColorModeContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [mode, setMode] = useState<PaletteMode>(initialValue as PaletteMode);

  const value = useMemo(
    () => ({
      toggleColorMode: () => {
        const nextMode = mode === "light" ? "dark" : "light";
        localStorage.setItem(STORAGE_KEY, nextMode);
        setMode(nextMode);
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorModeContext = (): ColorModeContextType =>
  useContext(ColorModeContext);
