import React, { useEffect } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Fade, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import Settings from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import { loggedInSelector, checkLoggedIn } from "../slices/authSlice";
import { loadingSelector } from "../slices/loadingSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector(loggedInSelector);

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch, isLogged]);

  const loading = useSelector(loadingSelector);
  return (
    <React.Fragment>
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
          {isLogged ? (
            <StyledIcon to="/admin/">
              <Settings />
            </StyledIcon>
          ) : (
            ""
          )}
        </StyledToolbar>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? "800ms" : "0ms",
            position: "absolute",
            bottom: 0,
            width: "100%"
          }}
        >
          <LinearProgress />
        </Fade>
      </Header>
    </React.Fragment>
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
