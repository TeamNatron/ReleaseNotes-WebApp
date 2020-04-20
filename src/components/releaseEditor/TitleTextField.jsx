import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const TitleTextField = (props) => {
  return (
    <StyledTextField
      variant="outlined"
      helperText={props.helperText}
      error={props.error}
      value={props.value || ""}
      onChange={props.handleOnChangeTitle}
      placeholder="Skriv en tittel"
    />
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
    height: 5rem;
    font-size: 2rem;
  }
`;
