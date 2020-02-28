import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/index";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "./setupStore";
import Axios from "axios";
import "draft-js/dist/Draft.css";

import Footer from "./components/Footer";
import styled from "styled-components";
import { getAuthToken } from "./handlers/cookieHandler";
import EditReleaseNoteScreen from "./components/screen/EditReleaseNoteScreen";
import Routes from "./components/Routes";

// https://github.com/axios/axios
Axios.defaults.baseURL = "http://localhost:5000/api/";
Axios.interceptors.request.use(request => {
  const token = getAuthToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <MainContent>
            <Routes />
          </MainContent>
          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;

const MainContent = styled.div`
  min-height: 90vw;
`;
