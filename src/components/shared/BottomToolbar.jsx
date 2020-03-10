import React from "react";
import { Fade, LinearProgress, AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import ToolbarBase from "./ToolbarBase";

const BottomToolbar = props => {
  const { loading, ...toolbarBaseProps } = props;
  return (
    <BottomAppBar>
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms"
        }}
      >
        <LinearProgress />
      </Fade>
      <ToolbarWrapper>
        <ToolbarBase {...toolbarBaseProps} />
      </ToolbarWrapper>
    </BottomAppBar>
  );
};

export default BottomToolbar;

BottomToolbar.propTypes = {
  loading: PropTypes.bool,
  left: PropTypes.arrayOf(PropTypes.element),
  middle: PropTypes.arrayOf(PropTypes.element),
  right: PropTypes.arrayOf(PropTypes.element)
};

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
