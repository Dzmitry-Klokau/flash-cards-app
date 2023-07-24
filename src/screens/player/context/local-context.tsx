import React, { useState, useContext, ReactNode, useMemo } from "react";

export type LocalSettingsType = {
  start: number;
  updateStart: (v: number) => void;
  end: number;
  updateEnd: (v: number) => void;
  size: number;
};

const LocalSettingsContext = React.createContext<LocalSettingsType>(
  {} as LocalSettingsType
);

type Props = {
  children?: ReactNode;
  size: number;
};

export const LocalSettingsContextProvider = ({ children, size }: Props) => {
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(size - 1);

  const value = useMemo(
    () => ({
      start,
      updateStart: setStart,
      end,
      updateEnd: setEnd,
      size,
    }),
    [end, start, size]
  );

  return (
    <LocalSettingsContext.Provider value={value}>
      {children}
    </LocalSettingsContext.Provider>
  );
};

export const useLocalSettingsContext = (): LocalSettingsType =>
  useContext(LocalSettingsContext);
