import React from "react";
import { Fade, LinearProgress, AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";

const BottomToolbar = props => {
  return (
    <BottomAppBar>
      <Fade
        in={props.loading}
        style={{
          transitionDelay: props.loading ? "800ms" : "0ms"
        }}
      >
        <LinearProgress />
      </Fade>
      <ToolbarWrapper>
        <StyledToolbar disableGutters variant="dense">
          <div>{props.left}</div>
          <div>{props.right}</div>
        </StyledToolbar>
      </ToolbarWrapper>
    </BottomAppBar>
  );
};

export default BottomToolbar;

BottomToolbar.propTypes = {
  loading: PropTypes.bool,
  left: PropTypes.arrayOf(PropTypes.element),
  right: PropTypes.arrayOf(PropTypes.element)
};

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const ToolbarWrapper = styled.div`
  width: ${props => props.theme.contentWidth};
  max-width: ${props => props.theme.contentWidth};
  margin: auto;
`;

const BottomAppBar = styled(AppBar)`
  & {
    background-color: ${props => props.theme.mainColor} !important;
    position: fixed;
    top: auto !important;
    bottom: 0 !important;
  }
`;
