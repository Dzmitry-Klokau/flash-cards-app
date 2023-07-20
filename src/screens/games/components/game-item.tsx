import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Theme,
} from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import { routes } from "../../../navigation";

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
}));

type Props = {
  data: GameIdsType;
};

export const GameItem = ({ data }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid item xs={12} lg={4} key={data.id}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.text} gutterBottom variant="h4">
            {data.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              navigate(
                `/${routes.games.path}/${routes.player.path}/${data.id}`
              );
            }}
          >
            Play
            <PlayIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
