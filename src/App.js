import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import LandingScreen from "./components/screen/LandingScreen";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/index";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Route path="/" component={LandingScreen} />
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
