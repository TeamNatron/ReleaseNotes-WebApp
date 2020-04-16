import React from "react";
import styled from "styled-components";
import { Toolbar } from "@material-ui/core";

const ToolbarBase = (props) => {
  return (
    <StyledToolbar disableGutters variant="dense">
      <div>{props.left}</div>
      <div>{props.middle}</div>
      <div>{props.right}</div>
      {props.children}
    </StyledToolbar>
  );
};

export default ToolbarBase;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;
