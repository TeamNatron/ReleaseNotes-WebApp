import React from "react";
import styled from "styled-components";
import { Divider } from "@material-ui/core";

const ScreenTitle = props => {
  return <SpacedDivider>{props.children}</SpacedDivider>;
};

export default ScreenTitle;

const SpacedDivider = styled(Divider)`
  && {
    margin: 32px 0;
  }
`;
