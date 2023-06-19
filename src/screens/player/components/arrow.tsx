import { Button, Box, Theme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[300],
    minHeight: 100,
  },
}));

type Props = {
  className: string;
  onPress: VoidFunction;
  direction: "left" | "right";
};

export const Arrow = ({ className, direction, onPress }: Props) => {
  const classes = useStyles();

  return (
    <Box className={clsx(className, classes.centered)}>
      <Button
        fullWidth
        variant="contained"
        onClick={onPress}
        className={clsx(classes.centered, classes.arrow)}
      >
        {direction === "right" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </Button>
    </Box>
  );
};
