import {
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
  Theme,
  Select,
  SelectChangeEvent,
  MenuItem,
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
  selector: {
    marginRight: theme.spacing(1),
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
          <Typography className={classes.selector}>From: </Typography>
          <Select
            variant="standard"
            value={`${start}`}
            className={classes.selector}
            onChange={(e: SelectChangeEvent) => {
              updateStart(+e.target.value);
            }}
          >
            {Array.from(Array(end).keys()).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
          <Typography className={classes.selector}>To:</Typography>
          <Select
            variant="standard"
            value={`${end}`}
            onChange={(e: SelectChangeEvent) => {
              updateEnd(+e.target.value);
            }}
          >
            {Array.from(Array(size - start - 1).keys()).map((v) => (
              <MenuItem key={v + start + 1} value={v + start + 1}>
                {v + start + 1}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
