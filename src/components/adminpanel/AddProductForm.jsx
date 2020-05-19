import React, { Component } from "react";
import {
  List,
  ListItem,
  Paper,
  Input,
  InputAdornment,
  Button,
  FormHelperText,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import styled from "styled-components";
import { DesktopWindows } from "@material-ui/icons";
import { registerNewProduct, fetchProducts } from "../../slices/productsSlice";

class AddProductForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      isPublic: false,
      nameIsError: true,
      nameErrorMsg: "",
      isPublicIsError: true,
      isPublicErrorMsg: "",
      submitDisabled: true,
    };
    this.onChangeName.bind(this);
    this.onChangeIsPublic.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.enterFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.enterFunction, false);
  }

  enterFunction = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };

  validateName = (input) => {
    // prettier-ignore
    if (input === "") {
      this.setState(
        { nameIsError: true, nameErrorMsg: "Felt kan ikke være tomt" },
        () => {
          this.validateSubmit();
        }
      );
    } else {
      this.setState({ nameIsError: false, nameErrorMsg: "" }, () => {
        this.validateSubmit();
      });
    }
  };

  validateSubmit = () => {
    if (!this.state.nameIsError) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  };

  onChangeName = (input) => {
    const newValue = input.target.value;
    this.setState({ name: newValue }, () => {
      this.validateName(newValue);
    });
  };

  onChangeIsPublic = (input) => {
    const newValue = input.target.checked;
    this.setState({ isPublic: newValue }, () => {
      this.validateSubmit();
    });
  };

  handleSubmit = () => {
    let promise = registerNewProduct(this.state.name, this.state.isPublic);
    promise.then((response) => {
      this.props.fetchProducts();
      console.log(response);
    });
  };

  render() {
    return (
      <TurboPaper>
        <List>
          <ListItem key="title">
            <h2>Opprett nytt Produkt</h2>
          </ListItem>
          <ListItem key="inngress">
            <h3>Skriv inn detaljene til produktet</h3>
          </ListItem>
          <ListItem key="nameInput">
            <FormControl error={this.state.nameIsError}>
              <Input
                id="nameField"
                label="Navn"
                variant="filled"
                required
                aria-describedby="component-error-text"
                value={this.state.name}
                onChange={this.onChangeName}
                placeholder="Produktets navn"
                startAdornment={
                  <InputAdornment position="start">
                    <DesktopWindows />
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {this.state.nameErrorMsg}
              </FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem key="isPublicInput">
            <FormControl error={this.state.isPublicIsError}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={this.state.isPublic}
                    color="primary"
                    onChange={this.onChangeIsPublic}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Offentlig"
              />
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
export default AddProductForm;

const TurboPaper = styled(Paper)`
  padding: 1rem 3rem 1rem 3rem;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const TurboButton = styled(Button)`
  && {
    background-color: ${(props) => props.theme.secondaryColor};
  }
`;
