import React from "react";
import styled from "styled-components";

const ReleaseH2 = (props) => {
  return <Styledh2>{props.children}</Styledh2>;
};

export default ReleaseH2;

const Styledh2 = styled.h2`
  font-size: 1.85rem;
  font-weight: 500;
  margin: 30px 0 0 0;
`;
