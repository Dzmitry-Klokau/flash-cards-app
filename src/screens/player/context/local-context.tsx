import React, {
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

export type LocalSettingsType = {
  start: number;
  incrementStart: VoidFunction;
  decrementStart: VoidFunction;
  end: number;
  incrementEnd: VoidFunction;
  decrementEnd: VoidFunction;
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

  const decrementStart = useCallback(() => {
    setStart((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const incrementStart = useCallback(() => {
    setStart((prev) => (prev < size - 2 ? prev + 1 : prev));
  }, [size]);

  const decrementEnd = useCallback(() => {
    setEnd((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const incrementEnd = useCallback(() => {
    setEnd((prev) => (prev >= size - 1 ? prev : prev + 1));
  }, [size]);

  const value = useMemo(
    () => ({
      start,
      incrementStart,
      decrementStart,
      end,
      incrementEnd,
      decrementEnd,
    }),
    [end, start, incrementStart, decrementStart, incrementEnd, decrementEnd]
  );

  return (
    <LocalSettingsContext.Provider value={value}>
      {children}
    </LocalSettingsContext.Provider>
  );
};

export const useLocalSettingsContext = (): LocalSettingsType =>
  useContext(LocalSettingsContext);
