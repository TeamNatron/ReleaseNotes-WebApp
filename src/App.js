import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LandingScreen from "./components/screen/LandingScreen";
import ReleaseNotesScreen from "./components/screen/ReleaseNotesScreen";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/index";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "./setupStore";
import Axios from "axios";
import 'draft-js/dist/Draft.css';

import AdminScreen from "./components/screen/AdminScreen";
import LoginScreen from "./components/screen/LoginScreen";
import Footer from "./components/Footer";
import EditReleaseNoteForm from "./components/ReleaseNoteEditor/EditReleaseNoteForm";

// https://github.com/axios/axios
Axios.defaults.baseURL = "http://localhost:5000/api/";
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//Axios.defaults.headers.post['Content-Type'] = 'application/json';

// intercept outgoing and incoming requests for debugging
Axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

Axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Route path="/" exact component={LandingScreen} />
          <Route path="/articles" exact component={ReleaseNotesScreen} />
          <Route path="/adminpage/" exact component={AdminScreen} />
          <Route path="/login/" exact component={LoginScreen} />
          <Route path="/debug" exact component={EditReleaseNoteForm} />
          <Footer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
