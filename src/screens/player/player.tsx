import { useCallback, useEffect, useState } from "react";
import { Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { isUndefined } from "lodash";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

import { RootState } from "../../redux";
import { Header, Item, SettingsModal } from "./components";
import { useLazyGameByIdQuery } from "../../api";
import {
  LocalSettingsContextProvider,
  useLocalSettingsContext,
} from "./context";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export const PlayerScreen = () => {
  const params = useParams();
  const [fetchGameById, { data }] = useLazyGameByIdQuery();

  useEffect(() => {
    if (params.id) {
      fetchGameById(params.id);
    }
  }, [params.id, fetchGameById]);

  if (isUndefined(data)) {
    return null;
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      <LocalSettingsContextProvider size={data.cards.length}>
        <Content data={data} />
      </LocalSettingsContextProvider>
    </Grid>
  );
};

const Content = ({ data }: { data: GameType }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const random = useSelector((state: RootState) => state.player.random);

  const { start, end } = useLocalSettingsContext();

  const handleNext = useCallback(() => {
    const getNextValue = (prevActiveStep: number) => {
      const next = prevActiveStep >= start ? prevActiveStep + 1 : start;
      return next > end ? start : next;
    };

    if (random) {
      const maxValue = end - start;
      const nextStep = start + Math.floor(Math.random() * maxValue);
      setActiveStep((prev) =>
        prev !== nextStep ? nextStep : getNextValue(nextStep)
      );
    } else {
      setActiveStep(getNextValue);
    }
  }, [random, start, end]);

  return (
    <>
      <Header
        title={data.title}
        onSettingsPress={() => setDialogVisible(true)}
      />
      <Item
        index={activeStep}
        key={activeStep}
        className={classes.container}
        item={data.cards[activeStep]}
        onNext={handleNext}
      />
      <SettingsModal
        visible={dialogVisible}
        onClose={() => setDialogVisible((prev) => !prev)}
      />
    </>
  );
};
