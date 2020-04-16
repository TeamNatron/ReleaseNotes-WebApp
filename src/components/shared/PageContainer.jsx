import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";

const PageContainer = (props) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default PageContainer;

const StyledContainer = styled(Container)`
  && {
    max-width: ${(props) => props.theme.contentWidth};
    margin: auto;
  }
`;
