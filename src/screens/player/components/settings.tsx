import {
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
  Theme,
  Slider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  AddCircleOutline as PlusIcon,
  RemoveCircleOutline as MinusIcon,
  CheckBoxOutlineBlank as CheckboxBlank,
  CheckBoxOutlined as Checkbox,
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
  dialogContent: {
    minWidth: "40vw",
  },
  slider: {
    width: "60%",
    marginLeft: theme.spacing(2),
  },
}));

export const SettingsModal = ({ visible, onClose }: Props) => {
  const classes = useStyles();

  const random = useSelector((state: RootState) => state.player.random);
  const animation = useSelector((state: RootState) => state.player.animation);
  const dispatch = useDispatch();

  const { start, updateStart, end, updateEnd, size } =
    useLocalSettingsContext();

  return (
    <Dialog onClose={onClose} open={visible}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.row}>
          <Typography>Random:</Typography>
          <IconButton onClick={() => dispatch(toggleRandom())}>
            {random ? <Checkbox /> : <CheckboxBlank />}
            {/* <Checkbox checked={random} /> */}
          </IconButton>
        </Box>
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
          <Typography>From-To:</Typography>
          <Slider
            value={[start, end]}
            max={size}
            onChange={(_, newValue: number | number[]) => {
              const newValues = newValue as number[];
              if (newValues[0] !== newValues[1]) {
                updateStart(newValues[0]);
                updateEnd(newValues[1]);
              }
            }}
            valueLabelDisplay="auto"
            className={classes.slider}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
