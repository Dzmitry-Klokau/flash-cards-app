import { ReactNode } from "react";
import { Dialog, Box } from "@mui/material";

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: VoidFunction;
};

export const ModalWrapper = ({ open, children, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "60%",
      }}
    >
      <Box
        sx={{
          maxHeight: "70vh",
          minHeight: "50vh",
          p: 2,
          m: 1,
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
};
