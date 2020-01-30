import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import LandingScreen from "./components/screen/LandingScreen";
import Navbar from "./components/Navbar";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const theme = {
  mainColor: "#333335",
  secondaryColor: "#ec6707",
  sectionColorLight: "#f8f8f8",
  sectionColorDark: "#e8e8e8"
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
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
