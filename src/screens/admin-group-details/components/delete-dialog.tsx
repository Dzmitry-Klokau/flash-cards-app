import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

type Props = {
  value: string | undefined;
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
};

export const DeleteDialog = ({ value, onCancel, onSubmit }: Props) => (
  <Dialog
    open={!!value}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete item "{value}""
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>No</Button>
      <Button onClick={onSubmit} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
