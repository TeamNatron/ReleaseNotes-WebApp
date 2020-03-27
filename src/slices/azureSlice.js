import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";

/**
 * The request URI, in the following form: VERB https://{instance}[/{team-project}]/_apis[/{area}]/{resource}?api-version={version}
 */

// request url parameters
const organization = "ReleaseNoteSystem";
const instance = "dev.azure.com/" + organization;

// auth parameters
const userId = "GET THIS FROM USER"; // TODO
const Pat = "GET THIS FROM USER"; // TODO
const authHeader = userId + Pat; // TODO convert to base64

// azure axios instance
const Axios = GlobalAxios.create({
  baseURL: "https://" + instance + "/_apis/",
  timeout: 1000,
  headers: { authorization: authHeader }
});

// actions
const name = "azure/";
export const getProjectsPending = createAction(name + "getProjectsPending");
export const getProjectsError = createAction(name + "getProjectsError");
export const getProjectsSuccess = createAction(name + "getProjectsSuccess");

// reducer
export const azureReducer = createReducer(
  { projects: [], releases: [] },
  {
    [getProjectsSuccess]: (state, action) => {}
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
