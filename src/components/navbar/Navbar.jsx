import React, { useEffect } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Fade,
  LinearProgress,
  Box,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Settings from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import {
  loggedInSelector,
  checkLoggedIn,
  logout
} from "../../slices/authSlice";
import { loadingSelector } from "../../slices/loadingSlice";
import AccountMenu from "./AccountMenu";
import ResponseSnackBar from "../shared/ResponseSnackbar";
import { errorSelector } from "../../slices/errorSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector(loggedInSelector);

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch, isLogged]);

  const loading = useSelector(loadingSelector);
  const success = "useSelector(successSelector)";
  const error = useSelector(errorSelector);

  const handleLogout = () => {
    dispatch(logout());
  };

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
        {isLogged ? (
          <StyledBox>
            <StyledGrid container spacing={2}>
              <Grid item>
                <StyledIcon to="/admin/">
                  <Settings />
                </StyledIcon>
              </Grid>
              <Grid item>
                <AccountMenu handleLogout={handleLogout} />
              </Grid>
            </StyledGrid>
          </StyledBox>
        ) : (
          ""
        )}
      </StyledToolbar>
      <ResponseSnackBar
        errorOccured={error.occured}
        errorText={error.text}
        // successOccured={success.occured}
        // successText={success.text}
      />
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
  );
};

export default Navbar;

const StyledGrid = styled(Grid)`
  align-items: center;
`;

const StyledBox = styled(Box)`
  margin-left: auto;
`;

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
  svg {
    font-size: 2rem;
    margin: 5px;
  }
  color: white;
  transition: color 0.1s ease;
  :hover {
    color: ${props => props.theme.secondaryColor};
  }
`;
