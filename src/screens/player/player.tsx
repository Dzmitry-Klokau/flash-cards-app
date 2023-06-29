import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Checkbox,
  Theme,
  DialogTitle,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { isUndefined } from "lodash";
import { makeStyles } from "@mui/styles";

import { readGameById } from "../../service/firebase";
import { Header, Item } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export const PlayerScreen = () => {
  const classes = useStyles();

  const params = useParams();
  const [data, setData] = useState<GameType>();
  const [activeStep, setActiveStep] = useState(0);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [random, setRandom] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async (id: string) => {
      const res = await readGameById(id);
      setData(res);
    };
    if (params.id) {
      loadData(params.id);
    }
  }, [params.id]);

  const handleNext = useCallback(() => {
    if (random) {
      setActiveStep(Math.floor(Math.random() * (data?.cards.length ?? 0)));
    }
    setActiveStep((prevActiveStep) => {
      const next = prevActiveStep + 1;
      return next >= (data?.cards.length ?? 0) ? 0 : next;
    });
  }, [data?.cards.length, random]);

  if (isUndefined(data)) {
    return null;
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Header
        title={data.title}
        onSettingsPress={() => setDialogVisible(true)}
      />
      <Item
        className={classes.container}
        key={activeStep}
        item={data.cards[activeStep]}
        onNext={handleNext}
      />
      <Dialog
        onClose={() => setDialogVisible((prev) => !prev)}
        open={dialogVisible}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Typography>
            Random
            <IconButton onClick={() => setRandom((prev) => !prev)}>
              <Checkbox disabled checked={random} />
            </IconButton>
          </Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
