import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Settings from "@material-ui/icons/Settings";

const Navbar = () => {
  return (
    <Header>
      <StyledToolbar>
        <Brand to="/">
          <img
            src={
              "https://kundesider.cordel.no/wp-content/uploads/2019/07/logo-300x109.png"
            }
            alt="Cordel Kundesenter"
          />
        </Brand>
        <StyledIcon to="/admin/">
          <Settings />
        </StyledIcon>
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
  > * {
    height: 62px;
    display: inline-flex;
    align-items: center;
  }
`;

const Brand = styled(Link)`
  a {
    width: 0;
  }
  > img {
    height: 100%;
    justify-self: left;
  }
`;

const StyledIcon = styled(Link)`
  text-decoration: none;
  margin-left: auto;
  svg {
    font-size: 2rem;
  }
  color: white;
  :hover {
    color: ${props => props.theme.secondaryColor};
  }
`;
