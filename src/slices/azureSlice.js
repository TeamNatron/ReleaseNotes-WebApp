import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";

const Axios = GlobalAxios.create({
  // baseURL: "https://dev.azure.com/ReleaseNoteSystem/_apis/",
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

//thunks
export const fetchProjects = dispatch => {
  dispatch(getProjectsPending());
  Axios.get("projects")
    .then(res => {
      dispatch(getProjectsSuccess(res.data));
    })
    .catch(error => {
      dispatch(getProjectsError(error));
    });
};

export const fetchReleases = async (dispatch, project, organization) => {
  dispatch(getReleasesPending());
  Axios.get(
    "https://vsrm.dev.azure.com/" +
      organization +
      "/" +
      project +
      "/_apis/release/releases?api-version=5.1"
  ).then(res => {
    dispatch(
      getReleasesSuccess({ data: res.data, statusText: res.statusText })
    ).catch(err => {
      getReleasesError(err);
    });
  });
};
