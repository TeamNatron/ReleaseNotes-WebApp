import React from "react";
import { Route, useHistory } from "react-router";
import LandingScreen from "./screen/LandingScreen";
import ReleasesScreen from "./screen/ReleasesScreen";
import ArticleScreen from "./screen/ArticleScreen";
import AdminScreen from "./screen/AdminScreen";
import AdminReleaseNotesScreen from "./screen/AdminReleaseNotesScreen";
import EditReleaseNoteScreen from "./screen/EditReleaseNoteScreen";
import LoginScreen from "./screen/LoginScreen";
import ReleaseEditorScreen from "./screen/ReleaseEditorScreen";
import Axios from "axios";

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
        console.log("Error response is undefined.")
      }
      return Promise.reject(error);
    }
  );
  return (
    <React.Fragment>
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
        render={props => <EditReleaseNoteScreen {...props} />}
      />
      <Route path="/login/" exact component={LoginScreen} />
      <Route
        path="/admin/releases/create"
        exact
        component={ReleaseEditorScreen}
      />
      <Route
        path="/admin/releases/edit/:id"
        exact
        component={ReleaseEditorScreen}
      />
    </React.Fragment>
  );
};

export default Routes;
