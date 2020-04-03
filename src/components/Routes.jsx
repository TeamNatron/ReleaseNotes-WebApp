import React from "react";
import { Route, useHistory } from "react-router";
import LandingScreen from "./screen/LandingScreen";
import ReleasesScreen from "./screen/ReleasesScreen";
import AdminScreen from "./screen/AdminScreen";
import LoginScreen from "./screen/LoginScreen";
import ReleaseEditorScreen from "./screen/ReleaseEditorScreen";
import Axios from "axios";
import ReleaseScreen from "./screen/ReleaseScreen";
import ReleaseNoteEditorScreen from "./screen/ReleaseNoteEditorScreen";

const Routes = () => {
  const history = useHistory();
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        if (error.response.status === 401) history.push("/login");
      } else {
        // Error.response blir undefined når der e cors feil/ukjent endpoint/ingen internett og sikkert meir.
        // For en eller anna grunn blir ikkje errors catcha i Axios når ditta skjer
        console.log("Error response is undefined.");
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      <Route path="/" exact component={LandingScreen} />
      <Route path="/releases" exact component={ReleasesScreen} />
      <Route path="/admin/">
        <AdminScreen />
      </Route>

      <Route
        path="/releasenotes/edit/:id"
        exact
        render={props => <ReleaseNoteEditorScreen {...props} />}
      />
      <Route
        path="/releasenotes/create"
        exact
        component={ReleaseNoteEditorScreen}
      />
      <Route
        path="/release/:id"
        exact
        render={props => <ReleaseScreen {...props} />}
      />
      <Route path="/login/" exact component={LoginScreen} />
      <Route path="/releases/create" exact component={ReleaseEditorScreen} />
      <Route path="/releases/edit/:id" exact component={ReleaseEditorScreen} />
    </>
  );
};

export default Routes;
