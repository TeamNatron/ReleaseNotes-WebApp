import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LandingScreen from "./components/screen/LandingScreen";
import ReleasesScreen from "./components/screen/ReleasesScreen";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/index";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "./setupStore";
import Axios from "axios";
import "draft-js/dist/Draft.css";

import AdminScreen from "./components/screen/AdminScreen";
import LoginScreen from "./components/screen/LoginScreen";
import Footer from "./components/Footer";
import styled from "styled-components";
import ArticleScreen from "./components/screen/ArticleScreen";
import ReleaseEditorScreen from "./components/screen/ReleaseEditorScreen";
import EditReleaseNoteForm from "./components/ReleaseNoteEditor/EditReleaseNoteForm";
import { getAuthToken } from "./handlers/cookieHandler";
import AdminReleaseNotesScreen from "./components/screen/AdminReleaseNotesScreen";

// https://github.com/axios/axios
Axios.defaults.baseURL = "http://localhost:5000/api/";
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//Axios.defaults.headers.post['Content-Type'] = 'application/json';

// intercept outgoing and incoming requests for debugging
Axios.interceptors.request.use(request => {
  const token = getAuthToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

Axios.interceptors.response.use(response => {
  return response;
});

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <MainContent>
            <Route path="/" exact component={LandingScreen} />
            <Route path="/releases" exact component={ReleasesScreen} />
            <Route path="/articles/article01" exact component={ArticleScreen} />
            <Route path="/admin/" exact component={AdminScreen} />
            <Route
              path="/admin/releasenotes"
              exact
              component={AdminReleaseNotesScreen}
            />
            <Route
              path="/admin/releasenotes/:id"
              exact
              render={props => <EditReleaseNoteForm {...props} />}
            />
            <Route path="/login/" exact component={LoginScreen} />
            <Route
              path="/release/editor"
              exact
              component={ReleaseEditorScreen}
            />
            <Route path="/debug/" exact component={EditReleaseNoteForm} />
          </MainContent>
          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;

const MainContent = styled.div`
  min-height: 90vw;
`;
