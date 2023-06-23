import {
  Grid,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Theme,
} from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import { routes } from "../../navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { readGameCollection } from "../../service/firebase";

const useStyles = makeStyles((theme: Theme) => ({
  cardList: {
    marginTop: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  text: {
    textAlign: "left",
  },
  title: { fontSize: 14 },
}));

export const HomeScreen = () => {
  const classes = useStyles();
  const [games, setGames] = useState<Array<GameType>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      const res = await readGameCollection();
      setGames(res);
    };
    loadGames();
  }, []);

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" component="h4">
          Home
        </Typography>
        <Grid container spacing={3} className={classes.cardList}>
          {games.map((g) => (
            <Grid item xs={12} lg={4} key={g.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    color="text.secondary"
                    className={clsx(classes.title, classes.text)}
                    gutterBottom
                  >
                    {g.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    className={classes.text}
                  >
                    {g.desc}
                  </Typography>
                  <Typography variant="body2"></Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      navigate(
                        `/${routes.games.path}/${routes.player.path}/${g.id}`
                      );
                    }}
                  >
                    Play
                    <PlayIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};
