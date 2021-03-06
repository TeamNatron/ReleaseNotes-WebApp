import React, { useState, useCallback } from "react";
import {
  List,
  ListItem,
  Paper,
  Input,
  InputAdornment,
  Button,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import styled from "styled-components";
import { VpnKey } from "@material-ui/icons";
import { changePassword } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ChangePasswordForm = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pwdIsError, setPwdIsError] = useState();
  const [pwdErrorMsg, setPwdErrorMsg] = useState();
  const [submitDisabled, setSubmitDisabled] = useState();
  const dispatch = useDispatch();

  const validatePwd = useCallback(
    (input) => {
      if (input === "") {
        setPwdIsError(true);
        setPwdErrorMsg("Felt kan ikke være tomt");
      } else if (password.length <= 5) {
        setPwdIsError(true);
        setPwdErrorMsg("Passordet må inneholde minst 5 tegn");
      } else if (password !== passwordConfirm) {
        setPwdIsError(true);
        setPwdErrorMsg("Passordet er ikke det samme");
      } else {
        setPwdIsError(false);
        setPwdErrorMsg("");
      }
    },
    [password, passwordConfirm]
  );

  const validateSubmit = useCallback(() => {
    if (!pwdIsError) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [pwdIsError]);

  useEffect(() => {
    validatePwd(password);
  }, [password, validatePwd]);

  useEffect(() => {
    validatePwd(passwordConfirm);
  }, [passwordConfirm, validatePwd]);

  useEffect(() => {
    validateSubmit();
  }, [pwdIsError, validateSubmit]);

  const onChangePwd = (input) => {
    const newValue = input.target.value;
    setPassword(newValue);
  };

  const onChangePwdConfirm = (input) => {
    setPasswordConfirm(input.target.value);
  };

  const handleSubmit = () => {
    dispatch(changePassword(password, props.id));
  };

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
          <FormControl error={pwdIsError}>
            <Input
              id="standard-adornment-password"
              label="Passord"
              type="password"
              value={password}
              onChange={onChangePwd}
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
          <FormControl error={pwdIsError}>
            <Input
              id="standard-adornment-password"
              label="Passord"
              type="password"
              aria-describedby="password-error-text"
              value={passwordConfirm}
              onChange={onChangePwdConfirm}
              placeholder="Skriv passordet en gang til"
              startAdornment={
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              }
            />
            <FormHelperText id="password-error-text">
              {pwdErrorMsg}
            </FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem key="regBtn">
          <TurboButton
            id="regBtn"
            variant="contained"
            type="button"
            onClick={handleSubmit}
            color="primary"
            disabled={submitDisabled}
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
};

export default ChangePasswordForm;

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
