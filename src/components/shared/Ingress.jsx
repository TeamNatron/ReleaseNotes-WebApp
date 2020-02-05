import React from "react";
import styled from "styled-components";

const Ingress = props => {
  return <Text>{props.children}</Text>;
};

export default Ingress;

const Text = styled.span`
  width: 100%;
  color: #666666;
  font-size: .8rem;
`;
