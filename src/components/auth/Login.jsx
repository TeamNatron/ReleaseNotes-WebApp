import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";
import { ListItem } from "@material-ui/core";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <Title>Cordel Release Notes</Title>

        <StyledForm noValidate autoComplete="off">
          <List>
            <ListItem>
              <TextField
                id="emailField"
                label="E-post"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="passwordField"
                label="Passord"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  )
                }}
              />
            </ListItem>
            <ListItem>
              <Button id="loginBtn" variant="contained">
                Logg på
              </Button>
            </ListItem>
          </List>
        </StyledForm>
      </React.Fragment>
    );
  }
}
const Title = styled.span`
  color: ${props => props.theme.secondaryColor};
  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
  margin: auto;
  margin-top: 1vw;
  margin-bottom: 1vw;
  display: block;
`;

const StyledForm = styled.form`
  width: 0;
  max-width: 90vw;
  min-width: 330px;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
  text-align: center;
  margin: auto;
  li {
    justify-content: center;
  }
  button {
    font-size: 95%;
    font-weight: bolder;
    color: white;
    background-color: ${props => props.theme.secondaryColor};
  }
`;

export default Login;
