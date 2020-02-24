import React, { Component } from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import styled from "styled-components";

class TitleTextField extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <StyledTextField
          variant="outlined"
          aria-describedby="component-helper-text"
          placeholder="Skriv en tittel"
        />
      </React.Fragment>
    );
  }
}

export default TitleTextField;

const StyledTextField = styled(TextField)`
  width: 100%;
  && {
    background-color: #fefefe;
  }
  input {
    height: 7rem;
    font-size: 2rem;
  }
`;
