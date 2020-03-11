import React from "react";
import Login from "../auth/Login";
import PageContainer from "../shared/PageContainer";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";

const LoginScreen = props => {
  const dispatch = useDispatch();

  const handleSubmit = (email, password) => {
    dispatch(login(email, password));
  };

  return (
    <PageContainer>
      <Login handleSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default LoginScreen;
