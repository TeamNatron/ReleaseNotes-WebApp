import React, { Component } from "react";
import {
  List,
  ListItem,
  Paper,
  Input,
  InputAdornment,
  Button,
  FormHelperText,
  FormControl
} from "@material-ui/core";
import styled from "styled-components";
import { VpnKey } from "@material-ui/icons";
import { changePassword } from "../../requests/user";

class ChangePasswordForm extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      passwordConfirm: "",
      pwdIsError: true,
      pwdErrorMsg: "",
      submitDisabled: true
    };

    this.onChangePwd.bind(this);
    this.onChangePwdConfirm.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.enterFunction, false);
  }

  enterFunction = event => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  validatePwd = input => {
    if (input === "") {
      this.setState(
        {
          pwdIsError: true,
          pwdErrorMsg: "Felt kan ikke være tomt"
        },
        () => {
          this.validateSubmit();
        }
      );
    } else if (this.state.password !== this.state.passwordConfirm) {
      this.setState(
        {
          pwdIsError: true,
          pwdErrorMsg: "Passordet er ikke det samme"
        },
        () => {
          this.validateSubmit();
        }
      );
    } else {
      this.setState({ pwdIsError: false, pwdErrorMsg: "" }, () => {
        this.validateSubmit();
      });
    }
  };

  validateSubmit = () => {
    if (!this.state.pwdIsError) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  };

  onChangePwd = input => {
    const newValue = input.target.value;
    this.setState({ password: newValue }, () => {
      this.validatePwd(newValue);
    });
  };

  onChangePwdConfirm = input => {
    const newValue = input.target.value;
    this.setState({ passwordConfirm: newValue }, () => {
      this.validatePwd(input);
    });
  };

  handleSubmit = () => {
    let promise = changePassword(this.state.password, this.props.id);
    promise
      .then(
        response => (
          (document.getElementById("successMessage").hidden = false),
          (document.getElementById("successMessage").innerHTML =
            "Endring av passord er velykket!"),
          (document.getElementById("successMessage").style.cssText =
            "color: green;")
        )
      )
      .catch(
        error => (
          (document.getElementById("successMessage").hidden = false),
          (document.getElementById("successMessage").innerHTML =
            error.response.data),
          (document.getElementById("successMessage").style.cssText =
            "color: red;")
        )
      );
  };

  render() {
    return (
      <TurboPaper>
        <List>
          <ListItem key="title">
            <h2>Bytt passord på bruker</h2>
          </ListItem>
          <ListItem key="inngress">
            <h3>Skriv inn det nye passordet i begge feltene</h3>
          </ListItem>
          <ListItem key="pwdInput">
            <FormControl error={this.state.pwdIsError}>
              <Input
                id="standard-adornment-password"
                label="Passord"
                type="password"
                value={this.state.password}
                onChange={this.onChangePwd}
                placeholder="Brukerens passord"
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
          <ListItem key="pwdInputConfirm">
            <FormControl error={this.state.pwdIsError}>
              <Input
                id="standard-adornment-password"
                label="Passord"
                type="password"
                aria-describedby="password-error-text"
                value={this.state.passwordConfirm}
                onChange={this.onChangePwdConfirm}
                placeholder="Skriv passordet en gang til"
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                }
              />
              <FormHelperText id="password-error-text">
                {this.state.pwdErrorMsg}
              </FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem key="regBtn">
            <TurboButton
              id="regBtn"
              variant="contained"
              type="button"
              onClick={this.handleSubmit}
              color="primary"
              disabled={this.state.submitDisabled}
            >
              Oppdater
            </TurboButton>
          </ListItem>
          <ListItem key="successContainer">
            <span id="successMessage"></span>
          </ListItem>
        </List>
      </TurboPaper>
    );
  }
}
export default ChangePasswordForm;

const TurboPaper = styled(Paper)`
  padding: 1rem 3rem 1rem 3rem;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const TurboButton = styled(Button)`
  && {
    background-color: ${props => props.theme.secondaryColor};
  }
`;
