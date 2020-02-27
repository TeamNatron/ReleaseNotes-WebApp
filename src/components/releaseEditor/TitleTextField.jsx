import React, { Component } from "react";
import { TextField, FormHelperText } from "@material-ui/core";
import styled from "styled-components";

const TitleTextField = props => {
  return (
    <React.Fragment>
      <StyledTextField
        variant="outlined"
        helperText={props.helperText}
        error={props.error}
        onChange={props.handleOnChangeTitle}
        placeholder="Skriv en tittel"
      />
    </React.Fragment>
  );
};

export default TitleTextField;

const StyledTextField = styled(TextField)`
  width: 100%;
  && {
    background-color: #fefefe;
    p {
      font-size: 1rem;
    }
  }
  input {
    height: 7rem;
    font-size: 2rem;
  }
`;
