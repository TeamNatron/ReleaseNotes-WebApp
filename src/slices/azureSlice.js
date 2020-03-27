import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";

const Axios = GlobalAxios.create({
  baseURL: "https://dev.azure.com/ReleaseNoteSystem/_apis/",
  timeout: 1000
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
  throw Error("NOT IMPLEMENTED");
};
