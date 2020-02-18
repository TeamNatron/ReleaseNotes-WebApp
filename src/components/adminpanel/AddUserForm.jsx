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
import { Email, VpnKey } from "@material-ui/icons";
import { registerNewUser } from "../../actions/userRegActions";

class AddUserForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      emailIsError: true,
      emailErrorMsg: "",
      pwdIsError: true,
      pwdErrorMsg: "",
      submitDisabled: true
    };

    this.onChangeEmail.bind(this);
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

  validateEmail = input => {
    // prettier-ignore
    if (input === "") {
      this.setState(
        { emailIsError: true, emailErrorMsg: "Felt kan ikke være tomt" },
        () => {
          this.validateSubmit();
        }
      );
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))) {
      this.setState({
        emailIsError: true,
        emailErrorMsg: "Ikke en gyldig e-postadresse"
      });
    } else {
      this.setState({ emailIsError: false, emailErrorMsg: "" }, () => {
        this.validateSubmit();
      });
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
    } else if (!(this.state.password === this.state.passwordConfirm)) {
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
    if (!(this.state.pwdIsError || this.state.emailIsError)) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  };

  onChangeEmail = input => {
    const newValue = input.target.value;
    this.setState({ email: newValue }, () => {
      this.validateEmail(newValue);
    });
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
    let promise = registerNewUser(this.state.email, this.state.password);
    promise
      .then(
        response => (
          (document.getElementById("successMessage").hidden = false),
          (document.getElementById("successMessage").innerHTML =
            "Registering av " + response.data.email + " er velykket!"),
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
            <h2>Opprett ny bruker</h2>
          </ListItem>
          <ListItem key="inngress">
            <h3>Skriv inn detaljene til brukeren</h3>
          </ListItem>
          <ListItem key="emailInput">
            <FormControl error={this.state.emailIsError}>
              <Input
                id="emailField"
                label="E-post"
                variant="filled"
                required
                aria-describedby="component-error-text"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                placeholder="Brukerens e-post"
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {this.state.emailErrorMsg}
              </FormHelperText>
            </FormControl>
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
              Registrer
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
export default AddUserForm;

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
