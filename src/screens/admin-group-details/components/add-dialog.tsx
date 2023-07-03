import * as React from "react";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

type Props = {
  visible: boolean;
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
};

export const AddDialog = ({ visible, onCancel, onSubmit }: Props) => {
  const [type, setType] = React.useState("category");

  return (
    <Dialog open={visible} onClose={onCancel}>
      <DialogTitle>Add new entity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add new entity, please choose type and required fields.
        </DialogContentText>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value as string)}
          sx={{ marginTop: 2 }}
        >
          <MenuItem value={"category"}>Category</MenuItem>
          <MenuItem value={"list"}>List</MenuItem>
        </Select>
        <TextField
          margin="dense"
          id="name"
          label="Category name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
