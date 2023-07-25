import { useEffect, useRef, useState } from "react";
import { Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { isUndefined, clone } from "lodash";
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

function shuffleArray(array: Array<any>) {
  const res = clone(array);
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = res[i];
    res[i] = res[j];
    res[j] = temp;
  }

  return res;
}

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
  const formattedData = useRef<GameType["cards"]>(data.cards);

  const [activeStep, setActiveStep] = useState(0);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const random = useSelector((state: RootState) => state.player.random);

  const { start, end } = useLocalSettingsContext();

  useEffect(() => {
    const slicedArr = data.cards.slice(start, end);
    formattedData.current = random ? shuffleArray(slicedArr) : slicedArr;
  }, [data, random, start, end]);

  const handleNext = () =>
    setActiveStep((prev) =>
      prev + 1 >= formattedData.current.length ? 0 : prev + 1
    );

  return (
    <>
      <Header
        title={data.title}
        onSettingsPress={() => setDialogVisible(true)}
      />
      <Item
        key={activeStep}
        className={classes.container}
        item={formattedData.current[activeStep]}
        onNext={handleNext}
      />
      <SettingsModal
        visible={dialogVisible}
        onClose={() => setDialogVisible((prev) => !prev)}
      />
    </>
  );
};
