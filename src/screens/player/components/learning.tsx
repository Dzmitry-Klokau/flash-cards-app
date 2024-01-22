import { useCallback, useEffect, useRef, useState } from "react";
import { Theme, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux";
import { Item, SettingsModal } from "./learning/index";
import { Header } from "./header";
import { useLocalSettingsContext } from "../context";
import { shuffleArray } from "../../../utils/array";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  onModeExit: VoidFunction;
  data: GameType;
};

export const LearningView = ({ data, onModeExit }: Props) => {
  const classes = useStyles();
  const formattedData = useRef<GameType["cards"]>(data.cards);

  const [activeStep, setActiveStep] = useState(0);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const random = useSelector((state: RootState) => state.player.random);

  const { start, end } = useLocalSettingsContext();

  const updateFormattedData = useCallback(() => {
    const slicedArr = data.cards.slice(start, end);
    setActiveStep(0);
    formattedData.current = random ? shuffleArray(slicedArr) : slicedArr;
  }, [data, random, start, end]);

  useEffect(() => {
    updateFormattedData();
  }, [updateFormattedData]);

  const handleNext = () =>
    setActiveStep((prev) => {
      if (prev + 1 >= formattedData.current.length) {
        updateFormattedData();
        return 0;
      }
      return prev + 1;
    });

  return (
    <>
      <Header
        title={data.title}
        onBackPress={
          activeStep !== 0
            ? () => {
                setActiveStep((prev) => prev - 1);
              }
            : undefined
        }
        onSettingsPress={() => setDialogVisible(true)}
        onExitPress={onModeExit}
      />
      <Item
        key={activeStep}
        className={classes.container}
        item={formattedData.current[activeStep]}
        onNext={handleNext}
      />
      <LinearProgress
        variant="buffer"
        value={(activeStep / formattedData.current.length) * 100}
      />
      <SettingsModal
        visible={dialogVisible}
        onClose={() => setDialogVisible((prev) => !prev)}
      />
    </>
  );
};
