import React from "react";
import styled from "styled-components";
import { Divider } from "@material-ui/core";

const SpacedDivider = props => {
  return <StyledSpacedDivider />;
};

export default SpacedDivider;

const StyledSpacedDivider = styled(Divider)`
  && {
    margin: 32px 0;
  }
`;
