import {
  Checkbox,
  Box,
  DialogTitle,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  AddCircleOutline as PlusIcon,
  RemoveCircleOutline as MinusIcon,
} from "@mui/icons-material";

import {
  toggleRandom,
  RootState,
  decrementAnimation,
  incrementAnimation,
} from "../../../redux";

type Props = {
  visible: boolean;
  onClose: VoidFunction;
};

export const SettingsModal = ({ visible, onClose }: Props) => {
  const random = useSelector((state: RootState) => state.player.random);
  const animation = useSelector((state: RootState) => state.player.animation);
  const dispatch = useDispatch();

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography>Animation:</Typography>
          <IconButton onClick={() => dispatch(decrementAnimation())}>
            <MinusIcon />
          </IconButton>
          <Typography>{animation}</Typography>
          <IconButton onClick={() => dispatch(incrementAnimation())}>
            <PlusIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
