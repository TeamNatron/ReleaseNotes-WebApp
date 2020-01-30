import React from "react";
import styled from "styled-components";

const PageContainer = props => {
  return <Container>{props.children}</Container>;
};

export default PageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.contentWidth};
  padding: 12px;
  margin: auto;
`;
