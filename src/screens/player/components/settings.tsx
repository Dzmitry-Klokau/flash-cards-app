import {
  Checkbox,
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
  Theme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  AddCircleOutline as PlusIcon,
  RemoveCircleOutline as MinusIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import {
  toggleRandom,
  RootState,
  decrementAnimation,
  incrementAnimation,
} from "../../../redux";
import { useLocalSettingsContext } from "../context";

type Props = {
  visible: boolean;
  onClose: VoidFunction;
};

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export const SettingsModal = ({ visible, onClose }: Props) => {
  const classes = useStyles();

  const random = useSelector((state: RootState) => state.player.random);
  const animation = useSelector((state: RootState) => state.player.animation);
  const dispatch = useDispatch();

  const {
    start,
    incrementStart,
    decrementStart,
    end,
    incrementEnd,
    decrementEnd,
  } = useLocalSettingsContext();

  return (
    <Dialog onClose={onClose} open={visible}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Typography>
          Random:
          <IconButton onClick={() => dispatch(toggleRandom())}>
            <Checkbox disabled checked={random} />
          </IconButton>
        </Typography>
        <Box className={classes.row}>
          <Typography>Animation (ms):</Typography>
          <IconButton onClick={() => dispatch(decrementAnimation())}>
            <MinusIcon />
          </IconButton>
          <Typography>{animation}</Typography>
          <IconButton onClick={() => dispatch(incrementAnimation())}>
            <PlusIcon />
          </IconButton>
        </Box>
        <Box className={classes.row}>
          <Typography>Show cards from:</Typography>
          <IconButton onClick={decrementStart}>
            <MinusIcon />
          </IconButton>
          <Typography>{start}</Typography>
          <IconButton onClick={incrementStart}>
            <PlusIcon />
          </IconButton>
        </Box>
        <Box className={classes.row}>
          <Typography>Show cards to:</Typography>
          <IconButton onClick={decrementEnd}>
            <MinusIcon />
          </IconButton>
          <Typography>{end}</Typography>
          <IconButton onClick={incrementEnd}>
            <PlusIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
