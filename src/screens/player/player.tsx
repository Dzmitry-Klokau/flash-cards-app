import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  CardActionArea,
  Card,
  Box,
  Checkbox,
  Theme,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { readGameById } from "../../service/firebase";
import { isUndefined } from "lodash";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    p: 2,
    display: "flex",
    flexDirection: "column",
  },
  title: { marginTop: theme.spacing(4), textAlign: "center" },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  arrow: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[300],
    minHeight: 100,
  },
  card: {
    margin: theme.spacing(2),
    width: "100%",
  },
  cardContent: {
    padding: theme.spacing(4),
    minHeight: 250,
  },
  text: { textAlign: "center" },
}));

export const PlayerScreen = () => {
  const classes = useStyles();

  const params = useParams();
  const [data, setData] = useState<GameType>();
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => {
    if (random) {
      setActiveStep(Math.floor(Math.random() * (data?.cards.length ?? 0)));
    }
    setActiveStep((prevActiveStep) => {
      const next = prevActiveStep + 1;
      return next >= (data?.cards.length ?? 0) ? 0 : next;
    });
  };

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
        <Typography variant="h5" className={classes.title}>
          {data?.title}
        </Typography>
        <Box className={classes.container}>
          <Box className={clsx(classes.centered, classes.left)}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleBack}
              className={clsx(classes.centered, classes.arrow)}
            >
              <KeyboardArrowLeft />
            </Button>
          </Box>
          <Box className={clsx(classes.centered, classes.item)}>
            <Item key={activeStep} item={data.cards[activeStep]} />
          </Box>
          <Box className={clsx(classes.right, classes.centered)}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              className={clsx(classes.centered, classes.arrow)}
            >
              <KeyboardArrowRight />
            </Button>
          </Box>
        </Box>

        <Button
          sx={{ mt: 2 }}
          size="small"
          onClick={() => setRandom((prev) => !prev)}
        >
          Random
          <Checkbox disabled checked={random} />
        </Button>
      </Paper>
    </Grid>
  );
};

const Item = ({ item }: { item: CardType }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={classes.cardContent}
      >
        {open ? (
          <>
            <Typography variant="h5" className={classes.text}>
              {item.secondary}
            </Typography>
            <Typography variant="h6" className={classes.text}>
              [ {item.optional} ]
            </Typography>
          </>
        ) : (
          <Typography variant="h5" className={classes.text}>
            {item.primary}
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
};
