import React, { Component } from "react";
import { Email, VpnKey, Check } from "@material-ui/icons";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";
import { ListItem, Input, Paper } from "@material-ui/core";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChangeEmail.bind(this);
    this.onChangePwd.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.enterFunction, false);
  }

  enterFunction = event => {
    if (event.keyCode === 13) {
      this.props.handleSubmit(this.state.email, this.state.password);
    }
  };

  onChangeEmail = input => {
    const newValue = input.target.value;
    this.setState({ email: newValue });
  };

  onChangePwd = input => {
    const newValue = input.target.value;
    this.setState({ password: newValue });
  };

  render() {
    return (
      <React.Fragment>
        <Title>Cordel Release Notes</Title>

        <StyledForm noValidate autoComplete="off">
          <List>
            <ListItem>
              <Input
                id="emailField"
                label="E-post"
                variant="filled"
                fullWidth
                required
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </ListItem>
            <ListItem>
              <Input
                id="standard-adornment-password"
                label="Passord"
                fullWidth
                type="password"
                value={this.state.password}
                onChange={this.onChangePwd}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                }
              />
            </ListItem>
            <ListItem>
              <Button
                id="loginBtn"
                variant="contained"
                type="button"
                onClick={() =>
                  this.props.handleSubmit(this.state.email, this.state.password)
                }
              >
                Logg på
              </Button>
            </ListItem>
            <ListItem>
              <StatusPaper id="successContainer" hidden={true}>
                <List>
                  <ListItem>
                    <span id="successMessage">Vellykket inlogging!</span>
                  </ListItem>
                  <ListItem>
                    <StatusCheck id="successCheck" />
                  </ListItem>
                </List>
              </StatusPaper>
            </ListItem>
          </List>
        </StyledForm>
      </React.Fragment>
    );
  }
}
const StatusCheck = styled(Check)`
  && {
    font-size: 4rem;
    text-align: center;
  }
`;

const StatusPaper = styled(Paper)`
  && {
    color: green;
    span {
      color: ${props => props.theme.secondaryColor};
    }
  }
`;

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
