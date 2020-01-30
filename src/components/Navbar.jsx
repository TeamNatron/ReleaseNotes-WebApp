import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Header>
      {" "}
      <FlexContainer>
        <Brand href="https://kundesider.cordel.no/">
          <img
            src={
              "https://kundesider.cordel.no/wp-content/uploads/2019/07/logo-300x109.png"
            }
            alt="Cordel Kundesenter"
          />
        </Brand>
      </FlexContainer>{" "}
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  position: sticky;
  width: 100vw;
  height: 62px;
  top: 0;
  left: 0;
  background: ${props => props.theme.mainColor};
  z-index: 1;
  font-size: 1.4rem;
  color: white;

  > * {
    max-height: 60px;
  }
`;

const FlexContainer = styled.div`
  max-width: ${props => props.theme.contentWidth};
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  & > * {
      height: 100%;
  }
`;

const Brand = styled.a`
> img {
    height: 100%;
}
`;
