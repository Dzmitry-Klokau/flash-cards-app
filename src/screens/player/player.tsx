import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
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
import { Arrow, Header, Item } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    p: 2,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    marginTop: theme.spacing(2),
    display: "grid",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
      gridTemplateAreas: `"left item item item right"`,
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: `"item item"
                          "left right"`,
    },
  },
  left: {
    gridArea: "left",
  },
  item: {
    gridArea: "item",
  },
  right: {
    gridArea: "right",
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

  const handleBack = () => {
    if (random) {
      setActiveStep(Math.floor(Math.random() * (data?.cards.length ?? 0)));
    }
    setActiveStep((prevActiveStep) => {
      const next = prevActiveStep - 1;
      return next >= 0 ? next : (data?.cards.length ?? 0) - 1;
    });
  };

  if (isUndefined(data)) {
    return null;
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper className={classes.root}>
        <Header
          title={data.title}
          onSettingsPress={() => setDialogVisible(true)}
        />
        <Box className={classes.container}>
          <Arrow
            className={classes.left}
            direction="left"
            onPress={handleBack}
          />
          <Item
            className={classes.item}
            key={activeStep}
            item={data.cards[activeStep]}
          />
          <Arrow
            className={classes.right}
            direction="right"
            onPress={handleNext}
          />
        </Box>

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
      </Paper>
    </Grid>
  );
};
