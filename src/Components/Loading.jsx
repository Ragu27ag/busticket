import React, { useCallback, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Loading = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    handleClickOpen();
  }, [handleClickOpen]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
    //   style={{
    //     width: "500px",
    //   }}
    >
      {" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle sx={{ color: "#e93e3e" }} id="alert-dialog-title">
          {"Loading"}
        </DialogTitle>
        <DialogContent>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="success" />
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Loading;
