import { useState } from "react";
import { Typography, CardActionArea, Card, Theme, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

type Props = { item: CardType; className: string };

export const Item = ({ item, className }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box className={clsx(classes.centered, className)}>
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
    </Box>
  );
};
