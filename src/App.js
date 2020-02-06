import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import LandingScreen from "./components/screen/LandingScreen";
import ReleaseNotesScreen from "./components/screen/ReleaseNotesScreen";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/index";
import { CssBaseline } from "@material-ui/core";
import { Provider, useDispatch } from "react-redux";
import { store } from "./setupStore";
import ArticleScreen from "./components/screen/ArticleScreen";
import AdminScreen from "./components/screen/AdminScreen";
import LoginScreen from "./components/screen/LoginScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Route path="/" exact component={LandingScreen} />
          <Route path="/releases" exact component={ReleaseNotesScreen} />
          <Route path="/articles/article01" exact component={ArticleScreen} />
          <Route path="/adminpage/" exact component={AdminScreen} />
          <Route path="/login/" exact component={LoginScreen} />
          {/* <Footer /> */}
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
