import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";

// azure axios instance
export const AzureAxios = GlobalAxios.create({
  timeout: 1000
});

// actions
const name = "azure/";
export const getProjectsPending = createAction(name + "getProjectsPending");
export const getProjectsError = createAction(name + "getProjectsError");
export const getProjectsSuccess = createAction(name + "getProjectsSuccess");

export const getReleasesPending = createAction(name + "getReleasesPending");
export const getReleasesError = createAction(name + "getReleasesError");
export const getReleasesSuccess = createAction(name + "getReleasesSuccess");

// reducer
export const azureReducer = createReducer(
  { sucessMsg: "", projects: [], releases: [] },
  {
    [getProjectsSuccess]: (state, action) => {},
    [getReleasesSuccess]: (state, action) => {
      state.sucessMsg = action.payload.statusText;
      state.releases = action.payload.data;
    }
  }
);

// azure api url format
// https://{instance}[/{team-project}]/_apis[/{area}]/{resource}?api-version={version}

// thunks
export const fetchProjects = params => async dispatch => {
  // create request url
  const instance = "dev.azure.com/" + params.organization;
  const url = "https://" + instance + "/_apis/projects";

  //dispatch
  dispatch(getProjectsPending());
  AzureAxios.get(url, authHeader(params.authToken))
    .then(res => {
      dispatch(getProjectsSuccess(res.data));
    })
    .catch(error => {
      dispatch(getProjectsError(error));
    });
};

export const fetchReleases = (project, organization) => async dispatch => {
  dispatch(getReleasesPending());
  AzureAxios.get(
    "https://vsrm.dev.azure.com/ReleaseNotesSystem/Release%20Notes%20System/_apis/release/releases?api-version=5.1"
  )
    .then(res => {
      dispatch(
        getReleasesSuccess({ data: res.data, statusText: res.statusText })
      );
    })
    .catch(err => {
      getReleasesError(err);
    });
};

const authHeader = authToken => {
  return {
    headers: {
      Authorization: "Basic " + authToken
    }
  };
};
