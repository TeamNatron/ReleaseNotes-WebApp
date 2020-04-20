import React, { useState } from "react";
import { Button, Modal, AppBar, Toolbar, Box } from "@material-ui/core";
import PageContainer from "./PageContainer";
import styled from "styled-components";

const ModalButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <ModalContainer>
          <PageContainer>
            <Background>
              <AppBar position="relative">
                <Toolbar variant="dense">{props.modalLabel}</Toolbar>
              </AppBar>
              <Box px={3} py={3}>
                {props.children}
              </Box>
            </Background>
          </PageContainer>
        </ModalContainer>
      </Modal>
      <Button {...props.buttonProps} onClick={handleOpen}>
        {props.label}
      </Button>
    </>
  );
};

export default ModalButton;

const Background = styled.div`
  background-color: white;
  border-radius: 12px;
`;
const ModalContainer = styled.div`
  && {
    padding: 3rem 0;
  }
`;
