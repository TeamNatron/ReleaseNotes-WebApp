import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Box } from "@material-ui/core";

const Navbar = () => {
  return (
    <Header>
      <StyledToolbar>
        <Brand href="https://kundesider.cordel.no/">
          <img
            src={
              "https://kundesider.cordel.no/wp-content/uploads/2019/07/logo-300x109.png"
            }
            alt="Cordel Kundesenter"
          />
        </Brand>
      </StyledToolbar>
    </Header>
  );
};

export default Navbar;

const Header = styled(AppBar)`
  && {
    position: sticky;
    max-height: 62px;
    background: ${props => props.theme.mainColor};
    color: white;
  }
`;

const StyledToolbar = styled(Toolbar)`
  max-width: ${props => props.theme.contentWidth};
  > * {
    height: 62px;
  }
`;

const Brand = styled.a`
  > img {
    height: 100%;
  }
`;
