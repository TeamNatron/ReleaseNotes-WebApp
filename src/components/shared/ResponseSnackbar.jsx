import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import PropTypes from "prop-types";

/*Takes in prop values for success and error, and these messages
  in a SnackBar at the bottom of the screen viewport.*/
const ResponseSnackbar = props => {
  const [open, setOpen] = useState();
  const [displayText, setDisplayText] = useState("");
  const [severity, setSeverity] = useState("info");

  const { errorOccured, errorText, successOccured, successText } = props;
  useEffect(() => {
    if (errorText) {
      setOpen(true);
      setDisplayText(errorText);
      setSeverity("error");
    }
  }, [setDisplayText, errorText, errorOccured]);

  useEffect(() => {
    if (successText) {
      setOpen(true);
      setDisplayText(successText);
      setSeverity("success");
    }
  }, [setDisplayText, successText, successOccured]);

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
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {displayText}
      </MuiAlert>
    </Snackbar>
  );
};

export default ResponseSnackbar;

ResponseSnackbar.propTypes = {
  errorOccured: PropTypes.string,
  errorText: PropTypes.string,
  successOccured: PropTypes.string,
  successText: PropTypes.string
};
