import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";

class Login extends Component {
  render() {
    return (
      <StyledForm noValidate autoComplete="off">
        <List>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item></Grid>
            <Grid item>
              <TextField
                id="emailField"
                label="E-post"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item></Grid>
            <Grid item>
              <TextField
                id="passwordField"
                label="Passord"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Button id="loginBtn" variant="contained">
            Logg på
          </Button>
        </List>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  color: ${props => props.theme.contentWidth};
`;

export default Login;
