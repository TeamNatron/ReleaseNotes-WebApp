import React from "react";
import { IconButton, Modal, Box, AppBar, Toolbar } from "@material-ui/core";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Edit } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import ReleaseNoteEditor from "./ReleaseNoteEditor";
const ReleaseNoteEditorModal = props => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (props.onCancel) props.onCancel();
    setOpen(false);
  };

  const handleSave = objectToSave => {
    props.onSave(props.note.id, objectToSave);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <ModalContainer>
          <PageContainer>
            <Background>
              <AppBar position="relative">
                <Toolbar variant="dense">Rediger release note</Toolbar>
              </AppBar>
              <Box px={3} py={3}>
                <ReleaseNoteEditor
                  onSave={handleSave}
                  onCancel={handleClose}
                  note={props.note}
                />
              </Box>
            </Background>
          </PageContainer>
        </ModalContainer>
      </Modal>
    </React.Fragment>
  );
};

export default ReleaseNoteEditorModal;

ReleaseNoteEditorModal.propTypes = {
  icon: PropTypes.element,
  modalContent: PropTypes.element
};

const Background = styled.div`
  background-color: white;
  border-radius: 12px;
`;

const ModalContainer = styled.div`
  && {
    padding: 3rem 0;
  }
`;
