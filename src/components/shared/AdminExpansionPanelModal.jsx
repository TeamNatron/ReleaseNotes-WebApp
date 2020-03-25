import React from "react";
import PropTypes from "prop-types";
import { Backdrop, DialogContent, Modal, Fade } from "@material-ui/core";
import AdminExpansionPanelBase from "./AdminExpansionPanelBase";

const AdminExpansionPanelModal = props => {
  const [open, setOpen] = React.useState(false);
  const [componentToRender, setComponentToRender] = React.useState();

  const handleAction = (action, id) => {
    switch (action) {
      case "CREATE":
        setComponentToRender(props.createContentComponent);
        break;
      case "EDIT":
        if (props.editContentComponent.type.name === "ChangePasswordForm") {
          setComponentToRender(getChangePasswordComponent(id));
        } else {
          setComponentToRender(props.editContentComponent);
        }
        break;
      default:
        console.table(
          "Action not found.. please contact your local developer",
          action
        );
    }
    setOpen(true);
  };

  const getChangePasswordComponent = id => {
    return React.Children.map(props.editContentComponent, child =>
      React.cloneElement(child, { id: id })
    )[0];
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <DialogContent>{componentToRender}</DialogContent>
        </Fade>
      </Modal>
      <AdminExpansionPanelBase
        onAction={handleAction}
        edit={props.editContentComponent ? true : false}
        {...props}
      />
    </React.Fragment>
  );
};

export default AdminExpansionPanelModal;

AdminExpansionPanelModal.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.array,
  icon: PropTypes.element,
  createContentComponent: PropTypes.element,
  editContentComponent: PropTypes.element
};
