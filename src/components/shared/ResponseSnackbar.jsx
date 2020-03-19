import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

/*Takes in prop values for success and error, and these messages
  in a SnackBar at the bottom of the screen viewport.*/
const ResponseSnackbar = props => {
  const [open, setOpen] = useState();

  const { error, success } = props;
  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  useEffect(() => {
    if (success) setOpen(true);
  }, [success]);

  const handleClose = (event, reason) => {
    // If the user presses anywhere on the screen,
    // the snackbar does not get closed.
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={props.error ? "Error" : "Success"}
        elevation={6}
        variant="filled"
      >
        {props.error ? props.error : props.success}
      </MuiAlert>
    </Snackbar>
  );
};

export default ResponseSnackbar;
