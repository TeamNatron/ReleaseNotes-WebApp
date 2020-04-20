import React from "react";
import Login from "../auth/Login";
import PageContainer from "../shared/PageContainer";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useHistory } from "react-router";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (email, password) => {
    // 'await' Will give the warning:
    // ****'await' has no effect on the type of this expression.ts(80007)****
    // But the warning is a lie
    var succeeded = await dispatch(login(email, password));
    if (succeeded) {
      history.push("/admin");
    }
  };

  return (
    <PageContainer>
      <Login handleSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default LoginScreen;
