import React from "react";
import styled from "styled-components";

const ScreenTitle = props => {
  return <Title>{props.children}</Title>;
};

export default ScreenTitle;

const Title = styled.h1`
  text-transform: uppercase;
  word-wrap: break-word;
`;
