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

import { Header, Item } from "./components";
import { useLazyGameByIdQuery } from "../../redux";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export const PlayerScreen = () => {
  const classes = useStyles();

  const params = useParams();
  const [fetchGameById, { data }] = useLazyGameByIdQuery();

  const [activeStep, setActiveStep] = useState(0);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [random, setRandom] = useState<boolean>(false);

  useEffect(() => {
    if (params.id) {
      fetchGameById(params.id);
    }
  }, [params.id, fetchGameById]);

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
