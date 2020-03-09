import React from "react";
import styled from "styled-components";

const ReleaseH1 = props => {
  return <Styledh1>{props.children}</Styledh1>;
};

export default ReleaseH1;

const Styledh1 = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  margin 0;
`;
