import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default function DeleteDialogButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.onConfirm();
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Slett " + props.entityName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Er du sikker på du vil slette denne entiteten? Den vil bli fjernet
            fra systemet for all evighet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            AVBRYT
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            SLETT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialogButton.propTypes = {
  /**
   * The action to perform when deletion is confirmed
   */
  onConfirm: PropTypes.func,

  /**
   * Name of the entity to be deleted, e.g. "ReleaseNote" or "Product"
   */
  entityName: PropTypes.string
};
