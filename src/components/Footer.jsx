import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
//import LinkedinLogo from '../../public/LinkedinLogo';

const Footer = () => {
  return (
    <Div>
      <Grid container justify="center">
        <Box flexDirection="row" alignItems="space-between">
          <StyledImg
            src={
              "https://228508-www.web.tornado-node.net/wp-content/uploads/2019/09/logo.png"
            }
            alt="Cordel Kundesenter"
          />
          <Typography variant="body2" color="#E2DCCD">
            © Cordel Norge AS 2020
          </Typography>
          <Typography
            variant="body2"
            style={{ marginTop: "1rem" }}
            align="center"
          >
            <Link to="/login/">
              <LoginButton>Logg inn</LoginButton>
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Div>
  );
};

export default Footer;

const LoginButton = styled.a`
  font-size: 0.8rem;
  text-decoration: underline;
  margin: 0 auto;
  color: white;
`;

const StyledImg = styled.img`
  width: auto;
  max-height: 70px;
  margin: 0 auto;
  display: block;
  float: none;
`;

const Div = styled.div`
  padding: 12px 0;
  background: ${(props) => props.theme.mainColor};
  color: white;

  position: absolute;
  bottom: 0;
  width: 100%;
`;
